// Renders index.html headlessly and writes PNGs into shots/.
// Usage: NODE_PATH=~/.shotsenv/node_modules node shot.js
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const here = __dirname;
const out = path.join(here, "shots");
fs.mkdirSync(out, { recursive: true });

const url = "file://" + path.join(here, "index.html");

const SHOTS = [
  { name: "01-triaged.png", tab: "triage", w: 1460, h: 980 },
  { name: "02-inbox.png", tab: "inbox", w: 1460, h: 980 },
  { name: "03-triaged-narrow.png", tab: "triage", w: 420, h: 900 },
];

(async () => {
  const browser = await chromium.launch();
  for (const s of SHOTS) {
    const page = await browser.newPage({
      viewport: { width: s.w, height: s.h },
      deviceScaleFactor: 2,
    });
    await page.goto(`${url}?tab=${s.tab}`);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(out, s.name), fullPage: true });
    await page.close();
    console.log("wrote", s.name);
  }
  await browser.close();
})();
