import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import Login from './login';
import { link as linkStyles } from '@nextui-org/theme';
import NextLink from 'next/link';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';

import Image from 'next/image';
import logo from '@/public/logo.svg';

export const Navbar = () => {
  return (
    <div className='p-4'>
      <NextUINavbar
        className='bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-500 rounded-2xl shadow-lg'
        isBordered
        maxWidth='full'
        height={85}
        position='sticky'
      >
        <NavbarContent
          className='basis-1/5 sm:basis-full'
          justify='start'
        >
          <NavbarBrand
            as='li'
            className='gap-3 max-w-fit'
          >
            <NextLink
              className='flex justify-start items-center gap-1'
              href='/'
            >
              <Image
                className='mt-3'
                src={logo}
                alt='cnc logo'
                width={100}
              />
            </NextLink>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify='end'>
          <ul className='hidden lg:flex gap-4 ml-2 justify-end'>
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: 'foreground' }),
                    ' font-sans-thai data-[active=true]:text-primary data-[active=true]:font-medium m-[1rem] '
                  )}
                  color='foreground'
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
            <ThemeSwitch />
            <Login className='justify-center mt-2' />
          </ul>
        </NavbarContent>

        <NavbarContent
          className='sm:hidden basis-1 pl-4'
          justify='end'
        >
          <Login />
          <ThemeSwitch />
          <NavbarMenuToggle className='text-primary' />
        </NavbarContent>
        <NavbarMenu className='pt-6'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                className='w-full'
                href={item.label}
                size='lg'
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NextUINavbar>
    </div>
  );
};
