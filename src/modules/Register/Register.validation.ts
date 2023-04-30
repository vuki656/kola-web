import { z } from 'zod'

export const RegisterFormValidationErrors = {
    invalidEmail: 'Incorrect email',
    invalidOib: 'Invalid OIB',
    invalidPhoneNumber: 'Invalid phone number. Ex. 0993998989',
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
        firstName: z
            .string()
            .min(1, RegisterFormValidationErrors.required),
        lastName: z
            .string()
            .min(1, RegisterFormValidationErrors.required),
        oib: z
            .string()
            .min(1, RegisterFormValidationErrors.required)
            .min(11, RegisterFormValidationErrors.invalidOib)
            .max(11, RegisterFormValidationErrors.invalidOib),
        password: z
            .string()
            .min(1, RegisterFormValidationErrors.required)
            .min(8, RegisterFormValidationErrors.passwordMinLength),
        passwordConfirmation: z
            .string()
            .min(1, RegisterFormValidationErrors.required)
            .min(8, RegisterFormValidationErrors.passwordMinLength),
        phoneNumber: z
            .string()
            .min(1, RegisterFormValidationErrors.required)
            .min(10, RegisterFormValidationErrors.invalidPhoneNumber)
            .max(10, RegisterFormValidationErrors.invalidPhoneNumber),
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
