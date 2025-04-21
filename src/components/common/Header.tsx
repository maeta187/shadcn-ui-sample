'use client'
import { Button } from '@/components/ui/button'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList
} from '@/components/ui/navigation-menu'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'

interface NavigationProps {
	user: User | null
}

const navigationList: { title: string; href: string }[] = [
	{
		title: 'Signup',
		href: '/signup'
	}
]

export const Header = ({ user }: NavigationProps) => {
	console.log(user)

	return (
		<header className='flex h-16 items-center border-b px-6'>
			<Button variant='ghost' asChild>
				<Link href='/'>header</Link>
			</Button>
			<HeaderNavigationMenu />
		</header>
	)
}

const HeaderNavigationMenu = () => {
	return (
		<NavigationMenu className='ml-auto'>
			<NavigationMenuList className='flex items-center gap-4'>
				{navigationList.map((navigation, i) => (
					<NavigationMenuItem key={i}>
						<Button variant='default' className='hover:text-white' asChild>
							<Link href={navigation.href}>{navigation.title}</Link>
						</Button>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
