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

const [url, out, w = "1440", h = "1050", anchor = "", settle = "1800"] =
  process.argv.slice(2);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: +w, height: +h },
});
await page.goto(url, { waitUntil: "load", timeout: 45000 });
// Let hydration finish before anchoring — Next can reset scroll during it.
await page.waitForTimeout(900);
if (anchor) {
  await page.evaluate(
    (sel) => document.querySelector(sel)?.scrollIntoView({ block: "start" }),
    anchor,
  );
}
await page.waitForTimeout(+settle);
await page.screenshot({ path: out });
await browser.close();
console.log("captured", out);
