
import { Icon } from '@iconify/react';
import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24"/>,
  },
  {
    title: 'About',
    path: '/about',
    icon: <Icon icon="lucide:file-user" width="24" height="24"/>,
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: false,
    subMenuItems: [
      { title: 'All', path: '/projects/luxAbout' },
      { title: 'Web Design', path: '/projects/portfolioAbout' },
    ],
  },
  {
    title: 'Skills',
    path: '/skills',
    icon: <Icon icon="lucide:file-user" width="24" height="24"/>,
  },
  {
    title: 'Contact',
    path: '/contact',
    icon: <Icon icon="lucide:mail" width="24" height="24"/>,
  },
];



