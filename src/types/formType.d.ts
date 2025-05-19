import {
	LoginFormSchema,
	ResetPassWordSchema,
	SignupFormSchema
} from '@/schemas'
import { z } from 'zod'

export type SignupFormType = z.infer<typeof SignupFormSchema>
export type LoginFormType = z.infer<typeof LoginFormSchema>
export type ResetPassWordFormType = z.infer<typeof ResetPassWordSchema>
