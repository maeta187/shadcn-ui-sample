import { InputElement } from '@/components/common/FormElements'
import { ResetPassWordFormType } from '@/types'
import { Control } from 'react-hook-form'

interface InputFormProps {
	control: Control<ResetPassWordFormType>
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
		</>
	)
}
