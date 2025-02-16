'use client';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { link as linkStyles } from '@nextui-org/theme';
import NextLink from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import { MenuBar } from './icons';
import Login from './login';

import LoginPopup from '@/app/home/_local/loginPopup';
import logo from '@/public/logo.svg';
import { siteConfig } from '@/config/site';

export const Navbar = () => {
  const [loginIsClosed, setLoginIsClosed] = useState(true);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [role, setRole] = useState('candidate');
  const { data, status } = useSession();
  const closeLoginPopup = () => {
    setLoginIsClosed(true);
  };

  const fetchRole = async () => {
    if (data?.user.role) {
      setRole(data?.user.role);
    }
  };

  useEffect(() => {
    if (status != 'loading') {
      fetchRole();
    }
  }, [status]);

  useEffect(() => {
    if (!loginIsClosed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loginIsClosed]);

  return (
    <div className={clsx('p-4 fixed w-full z-40', {})}>
      <div
        className={clsx(
          'bg-black/[.5] fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center transition-all',
          {
            ' pointer-events-none opacity-0': loginIsClosed,
            ' opacity-100': !loginIsClosed,
          }
        )}
      >
        <LoginPopup
          isOpen={loginIsClosed}
          onClose={closeLoginPopup}
          onLoginSuccess={() => {}}
        />
      </div>
      <NextUINavbar
        isBordered
        className='bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-500 rounded-2xl shadow-lg'
        height={85}
        maxWidth='full'
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
                alt='cnc logo'
                className='mt-3'
                src={logo}
                width={100}
              />
            </NextLink>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify='end'>
          <ul className='hidden lg:flex gap-4 ml-2 items-center'>
            {role === 'candidate' ? (
              siteConfig.navItems.map((item) => (
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
              ))
            ) : (
              <div>
                <Link
                  className={clsx(
                    linkStyles({ color: 'foreground' }),
                    ' font-sans-thai data-[active=true]:text-primary data-[active=true]:font-medium m-[1rem] hover:text-[#42B5FC] transition-all'
                  )}
                  color='foreground'
                  href={'/admin/candidate-list'}
                >
                  รายละเอียดผู้สมัคร
                </Link>
                <Link
                  className={clsx(
                    linkStyles({ color: 'foreground' }),
                    ' font-sans-thai data-[active=true]:text-primary data-[active=true]:font-medium m-[1rem] hover:text-[#42B5FC] transition-all'
                  )}
                  color='foreground'
                  href={'/admin/date-candidate'}
                >
                  ตารางเวลา
                </Link>
              </div>
            )}
            <Login
              onOpenPopup={() => {
                setLoginIsClosed(false);
              }}
            />
          </ul>
        </NavbarContent>
        <Button
          isIconOnly
          className='bg-white z-50 rounded-full top-0 left-0 xl:opacity-0 lg:absolute lg:opacity-0 lg:pointer-events-none'
          data-hover={false}
          onClick={() => {
            setIsNavMenuOpen(!isNavMenuOpen);
          }}
        >
          <MenuBar
            height={50}
            width={50}
          />
        </Button>
      </NextUINavbar>
      <button
        className={clsx('fixed left-0 right-0 top-0 bottom-0 bg-black/20 ', {
          ' pointer-events-none opacity-0': !isNavMenuOpen,
        })}
        onClick={() => {
          setIsNavMenuOpen(!isNavMenuOpen);
        }}
      />
      <div
        className={clsx(
          'fixed top-[100px] m-[16px] left-0 right-0 transition-all bg-white rounded-md  p-5 lg:opacity-0 lg:pointer-events-none',
          {
            ' pointer-events-none opacity-0 scale-75': !isNavMenuOpen,
          }
        )}
      >
        <ul className='flex flex-col lg:hidden gap-4 justify-end'>
          {role === 'candidate' ? (
            siteConfig.navItems.map((item) => (
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
            ))
          ) : (
            <div>
              <Link
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  ' font-sans-thai data-[active=true]:text-primary data-[active=true]:font-medium m-[1rem] hover:text-[#42B5FC] transition-all'
                )}
                color='foreground'
                href={'/admin/candidate-list'}
              >
                รายละเอียดผู้สมัคร
              </Link>
            </div>
          )}
          <Login
            onOpenPopup={() => {
              setLoginIsClosed(false);
            }}
          />
        </ul>
      </div>
    </div>
  );
};
