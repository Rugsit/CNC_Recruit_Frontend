'use client'
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
import LoginPopup from '@/app/home/_local/loginPopup';
import { useEffect, useState } from 'react';
import { MenuBar } from './icons';
import { Button } from '@nextui-org/button';

export const Navbar = () => {
  const [loginIsClosed, setLoginIsClosed] = useState(true);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const closeLoginPopup = () => {
    setLoginIsClosed(true);
  };

  useEffect(()=> {
    if (!loginIsClosed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"
    }
  }, [loginIsClosed])
  return (
    <div className={clsx('p-4 fixed w-full z-40', {
    })}>
      <div className={clsx("bg-black/[.5] fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center transition-all", {
        " pointer-events-none opacity-0" : loginIsClosed,
        " opacity-100" : !loginIsClosed
      })}>
        <LoginPopup onClose={closeLoginPopup} onLoginSuccess={() => {}} isOpen={loginIsClosed}/>
      </div>
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
              href='/home'
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
                    ' font-sans-thai data-[active=true]:text-primary data-[active=true]:font-medium m-[1rem] hover:text-[#42B5FC] transition-all'
                  )}
                  color='foreground'
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
            <Login onOpenPopup={() => {
              setLoginIsClosed(false);
            }}/>
          </ul>
        </NavbarContent>
      <Button className='bg-white z-50 rounded-full top-0 left-0 xl:opacity-0 lg:absolute lg:opacity-0' isIconOnly onClick={() => {
        setIsNavMenuOpen(!isNavMenuOpen);
      }}>
        <MenuBar width={50} height={50}/>
      </Button>
      </NextUINavbar>
      <button className={clsx('fixed left-0 right-0 top-0 bottom-0 bg-black/20 ', {
        " pointer-events-none opacity-0" : !isNavMenuOpen
      })} onClick={() => {
        setIsNavMenuOpen(!isNavMenuOpen);
      }}></button>
      <div className={clsx('fixed top-[100px] m-[16px] left-0 right-0 transition-all bg-white rounded-md  p-5 lg:opacity-0 lg:pointer-events-none', {
        " pointer-events-none opacity-0 scale-75" : !isNavMenuOpen
      })} >
        <ul className='flex flex-col lg:hidden gap-4 justify-end'>
          {siteConfig.navItems.map((item) => (
            <div key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  ' font-sans-thai data-[active=true]:text-primary data-[active=true]:font-medium m-[1rem] hover:text-[#42B5FC] transition-all'
                )}
                color='foreground'
                href={item.href}
              >
                {item.label}
              </Link>
            </div>
          ))}
          <Login onOpenPopup={() => {
            setLoginIsClosed(false);
          }}/>
        </ul>
      </div>
    </div>
  );
};
