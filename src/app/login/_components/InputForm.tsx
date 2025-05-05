import { InputElement } from '@/components/common/FormElements'
import { LoginFormType } from '@/types'
import { Control } from 'react-hook-form'

interface InputFormProps {
	control: Control<LoginFormType>
}

export const InputForm = ({ control }: InputFormProps) => {
	return (
		<>
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
		</>
	)
}
