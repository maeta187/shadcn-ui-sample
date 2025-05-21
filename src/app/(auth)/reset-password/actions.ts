'use server'

import { createClient } from '@/lib/supabase/supabaseServerClient'
import type { ResetPassWordFormType } from '@/types'

export const resetPassWord = async ({ email }: ResetPassWordFormType) => {
	try {
		const supabase = await createClient()

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${process.env.NEXT_PUBLIC_APP_URL!}/auth/password`
		})

		if (error) {
			return {
				success: false,
				message: 'メール送信に失敗しました。再度メールを送信して下さい',
				status: error?.status || 500,
				error: error
			}
		}

		return {
			success: true,
			message: 'パスワード再設定用のメールを送信しました'
		}
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error ? error.message : '予期せぬエラーが発生しました',
			status: 500,
			error
		}
	}
}
