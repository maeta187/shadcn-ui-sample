export default function Page() {
	return (
		<div className='flex min-h-[calc(100vh-64px-64px)] flex-col items-center justify-center'>
			<h2 className='text-primary mb-5 border-b border-black pt-3 pb-5 text-center text-xl font-bold'>
				アカウント本登録メール送信
			</h2>

			<ul className='space-y-3 text-sm'>
				<li>メールアドレスにアカウント本登録に必要な情報を送信しました。</li>
				<li>メールのURLよりアカウント本登録を完了させてください。</li>
				<li>
					※メールが届かない場合、入力したメールアドレスが間違っている可能性があります。
				</li>
				<li>お手数ですが、再度、アカウント登録からやり直してください。</li>
			</ul>
		</div>
	)
}
