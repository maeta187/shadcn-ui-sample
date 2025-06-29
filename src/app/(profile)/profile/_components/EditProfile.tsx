'use client'

import { InputForm } from '@/app/(profile)/profile/_components/InputForm'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { ProfileFormSchema } from '@/schemas'
import { PrefectureOptions, ProfileFormType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface EditProfileProps {
	profile: Profile
	prefectureOptions: PrefectureOptions[]
}

export const EditProfile = ({
	profile,
	prefectureOptions
}: EditProfileProps) => {
	const defaultValues: ProfileFormType = {
		userName: profile.userName,
		gender: profile.gender,
		userNameKana: profile.userNameKana,
		phoneNumber: profile.phoneNumber,
		prefecture: profile.prefecture
	}

	const form = useForm<ProfileFormType>({
		resolver: zodResolver(ProfileFormSchema),
		defaultValues
	})

	const {
		handleSubmit,
		control,
		formState: { isSubmitting }
	} = form

	const onSubmit = async (data: ProfileFormType) => {
		console.log(data)
	}

	const onReset = () => {
		form.reset()
	}

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-8'>
				<h2 className='text-2xl font-bold'>プロフィール編集</h2>
				<InputForm prefectureOptions={prefectureOptions} control={control} />
				<div className='flex justify-end space-x-4'>
					<Button type='button' size='lg' variant='outline' onClick={onReset}>
						リセット
					</Button>
					<Button type='submit' size='lg' disabled={isSubmitting}>
						{isSubmitting ? '送信中...' : '登録'}
					</Button>
				</div>
			</form>
		</Form>
	)
}
