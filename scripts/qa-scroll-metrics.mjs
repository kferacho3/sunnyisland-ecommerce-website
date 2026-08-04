import { chromium } from "playwright";

const url = process.argv[2] ?? "http://127.0.0.1:3100/";
// The bundled headless shell exposes SwiftShader on macOS; CPU-throttling that
// software rasterizer measures emulation overhead, not the page. Installed
// Chrome can use the host's Metal GPU while CDP still throttles main-thread JS.
const browser = await chromium.launch({
  headless: true,
  channel: process.platform === "darwin" ? "chrome" : undefined,
  args:
    process.platform === "darwin"
      ? ["--use-gl=angle", "--use-angle=metal"]
      : ["--use-gl=angle", "--use-angle=swiftshader"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "no-preference",
});
const page = await context.newPage();
const cdp = await context.newCDPSession(page);

await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
await page.addInitScript(() => {
  window.__qa = { shifts: [], tasks: [] };
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        const sources = entry.sources ?? [];
        // A large programmatic jump can cross a ScrollTrigger pin boundary in
        // one frame. The marked stage intentionally changes from document to
        // fixed positioning there; CLS is for unexpected document reflow, so
        // retain every other source and exclude only that declared pin node.
        if (
          sources.length > 0 &&
          sources.every(
            (source) =>
              source.node instanceof Element &&
              source.node.closest("[data-scroll-pin-stage]"),
          )
        ) {
          continue;
        }
        window.__qa.shifts.push({
          value: entry.value,
          startTime: entry.startTime,
          sources: sources.map((source) => {
            const node = source.node;
            if (!(node instanceof Element)) return "unknown";
            return [
              node.tagName.toLowerCase(),
              node.id ? `#${node.id}` : "",
              node.classList.length
                ? `.${[...node.classList].slice(0, 3).join(".")}`
                : "",
            ].join("");
          }),
        });
      }
    }
  }).observe({ type: "layout-shift", buffered: true });
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      window.__qa.tasks.push({
        duration: entry.duration,
        startTime: entry.startTime,
      });
    }
  }).observe({ type: "longtask", buffered: true });
});

await page.goto(url, { waitUntil: "networkidle" });
await page.addStyleTag({
  content: "html { scroll-behavior: auto !important; }",
});
const maxScroll = await page.evaluate(
  () => document.documentElement.scrollHeight - window.innerHeight,
);

for (let index = 0; index <= 40; index += 1) {
  await page.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    (maxScroll * index) / 40,
  );
  await page.waitForTimeout(90);
}
await page.waitForTimeout(500);

const metrics = await page.evaluate(() => {
  const tasks = window.__qa.tasks;
  const triggers = window.__ST?.getAll() ?? [];
  return {
    cls: window.__qa.shifts.reduce((sum, entry) => sum + entry.value, 0),
    longestTask: tasks.length
      ? Math.max(...tasks.map((entry) => entry.duration))
      : 0,
    totalLongTaskTime: tasks.reduce((sum, entry) => sum + entry.duration, 0),
    triggers: triggers.length,
    scrubbed: triggers.filter((trigger) => Boolean(trigger.vars.scrub)).length,
    pinned: triggers.filter((trigger) => Boolean(trigger.pin)).length,
    liveWillChange: [...document.querySelectorAll("*")].filter(
      (element) => getComputedStyle(element).willChange !== "auto",
    ).length,
    largestShifts: [...window.__qa.shifts]
      .sort((a, b) => b.value - a.value)
      .slice(0, 8),
    longestTasks: [...tasks]
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 8),
    slowestResources: performance
      .getEntriesByType("resource")
      .map((entry) => ({
        name: entry.name.split("/").pop(),
        startTime: entry.startTime,
        duration: entry.duration,
      }))
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 12),
  };
});

console.log(JSON.stringify(metrics, null, 2));
const failures = [
  [metrics.cls > 0.02, `CLS ${metrics.cls.toFixed(4)} > 0.02`],
  [
    metrics.longestTask >= 200,
    `longest task ${metrics.longestTask.toFixed(1)}ms >= 200ms`,
  ],
  [
    metrics.totalLongTaskTime >= 400,
    `long-task total ${metrics.totalLongTaskTime.toFixed(1)}ms >= 400ms`,
  ],
  [metrics.triggers > 20, `trigger count ${metrics.triggers} > 20`],
  [metrics.scrubbed > 3, `scrubbed trigger count ${metrics.scrubbed} > 3`],
  [metrics.pinned > 1, `pin count ${metrics.pinned} > 1`],
  [
    metrics.liveWillChange > 4,
    `live will-change count ${metrics.liveWillChange} > 4`,
  ],
].filter(([failed]) => failed);

await browser.close();
if (failures.length) {
  throw new Error(failures.map(([, message]) => message).join("\n"));
}
