import { test } from '@playwright/test'

import { TEST_DEV_SERVER_URL } from '../../../shared/test/constants'

import { RegisterTestActions } from './Register.test.actions'

test.beforeEach(async ({ page }) => {
    await page.goto(`${TEST_DEV_SERVER_URL}/register`)
})

test.describe('Register page', () => {
    test('should allow the user to register', async ({ page }) => {
        const actions = new RegisterTestActions(page)

        await actions.clickRegisterButton()
        await actions.checkRequiredErrorMessagesShown()
        await actions.typeWrongInput()
        await actions.checkWrongInputErrorMessagesShown()
        await actions.typeNonMatchingPasswords()
        await actions.checkNonMatchingPasswordErrorShown()
        await actions.clearAllFields()
        await actions.typeCorrectInput()
        await actions.checkErrorMessagesNotShown()
        await actions.clickRegisterButton()
        await actions.checkUserIsRedirectedToHome()
        await actions.goToRegisterPage()
        await actions.typeExistingEmail()
        await actions.clickRegisterButton()
        await actions.checkExistingEmailNotificationShown()
        await actions.typeCorrectEmail()
        await actions.typeExistingOib()
        await actions.clickRegisterButton()
        await actions.checkExistingOibNotificationShown()
    })
})
