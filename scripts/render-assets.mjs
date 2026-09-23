import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const projectRoot = new URL('../', import.meta.url);
const fromRoot = (path) => new URL(path, projectRoot);
const toPath = (path) => fileURLToPath(fromRoot(path));

const favicons = [
  { file: 'public/favicon-32.png', size: 32, background: 'transparent' },
  { file: 'public/apple-touch-icon.png', size: 180, background: '#0f1a31' },
];

async function inlineFonts(html) {
  const fontPattern = /url\('\.\.\/src\/assets\/fonts\/([\w-]+\.woff2)'\)/g;
  const names = [...new Set([...html.matchAll(fontPattern)].map((match) => match[1]))];
  const encoded = new Map(
    await Promise.all(
      names.map(async (name) => [name, (await readFile(fromRoot(`src/assets/fonts/${name}`))).toString('base64')]),
    ),
  );
  return html.replace(fontPattern, (_, name) => `url(data:font/woff2;base64,${encoded.get(name)})`);
}

function launchOptions() {
  if (process.env.CHROME_PATH) return { executablePath: process.env.CHROME_PATH };
  return { channel: 'chrome' };
}

const browser = await chromium.launch(launchOptions());

try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(await inlineFonts(await readFile(fromRoot('brand/og.html'), 'utf8')), { waitUntil: 'load' });
  await page.evaluate('document.fonts.ready');
  await page.screenshot({ path: toPath('public/og.jpg'), type: 'jpeg', quality: 90 });

  const favicon = (await readFile(fromRoot('public/favicon.svg'))).toString('base64');
  for (const { file, size, background } of favicons) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(
      `<body style="margin:0;background:${background}"><img alt="" src="data:image/svg+xml;base64,${favicon}" width="${size}" height="${size}" style="display:block"></body>`,
      { waitUntil: 'load' },
    );
    await page.screenshot({ path: toPath(file), omitBackground: background === 'transparent' });
  }

  console.log('Rendered public/og.jpg, public/favicon-32.png and public/apple-touch-icon.png');
} finally {
  await browser.close();
}
