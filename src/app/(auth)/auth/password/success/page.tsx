import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
	return (
		<div className='flex min-h-[calc(100vh-64px-64px)] flex-col items-center justify-center py-20'>
			<h2 className='text-primary mb-5 border-b border-black pt-3 pb-5 text-center text-xl font-bold'>
				パスワード設定完了
			</h2>
			<ul className='space-y-3 text-center text-sm'>
				<li>パスワードの変更が完了しました。</li>
				<li>ログインしてご利用ください。</li>
			</ul>
			<div className='mt-3'>
				<Button variant='default' asChild>
					<Link href='/login'>ログイン</Link>
				</Button>
			</div>
		</div>
	)
}
