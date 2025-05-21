import { InputElement } from '@/components/common/FormElements'
import { SetPassWordFormType } from '@/types'
import { Control } from 'react-hook-form'

interface InputFormProps {
	control: Control<SetPassWordFormType>
}

export const InputForm = ({ control }: InputFormProps) => {
	return (
		<>
			<InputElement
				label='パスワード'
				name='password'
				type='password'
				placeholder='••••••••'
				control={control}
			/>

			<InputElement
				label='パスワード（確認）'
				name='confirmPassword'
				type='password'
				placeholder='••••••••'
				control={control}
			/>
		</>
	)
}
