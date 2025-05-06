'use server'

import { createClient } from '@/lib/supabase/supabaseServerClient'
import type { LoginFormType } from '@/types'

export const login = async (input: LoginFormType) => {
	try {
		const supabase = await createClient()

		const { error } = await supabase.auth.signInWithPassword(input)
		if (error) {
			return {
				success: false,
				message: error?.message || 'ログインに失敗しました',
				status: error?.status || 500,
				error: error
			}
		}

		return {
			success: true,
			message: 'ログインしました'
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
