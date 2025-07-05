import { InputElement } from '@/components/common/FormElements'
import type { EmailFormType } from '@/types'
import { Control } from 'react-hook-form'

interface InputFormProps {
        control: Control<EmailFormType>
}

export const InputForm = ({ control }: InputFormProps) => {
        return (
                <InputElement
                        label='メールアドレス'
                        name='email'
                        type='email'
                        placeholder='example@example.com'
                        control={control}
                />
        )
}
