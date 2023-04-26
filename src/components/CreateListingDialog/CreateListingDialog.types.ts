import type { z } from 'zod'

import type { createListingFormValidation } from './CreateListingDialog.validation'

export type CreateListingFormValueType = z.infer<typeof createListingFormValidation>
