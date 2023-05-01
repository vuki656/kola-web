import type { Page } from '@playwright/test'

import { RegisterTestIds } from './Register.test.ids'

export class RegisterTestLocators {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    public getEmailField() {
        return this.page.getByTestId(RegisterTestIds.fields.email)
    }

    public getEmailFieldError() {
        return this.page.getByTestId(RegisterTestIds.fieldErrors.email)
    }

    public async getEmailFieldErrorText() {
        return this.getEmailFieldError().textContent()
    }

    public getExistingEmailErrorNotification() {
        return this.page.getByText('Email already in use')
    }

    public getExistingOibErrorNotification() {
        return this.page.getByText('Oib already in use')
    }

    public getFirstNameField() {
        return this.page.getByTestId(RegisterTestIds.fields.firstName)
    }

    public getFirstNameFieldError() {
        return this.page.getByTestId(RegisterTestIds.fieldErrors.firstName)
    }

    public async getFirstNameFieldErrorText() {
        return this.getFirstNameFieldError().textContent()
    }

    public getLastNameField() {
        return this.page.getByTestId(RegisterTestIds.fields.lastName)
    }

    public getLastNameFieldError() {
        return this.page.getByTestId(RegisterTestIds.fieldErrors.firstName)
    }

    public async getLastNameFieldErrorText() {
        return this.getLastNameFieldError().textContent()
    }

    public getOibField() {
        return this.page.getByTestId(RegisterTestIds.fields.oib)
    }

    public getOibFieldError() {
        return this.page.getByTestId(RegisterTestIds.fieldErrors.oib)
    }

    public async getOibFieldErrorText() {
        return this.getOibFieldError().textContent()
    }

    public getPasswordConfirmationField() {
        return this.page.getByTestId(RegisterTestIds.fields.passwordConfirmation)
    }

    public getPasswordConfirmationFieldError() {
        return this.page.getByTestId(RegisterTestIds.fieldErrors.passwordConfirmation)
    }

    public async getPasswordConfirmationFieldErrorText() {
        return this.getPasswordConfirmationFieldError().textContent()
    }

    public getPasswordField() {
        return this.page.getByTestId(RegisterTestIds.fields.password)
    }

    public getPasswordFieldError() {
        return this.page.getByTestId(RegisterTestIds.fieldErrors.password)
    }

    public async getPasswordFieldErrorText() {
        return this.page.getByTestId(RegisterTestIds.fieldErrors.password).textContent()
    }

    public getPhoneNumberField() {
        return this.page.getByTestId(RegisterTestIds.fields.phoneNumber)
    }

    public getPhoneNumberFieldError() {
        return this.page.getByTestId(RegisterTestIds.fieldErrors.phoneNumber)
    }

    public async getPhoneNumberFieldErrorText() {
        return this.getPhoneNumberFieldError().textContent()
    }

    public getRegisterButton() {
        return this.page.getByTestId(RegisterTestIds.buttons.register)
    }
}
