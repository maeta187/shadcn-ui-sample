import { SetPassWordForm } from '@/app/(auth)/auth/password/_components/SetPassWordForm'
import { createClient } from '@/lib/supabase/supabaseServerClient'
import { redirect } from 'next/navigation'

export default async function Page() {
	const supabase = await createClient()
	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/')
	}

	return (
		<div className='flex min-h-[calc(100vh-64px-64px)] items-center justify-center px-6 py-20'>
			<SetPassWordForm />
		</div>
	)
}
