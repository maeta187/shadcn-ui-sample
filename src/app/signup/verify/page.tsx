'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
	const router = useRouter()

	useEffect(() => {
		router.refresh()
	}, [router])

	return (
		<div className='flex min-h-[calc(100vh-64px-64px)] flex-col items-center justify-center'>
			<h2 className='text-primary mb-5 border-b border-black pt-3 pb-5 text-center text-xl font-bold'>
				アカウント本登録完了
			</h2>

			<p className='mb-5 text-center text-sm'>
				アカウント本登録が完了しました。
			</p>

			<Button asChild className='w-min'>
				<Link href='/'>トップページ</Link>
			</Button>
		</div>
	)
}
