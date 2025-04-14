'use client'

import { InputForm } from '@/app/profile-form/_components/InputForm'
import { GENDER } from '@/constants'
import { formSchema } from '@/schemas'
import { FormType, PrefectureOptions } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

type FormProps = {
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

export const ProfileForm = ({ prefectureOptions }: FormProps) => {
	const form = useForm<FormType>({
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const onSubmit = async (data: FormType) => {
		await new Promise((resolve) =>
			setTimeout(() => {
				console.log('Form submitted:', data)
				resolve('Success')
			}, 3000)
		)
	}

	const onReset = () => {
		form.reset()
	}

	return (
		<div className='mx-auto w-2xl rounded-lg bg-white p-6 shadow-2xl'>
			<h1 className='text-2xl font-bold'>プロフィール登録</h1>
			<InputForm
				form={form}
				onSubmit={onSubmit}
				prefectureOptions={prefectureOptions}
				handleReset={onReset}
			/>
		</div>
	)
}
