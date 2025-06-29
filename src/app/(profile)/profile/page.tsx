import { EditProfile } from '@/app/(profile)/profile/_components/EditProfile'
import { getUser } from '@/app/(profile)/profile/actions'
import { getPrefecture } from '@/app/signup/actions'

export default async function Page() {
	const profile = await getUser()
	const prefectures = await getPrefecture('prefecture')
	const prefectureOptions = prefectures.map((prefecture) => ({
		value: prefecture.code.toString(),
		label: prefecture.name
	}))

	if (!profile) {
		throw new Error('プロフィールが見つかりませんでした')
	}

	return (
		<div className='flex min-h-[calc(100vh-64px-64px-64px)] px-12 py-20'>
			<EditProfile profile={profile} prefectureOptions={prefectureOptions} />
		</div>
	)
}
