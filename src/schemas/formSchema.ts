import { GENDER } from '@/constants'
import { z } from 'zod'

export const SignupFormFields = z.object({
	userName: z
		.string()
		.nonempty('名前は必須です')
		.min(2, '名前は2文字以上で入力してください')
		.max(20, '名前は20文字以内で入力してください'),
	gender: z.enum([GENDER.MEN, GENDER.WOMEN, GENDER.OTHER], {
		errorMap: () => ({ message: '性別は必須です' })
	}),
	userNameKana: z
		.string()
		.nonempty('フリガナは必須です')
		.min(2, 'フリガナは2文字以上で入力してください')
		.max(20, 'フリガナは20文字以内で入力してください')
		.regex(/^[ァ-ヶー]+$/, 'フリガナはカタカナで入力してください'),
	phoneNumber: z
		.string()
		.nonempty('電話番号は必須です')
		.regex(
			/^[0-9]{10,11}$/,
			'電話番号は10桁または11桁の数字で入力してください'
		),
	email: z
		.string()
		.nonempty('メールアドレスは必須です')
		.email('正しいメールアドレスを入力してください'),
	prefecture: z.string().nonempty('都道府県は必須です'),
	password: z
		.string()
		.nonempty('パスワードは必須です')
		.min(8, 'パスワードは8文字以上で入力してください')
		.regex(
			/^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/,
			'パスワードは小文字と数字を含む必要があります'
		),
	confirmPassword: z.string().nonempty('パスワード（確認）は必須です')
})

export const SignupFormSchema = SignupFormFields.refine(
	(data) => data.password === data.confirmPassword,
	{
		message: 'パスワードが一致しません',
		path: ['confirmPassword']
	}
)

export const LoginFormSchema = SignupFormFields.pick({
	email: true,
	password: true
})

export const ResetPassWordSchema = SignupFormFields.pick({
	email: true
})
