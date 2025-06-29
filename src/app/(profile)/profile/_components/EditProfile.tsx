'use client'

import { InputForm } from '@/app/(profile)/profile/_components/InputForm'
import { updateProfile } from '@/app/(profile)/profile/actions'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { ProfileFormSchema } from '@/schemas'
import { PrefectureOptions, ProfileFormType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface EditProfileProps {
	profile: Profile
	prefectureOptions: PrefectureOptions[]
}

export const EditProfile = ({
	profile,
	prefectureOptions
}: EditProfileProps) => {
	const router = useRouter()

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
		await new Promise(async (resolve) => {
			try {
				const arg = {
					id: profile.id,
					...data
				}
				const res = await updateProfile(arg)
				if (!res?.success) {
					toast.error(res?.message || 'プロフィールの更新に失敗しました')
					resolve(res.error)
					return
				}
				resolve(res.success)
				toast.success(res.message)
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
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-8'>
				<h2 className='text-2xl font-bold'>プロフィール編集</h2>
				<InputForm prefectureOptions={prefectureOptions} control={control} />
				<div className='flex justify-end space-x-4'>
					<Button type='button' size='lg' variant='outline' onClick={onReset}>
						リセット
					</Button>
					<Button type='submit' size='lg' disabled={isSubmitting}>
						{isSubmitting ? '送信中...' : '更新'}
					</Button>
				</div>
			</form>
		</Form>
	)
}
