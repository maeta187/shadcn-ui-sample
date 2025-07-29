'use client'

import { signOut } from '@/app/(signout)/actions'
import { Dialog } from '@/components/common/Dialog'
import { Button } from '@/components/ui/button'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList
} from '@/components/ui/navigation-menu'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'
import { Session } from '@supabase/supabase-js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

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
	const router = useRouter()
	const onSignOut = async () => {
		await signOut()
		toast.info('ログアウトしました')
		router.push('/')
		router.refresh()
	}

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
		},
		// TODO:画像アップロード機能を実装したら画像を表示するように修正する
		{
			title: 'プロフィール',
			href: '/profile',
			className: '',
			variant: 'ghost',
			session: !session
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
				{!!session && (
					<Dialog
						title='ログアウトしますが、宜しいですか？'
						actionText='ログアウト'
						onClick={onSignOut}
					>
						<ArrowRightStartOnRectangleIcon className='h-8 w-8 cursor-pointer' />
					</Dialog>
				)}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
