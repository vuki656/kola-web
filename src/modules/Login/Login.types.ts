import type { z } from 'zod'

import type { loginFormValidation } from './Login.validation'

export type LoginFormValueType = z.infer<typeof loginFormValidation>
