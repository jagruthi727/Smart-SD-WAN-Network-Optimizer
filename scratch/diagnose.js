import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleLogs = [];
  const pageErrors = [];

  page.on('console', msg => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
    console.log(`[BROWSER CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    pageErrors.push(err.message);
    console.log(`[BROWSER ERROR] ${err.message}\n${err.stack}`);
  });

  console.log('Navigating to http://localhost:3000...');
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 10000 });
  } catch (e) {
    console.log('Navigation timeout/error:', e.message);
  }

  const rootHTML = await page.evaluate(() => document.getElementById('root')?.innerHTML || 'ROOT_NOT_FOUND');
  console.log('Root Element HTML Length:', rootHTML.length);
  console.log('Root Element HTML Content:\n', rootHTML);

  await page.screenshot({ path: 'scratch/screenshot.png' });
  console.log('Saved screenshot to scratch/screenshot.png');

  await browser.close();
})();
