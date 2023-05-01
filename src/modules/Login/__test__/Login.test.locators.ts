import type { Page } from '@playwright/test'

import { LoginTestIds } from './Login.test.ids'

export class LoginTestLocators {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    public getCredentialsErrorNotification() {
        return this.page.getByText('Wrong email or password')
    }

    public getEmailField() {
        return this.page.getByTestId(LoginTestIds.fields.email)
    }

    public getEmailFieldError() {
        return this.page.getByTestId(LoginTestIds.fieldErrors.email)
    }

    public async getEmailFieldErrorText() {
        return this.getEmailFieldError().textContent()
    }

    public getLoginButton() {
        return this.page.getByTestId(LoginTestIds.buttons.login)
    }

    public getPasswordField() {
        return this.page.getByTestId(LoginTestIds.fields.password)
    }

    public getPasswordFieldError() {
        return this.page.getByTestId(LoginTestIds.fieldErrors.password)
    }

    public async getPasswordFieldErrorText() {
        return this.page.getByTestId(LoginTestIds.fieldErrors.password).textContent()
    }

    public getRegisterButton() {
        return this.page.getByTestId(LoginTestIds.buttons.register)
    }
}
