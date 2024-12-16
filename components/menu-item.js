import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useState } from 'react';


const MenuItem = ({ item }) => {
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
            className={`flex flex-row items-center p-4 rounded-lg hover:bg-white/50 w-full justify-between ${
              pathname.includes(item.path) ? 'bg-white/50' : ''
            }`}
            aria-expanded={subMenuOpen}
            aria-controls={`submenu-${item.title}`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span
                className="font-semibold text-xl flex"
                style={{
                  color: '#33FFFF',
                  fontFamily: '"VT323", monospace',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  textAlign: 'left',
                  fontSize: '1.5rem',
                }}
              >
                {item.title}
              </span>
            </div>

            <div
              className={`${subMenuOpen ? 'rotate-180' : ''} flex transition-transform`}
            >
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div
              id={`submenu-${item.title}`}
              className="my-2 ml-12 flex flex-col space-y-4"
              style={{
                color: '#33FFFF',
                fontFamily: '"VT323", monospace',
                fontWeight: '400',
                letterSpacing: '0.05em',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                textAlign: 'left',
                fontSize: '1.5rem',
              }}
            >
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? 'font-bold' : ''
                    } hover:underline`}
                    style={{
                      color: '#33FFFF',
                      fontFamily: '"VT323", monospace',
                      fontWeight: '400',
                      letterSpacing: '0.05em',
                      lineHeight: '1.6',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      textAlign: 'left',
                      fontSize: '1.5rem',
                    }}
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
          className={`flex flex-row space-x-4 items-center p-4 rounded-lg ${
            item.path === pathname ? '' : ''
          }`}
        >
          {item.icon}
          <span
            className="font-semibold text-xl flex"
            style={{
              color: '#33FFFF',
              fontFamily: '"VT323", monospace',
              fontWeight: '400',
              letterSpacing: '0.05em',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              textAlign: 'left',
              fontSize: '1.5rem',
            }}
          >
            {item.title}
          </span>
        </Link>
      )}
    </div>
  );
};

export default MenuItem;