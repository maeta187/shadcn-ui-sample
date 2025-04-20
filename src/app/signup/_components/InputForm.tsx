import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { GENDER } from '@/constants'
import { FormType, PrefectureOptions } from '@/types'
import { HTMLInputTypeAttribute } from 'react'
import { Control, SubmitHandler, UseFormReturn } from 'react-hook-form'

type InputProps = {
	name: keyof FormType
	type?: HTMLInputTypeAttribute
	placeholder?: string
	label: string
	control: Control<FormType>
}

type RadioProps = {
	name: keyof FormType
	label: string
	control: Control<FormType>
	options: { value: string; label: string }[]
}

type SelectProps = {
	name: keyof FormType
	label: string
	control: Control<FormType>
	options: { value: string; label: string }[]
	placeholder?: string
}

type InputFormProps = {
	form: UseFormReturn<FormType>
	onSubmit: SubmitHandler<FormType>
	prefectureOptions: PrefectureOptions[]
	handleReset: () => void
}

const genderOptions = [
	{ value: GENDER.MEN, label: '男性' },
	{ value: GENDER.WOMEN, label: '女性' },
	{ value: GENDER.OTHER, label: 'その他' }
]

export const InputElement = ({
	label,
	name,
	type = 'text',
	placeholder,
	control
}: InputProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='mb-0 min-h-[100px] gap-0.5'>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input type={type} placeholder={placeholder} {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export const RadioElement = ({ label, name, control, options }: RadioProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='space-y-3'>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							className='flex space-y-1'
						>
							{options.map((option) => (
								<FormItem
									key={option.value}
									className='flex items-center space-y-0 space-x-1'
								>
									<FormControl>
										<RadioGroupItem value={option.value} />
									</FormControl>
									<FormLabel className='font-normal'>{option.label}</FormLabel>
								</FormItem>
							))}
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export const SelectElement = ({
	label,
	name,
	control,
	options,
	placeholder
}: SelectProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='mb-0 min-h-[100px] w-1/2 gap-0.5'>
					<FormLabel>{label}</FormLabel>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger className='w-3/4'>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{options.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export const InputForm = ({
	form,
	onSubmit,
	prefectureOptions,
	handleReset
}: InputFormProps) => {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting }
	} = form

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
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

				<InputElement
					label='メールアドレス'
					name='email'
					type='email'
					placeholder='example@example.com'
					control={control}
				/>

				<SelectElement
					label='都道府県'
					name='prefecture'
					options={prefectureOptions}
					placeholder='都道府県を選択してください'
					control={control}
				/>

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
				<div className='flex justify-end gap-4'>
					<Button type='button' variant='outline' onClick={handleReset}>
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
