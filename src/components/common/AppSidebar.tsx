import { KeyRound, Mail, UserCog } from 'lucide-react'

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar'

// Menu items.
const items = [
	{
		title: 'プロフィール編集',
		url: '/profile',
		icon: UserCog
	},
	{
		title: 'メールアドレス編集',
		url: '/edit/email',
		icon: Mail
	},
	{
		title: 'パスワード変更',
		url: '#',
		icon: KeyRound
	}
]

export function AppSidebar() {
	return (
		<Sidebar
			variant='sidebar'
			collapsible='offcanvas'
			className='min-h-[calc(100vh-64px-64px)]'
		>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>プロフィール</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
