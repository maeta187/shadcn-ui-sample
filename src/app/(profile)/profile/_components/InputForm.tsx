import {
	InputElement,
	RadioElement,
	SelectElement
} from '@/components/common/FormElements'
import { GENDER } from '@/constants'
import { PrefectureOptions, ProfileFormType } from '@/types'
import { Control } from 'react-hook-form'

interface InputFormProps {
	prefectureOptions: PrefectureOptions[]
	control: Control<ProfileFormType>
}

const genderOptions = [
	{ value: GENDER.MEN, label: '男性' },
	{ value: GENDER.WOMEN, label: '女性' },
	{ value: GENDER.OTHER, label: 'その他' }
]

export const InputForm = ({ control, prefectureOptions }: InputFormProps) => {
	return (
		<>
			<InputElement
				label='お名前'
				name='userName'
				placeholder='山田太郎'
				control={control}
			/>

			<InputElement
				label='フリガナ'
				name='userNameKana'
				placeholder='ヤマダタロウ'
				control={control}
			/>

			<RadioElement
				label='性別'
				name='gender'
				control={control}
				options={genderOptions}
			/>

			<InputElement
				label='電話番号'
				name='phoneNumber'
				type='tel'
				placeholder='09012345678'
				control={control}
			/>

			<SelectElement
				label='都道府県'
				name='prefecture'
				options={prefectureOptions}
				placeholder='都道府県を選択してください'
				control={control}
				formItemClassName={'w-full'}
				selectTriggerClassName={'w-full'}
			/>
		</>
	)
}
