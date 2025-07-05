'use client'

import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'

export default function Error({ error }: { error: Error }) {
        // eslint-disable-next-line no-console
        console.error(error)

        return (
                <div className='flex min-h-[calc(100vh-64px-64px)] flex-col items-center justify-center'>
                        <h2 className='mb-4 text-2xl font-bold'>{error.message}</h2>
                        <p className='mb-8 text-gray-600'>再度ログインしてください。</p>
                        <Button type='button' size='lg' onClick={() => redirect('/')}>
                                ホームへ戻る
                        </Button>
                </div>
        )
}
