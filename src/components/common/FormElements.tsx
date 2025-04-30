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
import { cn } from '@/lib/utils'
import { HTMLInputTypeAttribute } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

interface InputProps<T extends FieldValues> {
	name: Path<T>
	type?: HTMLInputTypeAttribute
	placeholder?: string
	formItemClassName?: string
	formLabelClassName?: string
	inputClassName?: string
	label: string
	control: Control<T>
}

export const InputElement = <T extends FieldValues>({
	label,
	name,
	type = 'text',
	placeholder,
	formItemClassName,
	formLabelClassName,
	inputClassName,
	control
}: InputProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem
					className={cn('mb-0 min-h-[100px] gap-0.5', formItemClassName)}
				>
					<FormLabel className={cn(formLabelClassName)}>{label}</FormLabel>
					<FormControl>
						<Input
							type={type}
							placeholder={placeholder}
							className={cn(inputClassName)}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

interface RadioProps<T extends FieldValues> {
	name: Path<T>
	label: string
	formItemClassName?: string
	formLabelClassName?: string
	radioGroupClassName?: string
	optionItemClassName?: string
	optionValueClassName?: string
	optionLabelClassName?: string
	control: Control<T>
	options: { value: string; label: string }[]
}

export const RadioElement = <T extends FieldValues>({
	label,
	name,
	formLabelClassName,
	formItemClassName,
	radioGroupClassName,
	optionItemClassName,
	optionValueClassName,
	optionLabelClassName,
	control,
	options
}: RadioProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn('space-y-3', formItemClassName)}>
					<FormLabel className={cn(formLabelClassName)}>{label}</FormLabel>
					<FormControl>
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							className={cn('flex space-y-1', radioGroupClassName)}
						>
							{options.map((option) => (
								<FormItem
									key={option.value}
									className={cn(
										'flex items-center space-y-0 space-x-1',
										optionItemClassName
									)}
								>
									<FormControl>
										<RadioGroupItem
											className={cn(optionValueClassName)}
											value={option.value}
										/>
									</FormControl>
									<FormLabel
										className={cn('font-normal', optionLabelClassName)}
									>
										{option.label}
									</FormLabel>
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

interface SelectProps<T extends FieldValues> {
	name: Path<T>
	label: string
	formItemClassName?: string
	formLabelClassName?: string
	selectTriggerClassName?: string
	selectValueClassName?: string
	selectItemClassName?: string
	control: Control<T>
	options: { value: string; label: string }[]
	placeholder?: string
}

export const SelectElement = <T extends FieldValues>({
	name,
	label,
	formItemClassName,
	formLabelClassName,
	selectTriggerClassName,
	selectValueClassName,
	selectItemClassName,
	control,
	options,
	placeholder
}: SelectProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem
					className={cn('mb-0 min-h-[100px] w-1/2 gap-0.5', formItemClassName)}
				>
					<FormLabel className={cn(formLabelClassName)}>{label}</FormLabel>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger className={cn('w-3/4', selectTriggerClassName)}>
								<SelectValue
									className={cn(selectValueClassName)}
									placeholder={placeholder}
								/>
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{options.map((option) => (
								<SelectItem
									className={cn(selectItemClassName)}
									key={option.value}
									value={option.value}
								>
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
