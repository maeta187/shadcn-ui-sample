'use client'

import { InputForm } from '@/app/login/_components/InputForm'
import { login } from '@/app/login/actions'
import { LoginFormSchema } from '@/schemas'
import type { LoginFormType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
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

	const onSubmit = async (data: LoginFormType) => {
		await new Promise(async (resolve) => {
			try {
				const res = await login(data)
				if (!res?.success) {
					toast.error(res?.message || 'ログインに失敗しました')
					return
				}
				resolve(res.success)
				toast.success(res.message)
				router.push('/')
				router.refresh()
			} catch (error) {
				if (error instanceof Error) {
					toast.error(error.message)
				} else {
					toast.error('アカウント登録に失敗しました')
				}
			}
		})
	}

	return (
		<div className='mx-auto w-2xl rounded-lg bg-white p-6 shadow-2xl'>
			<h2 className='text-2xl font-bold'>ログイン</h2>
			<InputForm form={form} onSubmit={onSubmit} />
		</div>
	)
}
