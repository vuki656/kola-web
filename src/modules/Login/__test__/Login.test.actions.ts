import { faker } from '@faker-js/faker'
import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

import { TEST_DEV_SERVER_URL } from '../../../shared/test/constants'
import { PERSISTENT_TEST_DATA } from '../../../shared/test/data'
import { LoginFormValidationErrors } from '../Login.validation'

import { LoginTestLocators } from './Login.test.locators'

export class LoginTestActions {
    private locators: LoginTestLocators

    private page: Page

    constructor(page: Page) {
        this.page = page
        this.locators = new LoginTestLocators(page)
    }

    public async checkRequiredErrorMessagesShown() {
        expect(await this.locators.getEmailFieldErrorText()).toContain(LoginFormValidationErrors.required)
        expect(await this.locators.getPasswordFieldErrorText()).toContain(LoginFormValidationErrors.required)
    }

    public async checkUserRedirectedToHome() {
        await expect(this.page).toHaveURL(TEST_DEV_SERVER_URL)
    }

    public async checkUserRedirectedToRegister() {
        await expect(this.page).toHaveURL(`${TEST_DEV_SERVER_URL}/register`)
    }

    public async checkWrongCredentialsNotificationShown() {
        await expect(this.locators.getCredentialsErrorNotification()).not.toBeHidden()
    }

    public async checkWrongInputErrorMessagesShown() {
        expect(await this.locators.getEmailFieldErrorText()).toContain(LoginFormValidationErrors.invalidEmail)
    }

    public async clearAllFields() {
        await this.locators.getEmailField().clear()
        await this.locators.getPasswordField().clear()
    }

    public async clickLoginButton() {
        await this.locators.getLoginButton().click()
    }

    public async clickRegisterButton() {
        await this.locators.getRegisterButton().click()
    }

    public async typeCorrectCredentials() {
        await this.locators.getEmailField().type(PERSISTENT_TEST_DATA.user.email)
        await this.locators.getPasswordField().type(PERSISTENT_TEST_DATA.user.password)
    }

    public async typeCredentialsWithWrongEmail() {
        await this.locators.getEmailField().type(faker.internet.email())
        await this.locators.getPasswordField().type(faker.internet.password())
    }

    public async typeCredentialsWithWrongPassword() {
        await this.locators.getEmailField().type(PERSISTENT_TEST_DATA.user.email)
        await this.locators.getPasswordField().type(faker.internet.password())
    }

    public async typeWrongInput() {
        await this.locators.getEmailField().type('wrong')
    }
}
