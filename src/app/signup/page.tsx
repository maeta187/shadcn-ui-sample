import { SignupForm } from '@/app/signup/_components/SignupForm'
import { getPrefecture } from '@/app/signup/actions'
import { createClient } from '@/lib/supabaseServerClient'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export default async function Page() {
	const supabase = createClient()
	const {
		data: { user }
	} = await (await supabase).auth.getUser()

	if (user) {
		redirect('/')
	}

	const prefectures = await getPrefecture('prefecture')
	if (prefectures instanceof NextResponse) {
		const errorData = await prefectures.json()
		// eslint-disable-next-line no-console
		console.error(errorData)
		return (
			<div className='flex h-screen items-center justify-center'>
				<p className='text-red-500'>
					都道府県の取得中にエラーが発生しました。しばらくしてからもう一度お試しください。
				</p>
			</div>
		)
	}
	const prefectureOptions = prefectures.map((prefecture) => ({
		value: prefecture.code.toString(),
		label: prefecture.name
	}))

	return (
		<div className='flex min-h-[calc(100vh-64px-64px)] items-center justify-center'>
			<SignupForm prefectureOptions={prefectureOptions} />
		</div>
	)
}
