import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://localhost:4321/portfolio/';
const channel = process.env.CI ? undefined : 'chrome';

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel } },
  ],
  webServer: {
    command: 'npm run preview -- --ignore-lock',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
