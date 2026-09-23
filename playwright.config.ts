import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://localhost:4321/portfolio/';

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel: 'chrome' } },
  ],
  webServer: {
    command: 'npm run preview -- --ignore-lock',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
