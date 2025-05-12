'use server'

import { createClient } from '@/lib/supabase/supabaseServerClient'

export const signOut = async () => {
	try {
		const supabase = await createClient()

		const { error } = await supabase.auth.signOut()
		if (error) {
			return {
				success: false,
				message: error?.message || 'ログアウトに失敗しました',
				status: error?.status || 500,
				error: error
			}
		}

		return {
			success: true,
			message: 'ログアウトしました'
		}
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: 'エラーが発生しました。時間おいてログインして下さい。',
			status: 500,
			error
		}
	}
}
