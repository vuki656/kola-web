import {
    defineConfig,
    devices,
} from '@playwright/test'

const config = defineConfig({
    forbidOnly: Boolean(process.env.CI),
    fullyParallel: true,
    use: {
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
    reporter: 'html',
    retries: process.env.CI ? 2 : 0,
    testDir: './src/modules/',
    webServer: {
        command: 'yarn dev',
        reuseExistingServer: !process.env.CI,
        url: 'http://localhost:3000',
    },
    workers: process.env.CI ? 1 : undefined,
})

export default config
