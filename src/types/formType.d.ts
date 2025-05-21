import {
	LoginFormSchema,
	ResetPassWordSchema,
	SetPassWordFormSchema,
	SignupFormSchema
} from '@/schemas'
import { z } from 'zod'

export type SignupFormType = z.infer<typeof SignupFormSchema>
export type LoginFormType = z.infer<typeof LoginFormSchema>
export type ResetPassWordFormType = z.infer<typeof ResetPassWordSchema>
export type SetPassWordFormType = z.infer<typeof SetPassWordFormSchema>
