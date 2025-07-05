import { AppSidebar } from '@/components/common/AppSidebar'
import {
        SidebarInset,
        SidebarProvider,
        SidebarTrigger
} from '@/components/ui/sidebar'
import { cookies } from 'next/headers'

export default async function Layout({
        children
}: {
        children: React.ReactNode
}) {
        const cookieStore = await cookies()
        const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

        return (
                <SidebarProvider defaultOpen={defaultOpen} className='min-h-[calc(100vh-64px-64px)]'>
                        <AppSidebar />
                        <section className='w-full'>
                                <SidebarTrigger />
                                <SidebarInset>{children}</SidebarInset>
                        </section>
                </SidebarProvider>
        )
}
