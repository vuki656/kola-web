import { test } from '@playwright/test'

import { TEST_DEV_SERVER_URL } from '../../../shared/test/constants'

import { LoginTestActions } from './Login.test.actions'

test.beforeEach(async ({ page }) => {
    await page.goto(`${TEST_DEV_SERVER_URL}/login`)
})

test.describe('Login page', () => {
    test('should allow the user to login', async ({ page }) => {
        const actions = new LoginTestActions(page)

        await actions.clickLoginButton()
        await actions.checkRequiredErrorMessagesShown()
        await actions.typeWrongInput()
        await actions.checkWrongInputErrorMessagesShown()
        await actions.clearAllFields()
        await actions.typeCredentialsWithWrongEmail()
        await actions.clickLoginButton()
        await actions.checkWrongCredentialsNotificationShown()
        await actions.typeCredentialsWithWrongPassword()
        await actions.clickLoginButton()
        await actions.checkWrongCredentialsNotificationShown()
        await actions.clearAllFields()
        await actions.typeCorrectCredentials()
        await actions.clickLoginButton()
        await actions.checkUserRedirectedToHome()
    })

    test('should navigate to register page', async ({ page }) => {
        const actions = new LoginTestActions(page)

        await actions.clickRegisterButton()
        await actions.checkUserRedirectedToRegister()
    })
})
