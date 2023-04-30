import { z } from 'zod'

export const RegisterFormValidationErrors = {
    invalidEmail: 'Invalid email',
    passwordMatch: 'Passwords must match',
    passwordMinLength: 'Must be at least 8 characters',
    required: 'Required',
}

export const registerFormValidation = z
    .object({
        email: z
            .string()
            .min(1, RegisterFormValidationErrors.required)
            .email(RegisterFormValidationErrors.invalidEmail),
        firstName: z.string().min(1, RegisterFormValidationErrors.required),
        lastName: z.string().min(1, RegisterFormValidationErrors.required),
        password: z
            .string()
            .min(1, RegisterFormValidationErrors.required)
            .min(8, RegisterFormValidationErrors.passwordMinLength),
        passwordConfirmation: z
            .string()
            .min(1, RegisterFormValidationErrors.required)
            .min(8, RegisterFormValidationErrors.passwordMinLength),
    })
    .refine(
        ({ password, passwordConfirmation }) => {
            return password === passwordConfirmation
        },
        {
            message: RegisterFormValidationErrors.passwordMatch,
            path: ['passwordConfirmation'],
        }
    )
