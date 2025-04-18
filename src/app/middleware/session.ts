import { updateSession } from '@/lib/updateSession'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	return await updateSession(request)
}
