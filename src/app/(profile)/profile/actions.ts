'use server'

import { createClient } from '@/lib/supabase/supabaseServerClient'

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
