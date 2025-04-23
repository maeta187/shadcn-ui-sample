import { LoginFormSchema, SignupFormSchema } from '@/schemas'
import { z } from 'zod'

export type SignupFormType = z.infer<typeof SignupFormSchema>
export type LoginFormType = z.infer<typeof LoginFormSchema>
