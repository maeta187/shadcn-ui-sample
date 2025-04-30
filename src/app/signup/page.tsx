import { SignupForm } from '@/app/signup/_components/SignupForm'
import { getPrefecture } from '@/app/signup/actions'
import { createClient } from '@/lib/supabaseServerClient'
import { redirect } from 'next/navigation'

export default async function Page() {
	const supabase = createClient()
	const {
		data: { user }
	} = await (await supabase).auth.getUser()

	if (user) {
		redirect('/')
	}

	const prefectures = await getPrefecture('prefecture')
	const prefectureOptions = prefectures.map((prefecture) => ({
		value: prefecture.code.toString(),
		label: prefecture.name
	}))

	return (
		<div className='flex min-h-[calc(100vh-64px-64px)] items-center justify-center py-20'>
			<SignupForm prefectureOptions={prefectureOptions} />
		</div>
	)
}
