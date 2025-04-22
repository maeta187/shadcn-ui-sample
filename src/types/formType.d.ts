import { SignupFormSchema } from '@/schemas'
import { z } from 'zod'

export type SignupFormType = z.infer<typeof SignupFormSchema>
