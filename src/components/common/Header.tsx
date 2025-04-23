'use client'
import { Button } from '@/components/ui/button'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList
} from '@/components/ui/navigation-menu'
import { Session } from '@supabase/supabase-js'
import Link from 'next/link'

interface NavigationProps {
	session: Session | null
}

export const Header = ({ session }: NavigationProps) => {
	return (
		<header className='flex h-16 items-center border-b px-6'>
			<Button variant='ghost' asChild>
				<Link href='/'>header</Link>
			</Button>
			<HeaderNavigationMenu session={session} />
		</header>
	)
}

const HeaderNavigationMenu = ({ session }: NavigationProps) => {
	const navigationList: {
		title: string
		href: string
		className: string
		variant: 'default' | 'secondary' | 'ghost'
		session: boolean
	}[] = [
		{
			title: 'Login',
			href: '/login',
			className: '',
			variant: 'ghost',
			session: false
		},
		{
			title: 'Signup',
			href: '/signup',
			className: '',
			variant: 'default',
			session: !!session
		}
	]

	return (
		<NavigationMenu className='ml-auto'>
			<NavigationMenuList className='flex items-center gap-4'>
				{navigationList
					.filter((navigation) => !navigation.session)
					.map((navigation, i) => (
						<NavigationMenuItem key={i}>
							<Button
								variant={navigation.variant}
								className={navigation.className}
								asChild
							>
								<Link href={navigation.href}>{navigation.title}</Link>
							</Button>
						</NavigationMenuItem>
					))}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
