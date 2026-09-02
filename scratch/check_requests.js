import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('request', req => {
    console.log('REQUEST:', req.url());
  });

  page.on('response', async res => {
    if (res.status() >= 400) {
      console.log('BAD RESPONSE:', res.status(), res.url());
    }
  });

  page.on('console', msg => {
    console.log(`CONSOLE [${msg.type()}]:`, msg.text(), msg.location());
  });

  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err);
  });

  await page.goto('http://localhost:3000');
  await page.waitForTimeout(3000);
  await browser.close();
})();
