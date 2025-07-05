import { EditEmail } from '@/app/(profile)/profile/email/_components/EditEmail'
import { getUserEmail } from '@/app/(profile)/profile/email/actions'

export default async function Page() {
        const user = await getUserEmail()

        if (!user) {
                throw new Error('ユーザー情報が見つかりませんでした')
        }

        return (
                <div className='flex min-h-[calc(100vh-64px-64px-64px)] px-12 py-20'>
                        <EditEmail email={user.email} />
                </div>
        )
}
