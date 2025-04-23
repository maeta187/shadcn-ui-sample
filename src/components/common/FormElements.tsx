import {
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
import { LoginFormType, SignupFormType } from '@/types'
import { HTMLInputTypeAttribute } from 'react'
import { Control } from 'react-hook-form'

type InputProps = {
	name: keyof SignupFormType | keyof LoginFormType
	type?: HTMLInputTypeAttribute
	placeholder?: string
	label: string
	control: Control<SignupFormType | LoginFormType>
}

type RadioProps = {
	name: keyof SignupFormType
	label: string
	control: Control<SignupFormType>
	options: { value: string; label: string }[]
}

type SelectProps = {
	name: keyof SignupFormType
	label: string
	control: Control<SignupFormType>
	options: { value: string; label: string }[]
	placeholder?: string
}

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
