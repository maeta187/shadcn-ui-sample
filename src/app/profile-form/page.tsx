import { ProfileForm } from '@/app/profile-form/_components/ProfileForm'
import { getPrefecture } from '@/app/profile-form/actions'
import { NextResponse } from 'next/server'

export default async function Page() {
	const prefectures = await getPrefecture('prefecture')
	if (prefectures instanceof NextResponse) {
		const errorData = await prefectures.json()
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
		<div className='flex h-screen items-center justify-center'>
			<ProfileForm prefectureOptions={prefectureOptions} />
		</div>
	)
}
