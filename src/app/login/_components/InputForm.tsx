import { InputElement } from '@/components/common/FormElements'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { LoginFormType } from '@/types'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

interface InputFormProps {
	form: UseFormReturn<LoginFormType>
	onSubmit: SubmitHandler<LoginFormType>
}

export const InputForm = ({ form, onSubmit }: InputFormProps) => {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting }
	} = form

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
				<InputElement
					label='メールアドレス'
					name='email'
					type='email'
					placeholder='example@example.com'
					control={control}
				/>

				<InputElement
					label='パスワード'
					name='password'
					type='password'
					placeholder='••••••••'
					control={control}
				/>

				<div className='flex justify-end gap-4'>
					<Button type='submit' size='lg' disabled={isSubmitting}>
						{isSubmitting ? 'ログイン中...' : 'ログイン'}
					</Button>
				</div>
			</form>
		</Form>
	)
}
