import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/lib/supabase/supabaseServerClient'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)

	const type = searchParams.get('type') as EmailOtpType | null
	const next = searchParams.get('next') ?? '/'
	const supabase = await createClient()
	const { error } = await supabase.auth.signOut()

	if (type) {
		if (!error) {
			redirect(next)
		}
	}
	redirect('/error')
}
