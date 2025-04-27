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
import { HTMLInputTypeAttribute } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

interface InputProps<T extends FieldValues> {
	name: Path<T>
	type?: HTMLInputTypeAttribute
	placeholder?: string
	label: string
	control: Control<T>
}

interface RadioProps<T extends FieldValues> {
	name: Path<T>
	label: string
	control: Control<T>
	options: { value: string; label: string }[]
}

interface SelectProps<T extends FieldValues> {
	name: Path<T>
	label: string
	control: Control<T>
	options: { value: string; label: string }[]
	placeholder?: string
}

export const InputElement = <T extends FieldValues>({
	label,
	name,
	type = 'text',
	placeholder,
	control
}: InputProps<T>) => {
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

export const RadioElement = <T extends FieldValues>({
	label,
	name,
	control,
	options
}: RadioProps<T>) => {
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

export const SelectElement = <T extends FieldValues>({
	label,
	name,
	control,
	options,
	placeholder
}: SelectProps<T>) => {
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
