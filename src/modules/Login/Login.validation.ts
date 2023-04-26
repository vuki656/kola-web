import { z } from 'zod'

export const loginFormValidation = z.object({
    email: z
        .string()
        .email(),
    password: z
        .string()
        .min(8),
})
