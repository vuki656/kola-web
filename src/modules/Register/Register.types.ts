import type { z } from 'zod'

import type { registerFormValidation } from './Register.validation'

export type RegisterFormValueType = z.infer<typeof registerFormValidation>
