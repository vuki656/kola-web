import { faker } from '@faker-js/faker'
import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

import {
    OIB_LENGTH,
    PHONE_NUMBER_LENGTH,
} from '../../../shared/constants'
import { TEST_DEV_SERVER_URL } from '../../../shared/test/constants'
import { RegisterFormValidationErrors } from '../Register.validation'

import { RegisterTestLocators } from './Register.test.locators'

export class RegisterTestActions {
    private data = {
        email: faker.internet.email(),
        oib: [...new Array(OIB_LENGTH)]
            .map(() => faker.datatype.number({ max: 9, min: 0 }))
            .join(),
    }

    private locators: RegisterTestLocators

    private page: Page

    constructor(page: Page) {
        this.page = page
        this.locators = new RegisterTestLocators(page)
    }

    public async checkErrorMessagesNotShown() {
        await expect(this.locators.getFirstNameFieldError()).toBeHidden()
        await expect(this.locators.getLastNameFieldError()).toBeHidden()
        await expect(this.locators.getEmailFieldError()).toBeHidden()
        await expect(this.locators.getPasswordFieldError()).toBeHidden()
        await expect(this.locators.getPasswordConfirmationFieldError()).toBeHidden()
    }

    public async checkExistingEmailNotificationShown() {
        await expect(this.locators.getExistingEmailErrorNotification()).not.toBeHidden()
    }

    public async checkExistingOibNotificationShown() {
        await expect(this.locators.getExistingOibErrorNotification()).not.toBeHidden()
    }

    public async checkNonMatchingPasswordErrorShown() {
        expect(await this.locators.getPasswordConfirmationFieldErrorText()).toContain(RegisterFormValidationErrors.passwordMatch)
    }

    public async checkRequiredErrorMessagesShown() {
        expect(await this.locators.getFirstNameFieldErrorText()).toContain(RegisterFormValidationErrors.required)
        expect(await this.locators.getLastNameFieldErrorText()).toContain(RegisterFormValidationErrors.required)
        expect(await this.locators.getEmailFieldErrorText()).toContain(RegisterFormValidationErrors.required)
        expect(await this.locators.getPhoneNumberFieldErrorText()).toContain(RegisterFormValidationErrors.required)
        expect(await this.locators.getOibFieldErrorText()).toContain(RegisterFormValidationErrors.required)
        expect(await this.locators.getPasswordFieldErrorText()).toContain(RegisterFormValidationErrors.required)
        expect(await this.locators.getPasswordConfirmationFieldErrorText()).toContain(RegisterFormValidationErrors.required)
    }

    public async checkUserRedirectedToHome() {
        await expect(this.page).toHaveURL(TEST_DEV_SERVER_URL)
    }

    public async checkUserRedirectedToLogin() {
        await expect(this.page).toHaveURL(`${TEST_DEV_SERVER_URL}/login`)
    }

    public async checkWrongInputErrorMessagesShown() {
        expect(await this.locators.getEmailFieldErrorText()).toContain(RegisterFormValidationErrors.invalidEmail)
        expect(await this.locators.getPasswordFieldErrorText()).toContain(RegisterFormValidationErrors.passwordMinLength) // eslint-disable-next-line max-len
        expect(await this.locators.getPasswordConfirmationFieldErrorText()).toContain(RegisterFormValidationErrors.passwordMinLength)
        expect(await this.locators.getOibFieldErrorText()).toContain(RegisterFormValidationErrors.invalidOib)
        expect(await this.locators.getPhoneNumberFieldErrorText()).toContain(RegisterFormValidationErrors.invalidPhoneNumber)
    }

    public async clearAllFields() {
        await this.locators.getFirstNameField().clear()
        await this.locators.getLastNameField().clear()
        await this.locators.getEmailField().clear()
        await this.locators.getPasswordField().clear()
        await this.locators.getPasswordConfirmationField().clear()
        await this.locators.getPhoneNumberField().clear()
        await this.locators.getOibField().clear()
    }

    public async clickLoginButton() {
        await this.locators.getLoginButton().click()
    }

    public async clickRegisterButton() {
        await this.locators.getRegisterButton().click()
    }

    public async goToRegisterPage() {
        await this.page.goto(`${TEST_DEV_SERVER_URL}/register`)
    }

    public async typeCorrectEmail() {
        await this.locators.getEmailField().clear()
        await this.locators.getEmailField().type(faker.internet.email())
    }

    public async typeCorrectInput() {
        const PASSWORD = 'correct_password'

        const PHONE_NUMBER = [...new Array(PHONE_NUMBER_LENGTH)]
            .map(() => faker.datatype.number({ max: 9, min: 0 }))
            .join()

        await this.locators.getFirstNameField().type(faker.name.firstName())
        await this.locators.getLastNameField().type(faker.name.lastName())
        await this.locators.getEmailField().type(this.data.email)
        await this.locators.getPasswordField().type(PASSWORD)
        await this.locators.getPasswordConfirmationField().type(PASSWORD)
        await this.locators.getOibField().type(this.data.oib)
        await this.locators.getPhoneNumberField().type(PHONE_NUMBER)
    }

    public async typeExistingEmail() {
        await this.typeCorrectInput()
        await this.locators.getEmailField().clear()
        await this.locators.getEmailField().type(this.data.email)
    }

    public async typeExistingOib() {
        await this.locators.getOibField().clear()
        await this.locators.getOibField().type(this.data.oib)
    }

    public async typeNonMatchingPasswords() {
        await this.locators.getPasswordField().type('hello_password')
        await this.locators.getPasswordConfirmationField().type('hello_password_different')
    }

    public async typeWrongInput() {
        await this.locators.getEmailField().type('wrong')
        await this.locators.getPhoneNumberField().type('1234')
        await this.locators.getOibField().type('0000')
        await this.locators.getPasswordField().type('short')
        await this.locators.getPasswordConfirmationField().type('wrong')
    }
}
