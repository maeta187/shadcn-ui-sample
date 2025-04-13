import { formSchema } from '@/schemas'
import { z } from 'zod'

export type FormType = z.infer<typeof formSchema>
