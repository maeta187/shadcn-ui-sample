'use server'
import { createClient } from '@/lib/supabase/supabaseServerClient'
import type { PrefectureResponse, SignupFormType, SignupResult } from '@/types'

const END_POINT = process.env.END_POINT!
const API_KEY = process.env.API_KEY!
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL!

const query = `
query {
  prefecture {
    code
    name
  }
}
`

export async function getPrefecture(queryName: string) {
	try {
		const response = await fetch(END_POINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				apikey: API_KEY
			},
			body: JSON.stringify({ query })
		})

		// レスポンスが正常でない場合はエラーをスロー
		if (!response.ok) {
			throw new Error(response.statusText)
		}

		// レスポンスをJSON形式で取得
		const data = (await response.json()) as PrefectureResponse
		return Object.values(data.data[queryName]).map((v) => v)
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message)
		}
		throw new Error(
			'エラーが発生しました。\nしばらく時間を置いて操作してください。'
		)
	}
}

export async function signup(input: SignupFormType): Promise<SignupResult> {
	try {
		const supabase = await createClient()
		// アカウント作成
		const { data: signupData, error: signupError } = await supabase.auth.signUp(
			{
				email: input.email,
				password: input.password,
				options: { emailRedirectTo: `${NEXT_PUBLIC_URL}/signup/verify` }
			}
		)

		if (!signupData?.user) {
			return {
				success: false,
				message: signupError?.message || 'アカウント作成に失敗しました',
				status: signupError?.status || 500,
				error: signupError
			}
		}

		if (
			!signupData.user.identities ||
			signupData.user.identities.length === 0
		) {
			return {
				success: false,
				message: signupError?.message || '既に登録済みのアカウントです',
				status: signupError?.status || 500,
				error: signupError
			}
		}

		// プロフィール更新
		const { error: updateError } = await supabase
			.from('profiles')
			.update({
				user_name: input.userName,
				user_name_kana: input.userNameKana,
				gender: input.gender,
				phone_number: input.phoneNumber,
				prefecture: input.prefecture
			})
			.eq('id', signupData.user.id)

		if (updateError) {
			return {
				success: false,
				message: updateError.message || 'プロフィール更新に失敗しました',
				status: 500,
				error: updateError
			}
		}

		return {
			success: true,
			message: 'アカウントを作成しました'
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
