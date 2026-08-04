import { chromium } from "playwright";

const url = process.argv[2] ?? "http://127.0.0.1:3100/";
const browser = await chromium.launch({ headless: true });

async function assertViewport(width, height) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(url, { waitUntil: "networkidle" });

  const result = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const hollow = document.querySelector(".si-hollow");
    const rail = document.querySelector("[data-proof-rail]");
    const escaped = [...document.querySelectorAll("body *")].filter(
      (element) => {
        const rect = element.getBoundingClientRect();
        if (rect.left >= -0.5 && rect.right <= window.innerWidth + 0.5)
          return false;
        let ancestor = element.parentElement;
        while (ancestor) {
          const overflow = getComputedStyle(ancestor).overflowX;
          if (["hidden", "clip", "auto", "scroll"].includes(overflow))
            return false;
          ancestor = ancestor.parentElement;
        }
        return true;
      },
    );
    return {
      h1Count: document.querySelectorAll("h1").length,
      hollowLines: hollow?.getClientRects().length ?? 0,
      alignment:
        h1 && rail
          ? Math.abs(
              h1.getBoundingClientRect().left -
                rail.getBoundingClientRect().left,
            )
          : null,
      escaped: escaped.slice(0, 8).map((element) => ({
        tag: element.tagName,
        className: element.className,
      })),
    };
  });
  await context.close();

  if (errors.length)
    throw new Error(`${width}x${height} console: ${errors.join(" | ")}`);
  if (result.h1Count !== 1)
    throw new Error(`${width}x${height} has ${result.h1Count} h1 elements`);
  if (result.hollowLines !== 1)
    throw new Error(
      `${width}x${height} hollow headline uses ${result.hollowLines} lines`,
    );
  if (width >= 1280 && (result.alignment === null || result.alignment > 0.5)) {
    throw new Error(
      `${width}x${height} hero/rail alignment delta is ${result.alignment}px`,
    );
  }
  if (result.escaped.length)
    throw new Error(
      `${width}x${height} unclipped overflow: ${JSON.stringify(result.escaped)}`,
    );
  return result;
}

const results = [];
for (const viewport of [
  [390, 844],
  [844, 390],
  [1024, 768],
  [1280, 800],
  [1440, 900],
  [1920, 1080],
]) {
  results.push({
    viewport: viewport.join("x"),
    ...(await assertViewport(...viewport)),
  });
}

const reduced = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const reducedPage = await reduced.newPage();
await reducedPage.goto(url, { waitUntil: "networkidle" });
await reducedPage.evaluate(() =>
  window.scrollTo(0, document.documentElement.scrollHeight),
);
await reducedPage.waitForTimeout(250);
const reducedTriggers = await reducedPage.evaluate(
  () => window.__ST?.getAll().length ?? -1,
);
await reduced.close();
await browser.close();

if (reducedTriggers !== 0)
  throw new Error(
    `reduced-motion trigger count is ${reducedTriggers}, expected 0`,
  );
console.log(JSON.stringify({ results, reducedTriggers }, null, 2));
