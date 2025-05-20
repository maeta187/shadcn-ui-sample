'use server'

import { createClient } from '@/lib/supabase/supabaseServerClient'
import { SetPassWordFormType } from '@/types'

export const setPassword = async (input: SetPassWordFormType) => {
	try {
		const supabase = await createClient()

		const { error } = await supabase.auth.updateUser({
			password: input.password
		})

		if (error) {
			return {
				success: false,
				message:
					'パスワードの設定に失敗しました。再度パスワードの再設定を行なって下さい',
				status: error?.status || 500,
				error: error
			}
		}

		return {
			success: true,
			message: 'パスワード再設定完了しました'
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
