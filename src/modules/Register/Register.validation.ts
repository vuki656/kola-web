import { z } from 'zod'

export const registerFormValidation = z
    .object({
        email: z
            .string()
            .email(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        password: z
            .string()
            .min(8),
        passwordConfirmation: z
            .string()
            .min(8),
    })
    .refine(
        ({ password, passwordConfirmation }) => {
            return password === passwordConfirmation
        },
        {
            message: 'Passwords must match',
            path: ['passwordConfirmation'],
        }
    )
