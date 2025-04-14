import { ProfileForm } from '@/app/profile-form/_components/ProfileForm'
import { getPrefecture } from '@/app/profile-form/actions'
import { NextResponse } from 'next/server'

export default async function Page() {
	const prefectures = await getPrefecture('prefecture')
	if (prefectures instanceof NextResponse) {
		// TODO: 適切なエラーハンドリングを行う
		const errorData = await prefectures.json()
		console.error(errorData)
		return
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
