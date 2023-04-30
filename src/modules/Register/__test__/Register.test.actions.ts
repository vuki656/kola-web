import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

import { RegisterFormValidationErrors } from '../Register.validation'

import { RegisterTestLocators } from './Register.test.locators'

export class RegisterTestActions {
    private locators: RegisterTestLocators

    constructor(page: Page) {
        this.locators = new RegisterTestLocators(page)
    }

    public async checkErrorMessagesNotShown() {
        await expect(this.locators.getFirstNameFieldError()).toBeHidden()
        await expect(this.locators.getLastNameFieldError()).toBeHidden()
        await expect(this.locators.getEmailFieldError()).toBeHidden()
        await expect(this.locators.getPasswordFieldError()).toBeHidden()
        await expect(this.locators.getPasswordConfirmationFieldError()).toBeHidden()
    }

    public async checkNonMatchingPasswordErrorShown() {
        expect(await this.locators.getPasswordConfirmationFieldErrorText()).toContain(RegisterFormValidationErrors.passwordMatch)
    }

    public async checkRequiredErrorMessagesShown() {
        expect(await this.locators.getFirstNameFieldErrorText()).toContain(RegisterFormValidationErrors.required)
        expect(await this.locators.getLastNameFieldErrorText()).toContain(RegisterFormValidationErrors.required)
        expect(await this.locators.getEmailFieldErrorText()).toContain(RegisterFormValidationErrors.required)
        expect(await this.locators.getPasswordFieldErrorText()).toContain(RegisterFormValidationErrors.required)
        expect(await this.locators.getPasswordConfirmationFieldErrorText()).toContain(RegisterFormValidationErrors.required)
    }

    public async checkWrongInputErrorMessagesShown() {
        expect(await this.locators.getEmailFieldErrorText()).toContain(RegisterFormValidationErrors.invalidEmail)
        expect(await this.locators.getPasswordFieldErrorText()).toContain(RegisterFormValidationErrors.passwordMinLength) // eslint-disable-next-line max-len
        expect(await this.locators.getPasswordConfirmationFieldErrorText()).toContain(RegisterFormValidationErrors.passwordMinLength)
    }

    public async clearAllFields() {
        await this.locators.getFirstNameField().clear()
        await this.locators.getLastNameField().clear()
        await this.locators.getEmailField().clear()
        await this.locators.getPasswordField().clear()
        await this.locators.getPasswordConfirmationField().clear()
    }

    public async clickRegisterButton() {
        await this.locators.getRegisterButton().click()
    }

    public async typeCorrectInput() {
        const PASSWORD = 'correct_password'

        await this.locators.getFirstNameField().type('John')
        await this.locators.getLastNameField().type('Doe')
        await this.locators.getEmailField().type('john@gmail.com')
        await this.locators.getPasswordField().type(PASSWORD)
        await this.locators.getPasswordConfirmationField().type(PASSWORD)
    }

    public async typeNonMatchingPasswords() {
        await this.locators.getPasswordField().type('hello_password')
        await this.locators.getPasswordConfirmationField().type('hello_password_different')
    }

    public async typeWrongInput() {
        await this.locators.getEmailField().type('wrong')
        await this.locators.getPasswordField().type('short')
        await this.locators.getPasswordConfirmationField().type('wrong')
    }
}
