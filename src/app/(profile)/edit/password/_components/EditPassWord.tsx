'use client'

import { InputForm } from '@/app/(profile)/edit/password/_components/InputForm'
import { setPassWord } from '@/app/(profile)/edit/password/actions'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { SetPassWordFormSchema } from '@/schemas'
import { SetPassWordFormType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const EditPassWord = () => {
	const router = useRouter()

	const defaultValues: SetPassWordFormType = {
		password: '',
		confirmPassword: ''
	}

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
				const res = await setPassWord(data)
				if (!res?.success) {
					toast.error(res?.message || 'パスワードの変更に失敗しました。')
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
					toast.error('パスワードの変更に失敗しました。')
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
				<h2 className='text-2xl font-bold'>パスワード変更</h2>
				<InputForm control={control} />
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
