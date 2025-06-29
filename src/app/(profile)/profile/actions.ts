'use server'

import { createClient } from '@/lib/supabase/supabaseServerClient'
import type { UpdateProfileType } from '@/types'

export const getUser = async () => {
	try {
		const supabase = await createClient()
		const {
			data: { user }
		} = await supabase.auth.getUser()

		if (user) {
			const {
				data: profileData,
				error
			}: { data: ProfileData | null; error: Error | null } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', user.id)
				.single()

			if (error) {
				throw new Error(error.message)
			}

			if (!profileData) {
				throw new Error('プロフィールが見つかりませんでした')
			}

			const profile = {
				id: user.id,
				userName: profileData.user_name,
				userNameKana: profileData.user_name_kana,
				gender: profileData.gender,
				prefecture: profileData.prefecture,
				phoneNumber: profileData.phone_number,
				createdAt: profileData.created_at,
				updatedAt: profileData.updated_at
			}

			return profile
		} else {
			throw new Error('ユーザーが見つかりません')
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message)
		}
	}
}

export const updateProfile = async (arg: UpdateProfileType) => {
	try {
		const supabase = await createClient()
		const { error } = await supabase
			.from('profiles')
			.update({
				user_name: arg.userName,
				user_name_kana: arg.userNameKana,
				gender: arg.gender,
				phone_number: arg.phoneNumber,
				prefecture: arg.prefecture
			})
			.eq('id', arg.id)

		if (error) {
			return {
				success: false,
				message: 'プロフィール更新に失敗しました',
				status: 500,
				error
			}
		}

		return {
			success: true,
			message: 'プロフィールを更新しました'
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
