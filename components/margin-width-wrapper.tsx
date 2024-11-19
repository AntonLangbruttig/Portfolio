// import { ReactNode } from 'react';
// import SideNav from './side-nav';

// export default function MarginWidthWrapper({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   // return (
//   //   // <div className="flex flex-col min-h-screen bg-black-100 w-full">
//   //   //   <div className="grid grid-cols-12">
//   //   //   <div className="col-span-4 bg-red-500 w-full">{children}</div>
//   //   //   <div className="col-span-4 bg-blue-500 w-full">ddd</div>
//   //   //   <div className="col-span-4 bg-green-500 w-full">ddddd</div>
//   //   //   </div>
//   //   // </div>
//   // );
// }

'use client';

import React, { useState, useEffect} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';



export default function SideNave() {
  return (
    <div className="lg:bg-white backdrop-blur-lg h-screen ml-14  shadow-lg  text-gray-800 ">
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
 
)
}

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
}

