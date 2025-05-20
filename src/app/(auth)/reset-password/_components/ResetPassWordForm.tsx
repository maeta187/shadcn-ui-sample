'use client'

import { resetPassWord } from '@/app/(auth)/reset-password/actions'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { ResetPassWordSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { InputForm } from './InputForm'

import type { ResetPassWordFormType } from '@/types'

const defaultValues: ResetPassWordFormType = {
	email: ''
}

export const ResetPassWordForm = () => {
	const router = useRouter()

	const form = useForm<ResetPassWordFormType>({
		resolver: zodResolver(ResetPassWordSchema),
		defaultValues
	})

	const {
		handleSubmit,
		control,
		formState: { isSubmitting }
	} = form

	const onSubmit = async (data: ResetPassWordFormType) => {
		await new Promise(async (resolve) => {
			try {
				const res = await resetPassWord(data)
				if (!res.success) {
					toast.error(res.message || 'メール送信に失敗しました。')
					resolve(res.error)
					return
				}
				resolve(res.success)
				toast.success(res.message)
				router.push('/reset-password/success')
				router.refresh()
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
				resolve(error)
				if (error instanceof Error) {
					toast.error(error.message)
				} else {
					toast.error('アカウント登録に失敗しました')
				}
			}
		})
	}

	return (
		<Card className='w-2xl shadow-2xl'>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
					<CardHeader>
						<CardTitle className='text-2xl font-bold'>
							パスワード再設定
						</CardTitle>
					</CardHeader>
					<CardContent>
						<InputForm control={control} />
					</CardContent>
					<CardFooter className='justify-end'>
						<Button type='submit' size='lg' disabled={isSubmitting}>
							{isSubmitting ? 'メール送信中' : 'メール送信'}
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	)
}
