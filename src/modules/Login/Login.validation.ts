import { z } from 'zod'

export const LoginFormValidationErrors = {
    invalidEmail: 'Incorrect email',
    required: 'Required',
}

export const loginFormValidation = z.object({
    email: z
        .string()
        .min(1, LoginFormValidationErrors.required)
        .email(LoginFormValidationErrors.invalidEmail),
    password: z
        .string()
        .min(1, LoginFormValidationErrors.required),
})
