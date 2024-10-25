'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

// Define the SideNavItem type
type SideNavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  submenu?: boolean;
  subMenuItems?: { title: string; path: string }[];
};

// Define the SIDENAV_ITEMS constant
const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Help',
    path: '/help',
    icon: <Icon icon="lucide:info" width="24" height="24" />,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Icon icon="lucide:info" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/settings/account' },
      { title: 'Privacy', path: '/settings/privacy' },
    ],
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Web Design', path: '/projects/web-design' },
    ],
  },
  {
    title: 'Contact',
    path: '/contact',
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
];

const SideNav = () => {
  return (
    <div className="bg-white/30 backdrop-blur-md h-screen fixed top-0 left-[200px] z-50 border-r shadow-lg overflow-y-auto text-gray-800 w-64">
      <Link
        href="/"
        className="flex flex-row space-x-3 items-center justify-start px-4 py-4"
      >
        <span className="font-bold text-2xl">Your Logo</span>
      </Link>

      <nav className="flex flex-col space-y-2 mt-4">
        {SIDENAV_ITEMS.map((item, idx) => {
          return <MenuItem key={idx} item={item} />;
        })}
      </nav>
    </div>
  );
};

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="w-full">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover:bg-white/50 w-full justify-between ${
              pathname.includes(item.path) ? 'bg-white/50' : ''
            }`}
            aria-expanded={subMenuOpen}
            aria-controls={`submenu-${item.title}`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-xl flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex transition-transform`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div id={`submenu-${item.title}`} className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? 'font-bold' : ''
                    } hover:underline`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-white/50 ${
            item.path === pathname ? 'bg-white/50' : ''
          }`}
        >
          {item.icon}
          <span className="font-semibold text-xl flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};

export default SideNav;