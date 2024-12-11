import { PlaywrightTestConfig } from '@playwright/test'
import { PAGE_HEIGHT, PAGE_WIDTH } from './tests/helpers/constants'

const config: PlaywrightTestConfig = {
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    viewport: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
    bypassCSP: true,
    contextOptions: {
      ignoreHTTPSErrors: true,
    },
    launchOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-http2'
      ]
    }
  },
  retries: 1,
  projects: [
    {
      name: 'e2e',
      testDir: 'tests/e2e',
      outputDir: 'test-results/e2e',
      testMatch: '**/*.e2e.test.ts',
      timeout: 60 * 1000,
      use: {
        baseURL: 'https://www.groupon.com',
      }
    }
  ],
  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'never',
        outputFolder: 'playwright-report',
        outputFile: 'playwright-report-e2e.html'
      }
    ],
    ['json', { outputFile: 'playwright-report/results.json' }]
  ]
}

export default config
