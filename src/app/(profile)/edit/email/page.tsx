import { EditEmail } from '@/app/(profile)/edit/email/_components/EditEmail'
import { getUserEmail } from '@/app/(profile)/edit/email/actions'

export default async function Page() {
	const email = await getUserEmail()

	if (!email) {
		throw new Error('Emailアドレスの取得に失敗しました')
	}

	return (
		<div className='flex min-h-[calc(100vh-64px-64px-64px)] px-12 py-20'>
			<EditEmail email={email} />
		</div>
	)
}
