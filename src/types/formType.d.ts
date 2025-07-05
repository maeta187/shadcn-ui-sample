import {
       LoginFormSchema,
       ProfileFormSchema,
       ResetPassWordSchema,
       SetPassWordFormSchema,
       SignupFormSchema,
       EmailFormSchema
} from '@/schemas'
import { z } from 'zod'

export type SignupFormType = z.infer<typeof SignupFormSchema>
export type LoginFormType = z.infer<typeof LoginFormSchema>
export type ResetPassWordFormType = z.infer<typeof ResetPassWordSchema>
export type SetPassWordFormType = z.infer<typeof SetPassWordFormSchema>
export type ProfileFormType = z.infer<typeof ProfileFormSchema>
export type EmailFormType = z.infer<typeof EmailFormSchema>

export type UpdateProfileType = ProfileFormType & {
	id: string
}
