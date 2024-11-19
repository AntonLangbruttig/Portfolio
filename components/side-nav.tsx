'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
// import { SIDENAV_ITEMS } from '@/constants';



export default function ViewWindow() {
  const [infoText, setInfoText] = useState('')
  const [imageLines, setImageLines] = useState(0)
  const [animationState, setAnimationState] = useState('initial')
  const [showBackground, setShowBackground] = useState(false)
  const [showLine, setShowLine] = useState(false)

  
  const fullInfoText = "Anton Langbruttig\n\nFull Stack\nWeb Developer\n\nSpecializing in:\n- React\n- Node.js\n- TypeScript\n- NextJS"

  useEffect(() => {
    const initialDelay = 1000;
    const lineAnimationDuration = 3000;
    const staticDuration = 2000;
    const flickerDuration = 1000;
    const contentDelay = 500;

    const animationSequence = async () => {
      await new Promise(resolve => setTimeout(resolve, initialDelay));

      setShowLine(true)
      setAnimationState('line')
      await new Promise(resolve => setTimeout(resolve, lineAnimationDuration));

      setShowBackground(true)
      setAnimationState('static')
      await new Promise(resolve => setTimeout(resolve, staticDuration));

      setAnimationState('screenOn')
      await new Promise(resolve => setTimeout(resolve, flickerDuration));

      setAnimationState('content')
      await new Promise(resolve => setTimeout(resolve, contentDelay));

      let currentImageLines = 0
      const totalImageLines = 50

      const imageIntervalId = setInterval(() => {
        if (currentImageLines < totalImageLines) {
          currentImageLines++
          setImageLines(currentImageLines)
        } else {
          clearInterval(imageIntervalId)
        }
      }, 100)
    }

    animationSequence();
  }, [])
  

  return (
    
      <div className="bg-transparent h-screen ml-14">
        
        <div className={`relative w-full h-full aspect-video rounded-lg overflow-hidden shadow-lg
          ${showBackground ? 'old-tv-background' : ''}
          ${animationState === 'static' ? 'tv-static' : ''}
          ${animationState === 'screenOn' ? 'tv-flicker' : ''}
          ${animationState === 'content' ? 'screen-on' : ''}
        `}
        style={{
          boxShadow: showBackground ? '0 0 20px #00ffff, 0 0 40px #00ffff' : 'none',
          transition: 'all 0.5s ease-out',
          borderRadius: '2px',
        }}
      >
        <div
        className="absolute inset-0 flex items-center justify-center z-10"
        >
          <nav className="flex flex-col space-y-2 mt-4">
            {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
            })}
          </nav>

        </div>
        {animationState !== 'initial' && animationState !== 'line' && <div className="crt-effect"></div>}
        {showLine && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line className="animate-draw" x1="0" y1="0" x2="0" y2="100" stroke="#00ffff" strokeWidth="1.2" />
            <line className="animate-draw" x1="100" y1="0" x2="100" y2="100" stroke="#00ffff" strokeWidth="1.2" />
          </svg>
        )}
        {animationState === 'content' && (
          <div className="w-1/2 p-4 flex items-center justify-center">
            <div className="w-full h-full p-4 rounded-lg flex items-top justify-left">
              <pre
                className="text-100 md:text-lg lg:text-xl"
                style={{
                  color: '#ffffff',
                  textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff',
                  fontFamily: '"VT323", monospace',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  textAlign: 'left',
                }}
              >
                
                {infoText}<span className="animate-blink">_</span>
              </pre>
            </div>
          </div>)}
      </div>
    <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

        body {
          background-color: #000;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .animate-blink {
          animation: blink 0.7s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .old-tv-background {
          background: #000;
          position: relative;
          overflow: hidden;
        }
        .old-tv-background::before {
          content: " ";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 30%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          z-index: 2;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }
        .crt-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.3) 100%);
          pointer-events: none;
          z-index: 10;
        }
        .tv-static {
          animation: tvStatic 0.2s steps(10) infinite;
        }
        @keyframes tvStatic {
          0% { background-position: 0 0; }
          100% { background-position: 100% 100%; }
        }
        .tv-flicker::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #fff;
          opacity: 0;
          z-index: 3;
          animation: tvFlicker 0.2s steps(4) 5;
          pointer-events: none;
        }
        .screen-on::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255, 0, 255, 0.3), rgba(0, 255, 255, 0.3));
          opacity: 0;
          animation: screenOn 0.5s forwards;
          z-index: 1;
        }
        @keyframes screenOn {
          0% { opacity: 0; }
          100% { opacity: 0.5; }
        }
        @keyframes draw {
          0% {
            stroke-dasharray: 0 100;
          }
          100% {
            stroke-dasharray: 100 100;
          }
        }
        .animate-draw {
          animation: draw 3s linear forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
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
