'use server'

import { createClient } from '@/lib/supabase/supabaseServerClient'
import type { SetPassWordFormType } from '@/types'

export const setPassWord = async ({ password }: SetPassWordFormType) => {
	try {
		const supabase = await createClient()

		const { error } = await supabase.auth.updateUser({
			password
		})

		if (error) {
			return {
				success: false,
				message: 'パスワードの変更に失敗しました。もう1度やり直してください。',
				status: error?.status || 500,
				error: error
			}
		}

		return {
			success: true,
			message: 'パスワード変更しました。'
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
