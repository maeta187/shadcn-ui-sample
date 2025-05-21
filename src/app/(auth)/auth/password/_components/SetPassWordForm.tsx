'use client'

import { InputForm } from '@/app/(auth)/auth/password/_components/InputForm'
import { setPassword } from '@/app/(auth)/auth/password/actions'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { SetPassWordFormSchema } from '@/schemas'
import type { SetPassWordFormType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const defaultValues: SetPassWordFormType = {
	password: '',
	confirmPassword: ''
}

export const SetPassWordForm = () => {
	const router = useRouter()

	const form = useForm<SetPassWordFormType>({
		resolver: zodResolver(SetPassWordFormSchema),
		defaultValues
	})

	const {
		handleSubmit,
		control,
		formState: { isSubmitting }
	} = form

	const onSubmit = async (data: SetPassWordFormType) => {
		await new Promise(async (resolve) => {
			try {
				const res = await setPassword(data)

				if (!res.success) {
					toast.error(res.message || 'パスワードの設定に失敗しました')
					resolve(res.error)
					return
				}
				resolve(res.success)
				toast.success(res.message)
				router.push('/auth/password/success')
				router.refresh()
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
				resolve(error)
				if (error instanceof Error) {
					toast.error(error.message)
				} else {
					toast.error('パスワードの設定に失敗しました')
				}
			}
		})
	}

	return (
		<Card className='w-2xl shadow-2xl'>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
					<CardHeader>
						<CardTitle className='text-2xl font-bold'>パスワード設定</CardTitle>
					</CardHeader>
					<CardContent>
						<InputForm control={control} />
					</CardContent>
					<CardFooter className='justify-end'>
						<Button type='submit' size='lg' disabled={isSubmitting}>
							{isSubmitting ? '送信中' : '送信'}
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	)
}
