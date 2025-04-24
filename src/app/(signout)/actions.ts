'use server'

import { createClient } from '@/lib/supabaseServerClient'

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
				error instanceof Error ? error.message : '予期せぬエラーが発生しました',
			status: 500,
			error
		}
	}
}
