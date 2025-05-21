'use client'

import { InputForm } from '@/app/login/_components/InputForm'
import { login } from '@/app/login/actions'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { LoginFormSchema } from '@/schemas'
import type { LoginFormType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const defaultValues: LoginFormType = {
	email: '',
	password: ''
}

export const LoginForm = () => {
	const router = useRouter()

	const form = useForm<LoginFormType>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues
	})

	const {
		handleSubmit,
		control,
		formState: { isSubmitting }
	} = form

	const onSubmit = async (data: LoginFormType) => {
		await new Promise(async (resolve) => {
			try {
				const res = await login(data)
				if (!res?.success) {
					toast.error(res?.message || 'ログインに失敗しました')
					resolve(res.error)
					return
				}
				resolve(res.success)
				toast.success(res.message)
				router.push('/')
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
						<CardTitle className='text-2xl font-bold'>ログイン</CardTitle>
					</CardHeader>
					<CardContent>
						<InputForm control={control} />
					</CardContent>
					<CardFooter className='flex-col justify-end'>
						<Button type='submit' size='lg' disabled={isSubmitting}>
							{isSubmitting ? 'ログイン中...' : 'ログイン'}
						</Button>
						<Link className='mt-5 text-sm' href='/reset-password'>
							パスワードを忘れた場合
						</Link>
					</CardFooter>
				</form>
			</Form>
		</Card>
	)
}
