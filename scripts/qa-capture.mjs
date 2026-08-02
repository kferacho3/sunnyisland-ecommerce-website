/**
 * QA capture — the iteration-loop tool.
 *
 * Usage: node scripts/qa-capture.mjs <url> <out.png> [width] [height] [anchor] [settleMs]
 *
 * Real browser, real scroll: unlike one-shot headless screenshots, this
 * navigates, scrolls to an anchor, waits for ScrollTrigger entrances to
 * settle, then captures — so what we review is what visitors see.
 */
import { chromium } from "playwright";

const [url, out, w = "1440", h = "1050", anchor = "", settle = "1800", extraScroll = "0"] =
  process.argv.slice(2);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: +w, height: +h },
});
await page.goto(url, { waitUntil: "load", timeout: 45000 });
// Let hydration finish before anchoring — Next can reset scroll during it.
await page.waitForTimeout(900);
if (anchor) {
  // The anchor may be client-rendered; wait for it to actually exist.
  await page.waitForSelector(anchor, { timeout: 20000 });
  await page.waitForTimeout(400);
  await page.evaluate((sel) => {
    // The site sets scroll-behavior: smooth; every stepped scroll would
    // otherwise restart a slow animation and cancel the previous one.
    document.documentElement.style.scrollBehavior = "auto";
    document.querySelector(sel)?.scrollIntoView({ block: "start" });
  }, anchor);
}
if (+extraScroll) {
  // Step through pinned ranges the way a wheel would, so scrubs register.
  await page.evaluate(async (px) => {
    const steps = 24;
    for (let i = 1; i <= steps; i++) {
      window.scrollBy({ top: px / steps, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 40));
    }
  }, +extraScroll);
}
await page.waitForTimeout(+settle);
await page.screenshot({ path: out });
await browser.close();
console.log("captured", out);
