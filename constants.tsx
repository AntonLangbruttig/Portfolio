
import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24" color="#9A8ABF"/>,
  },
  {
    title: 'About',
    path: '/about',
    icon: <Icon icon="lucide:file-user" width="24" height="24" color="#9A8ABF"/>,
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: <Icon icon="lucide:folder" width="24" height="24" color="#9A8ABF"/>,
  },
  {
    title: 'Contact',
    path: '/contact',
    icon: <Icon icon="lucide:mail" width="24" height="24" color="#9A8ABF"/>,
  },
];



//example of item with submenu

// {
//   title: 'Projects',
//   path: '/projects',
//   icon: <Icon icon="lucide:folder" width="24" height="24" color="#22d3ee"/>,
//   submenu: true,
//   subMenuItems: [
//     { title: 'All', path: '/projects' },
//     { title: 'Web Design', path: '/projects/web-design' },
//   ],
// },
