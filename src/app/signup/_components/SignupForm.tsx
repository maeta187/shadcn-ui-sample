'use client'

import { InputForm } from '@/app/signup/_components/InputForm'
import { signup } from '@/app/signup/actions'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { GENDER } from '@/constants'
import { SignupFormSchema } from '@/schemas'
import { PrefectureOptions, SignupFormType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface FormProps {
	prefectureOptions: PrefectureOptions[]
}

const defaultValues = {
	userName: '',
	userNameKana: '',
	gender: GENDER.MEN,
	phoneNumber: '',
	prefecture: '',
	email: '',
	password: '',
	confirmPassword: ''
}

export const SignupForm = ({ prefectureOptions }: FormProps) => {
	const router = useRouter()

	const form = useForm<SignupFormType>({
		resolver: zodResolver(SignupFormSchema),
		defaultValues
	})

	const {
		handleSubmit,
		control,
		formState: { isSubmitting }
	} = form

	const onSubmit = async (data: SignupFormType) => {
		await new Promise(async (resolve) => {
			try {
				const res = await signup(data)
				if (!res?.success) {
					toast.error(res?.message || 'アカウント登録に失敗しました')
					resolve(res.success)
					return
				}
				resolve(res.success)
				toast.success(res.message)
				router.push('/signup/success')
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

	const onReset = () => {
		form.reset()
	}

	return (
		<Card className='w-2xl shadow-2xl'>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
					<CardHeader>
						<CardTitle className='text-2xl font-bold'>
							プロフィール登録
						</CardTitle>
					</CardHeader>
					<CardContent>
						<InputForm
							prefectureOptions={prefectureOptions}
							control={control}
						/>
					</CardContent>
					{/* <div className='mx-auto w-2xl rounded-lg bg-white p-6 shadow-2xl'>
						<h2 className='text-2xl font-bold'>プロフィール登録</h2>
						<InputForm
							form={form}
							onSubmit={onSubmit}
							prefectureOptions={prefectureOptions}
							handleReset={onReset}
						/>
					</div> */}
					<CardFooter className='justify-end gap-4'>
						<Button type='button' variant='outline' onClick={onReset}>
							リセット
						</Button>
						<Button type='submit' size='lg' disabled={isSubmitting}>
							{isSubmitting ? '送信中...' : '登録'}
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	)
}
