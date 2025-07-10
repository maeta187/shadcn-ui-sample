'use server'

import { createClient } from '@/lib/supabase/supabaseServerClient'
import type { EmailFormType } from '@/types'

export const getUserEmail = async () => {
	try {
		const supabase = await createClient()
		const {
			data: { user }
		} = await supabase.auth.getUser()

		if (!user || !user.email) {
			throw new Error('ユーザーが見つかりません')
		}

		return user.email
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message)
		}
	}
}

export const updateEmail = async (input: EmailFormType) => {
	try {
		const supabase = await createClient()
		const { error } = await supabase.auth.updateUser(
			{
				email: input.email
			},
			{
				emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL!}/edit/email/confirm`
			}
		)

		if (error) {
			return {
				success: false,
				message: 'メールアドレス更新に失敗しました',
				status: 500,
				error
			}
		}

		// await supabase.auth.signOut()

		return {
			success: true,
			message: 'メールアドレスを更新しました'
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
