import { z } from 'zod'

export const createListingFormValidation = z.object({
    description: z
        .string()
        .min(3),
    price: z
        .number()
        .nonnegative(),
    title: z
        .string()
        .min(3),
})
