export default function Page() {
	return (
		<div className='flex min-h-[calc(100vh-64px-64px-64px)] justify-center px-12 py-20'>
			<div className='w-1/2 space-y-8'>
				<h2 className='text-center text-2xl font-bold'>
					メールアドレス変更メール送信
				</h2>
				<hr className='m-0 border-t-1 border-black pb-4' />

				<ul className='mx-auto max-w-prose list-inside space-y-2 text-left text-sm'>
					<li>
						新しいメールアドレスにメールアドレス変更に必要な情報を送信しました。
					</li>
					<li>メールのURLよりメールアドレス変更を完了させてください。</li>
					<li>
						※メールが届かない場合、入力したメールアドレスが間違っている可能性があります。
					</li>
					<li>
						お手数ですが、再度、メールアドレス変更からやり直してください。
					</li>
					<li></li>
				</ul>
			</div>
		</div>
	)
}
