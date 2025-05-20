export default function Page() {
	return (
		<div className='flex min-h-[calc(100vh-64px-64px)] flex-col items-center justify-center py-20'>
			<h2 className='text-primary mb-5 border-b border-black pt-3 pb-5 text-center text-xl font-bold'>
				パスワード再設定メール送信
			</h2>
			<ul className='space-y-3 text-sm'>
				<li>メールアドレスにパスワード再設定に必要な情報を送信しました。</li>
				<li>メールのURLよりパスワードを再設定してください。</li>
				<li>
					※メールが届かない場合、入力したメールアドレスが間違っている可能性があります。
				</li>
				<li>お手数ですが、再度、パスワード再設定からやり直してください。</li>
			</ul>
		</div>
	)
}
