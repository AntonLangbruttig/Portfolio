"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "../constants";
import { MenuItemWithSubMenuProps, SideNavItem } from "../types";
import { Icon } from "@iconify/react";
import { motion, useCycle } from "framer-motion";
import { animationSequence } from "./animation";

const sidebarVariants = {
  open: {
    height: "100vh",
    transition: {
      height: { duration: 0.5, easing: "easeInOut" },
    },
  },
  closed: {
    height: 0,
    transition: {
      height: { duration: 0.5, easing: "easeInOut" },
    },
  },
};

const HeaderMobile = () => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [showNav, setShowNav] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);

  useEffect(() => {
    // Delay the nav display by 5 seconds
    const navTimeout = setTimeout(() => {
      setShowNav(true);
      // Animate nav opacity
      const opacityInterval = setInterval(() => {
        setNavOpacity((prevOpacity) => {
          if (prevOpacity < 1) {
            return Math.min(prevOpacity + 0.1, 1);
          }
          clearInterval(opacityInterval);
          return prevOpacity;
        });
      }, 100); // 0.1 opacity every 100ms
    }, 5000); // 5 seconds

    return () => {
      clearTimeout(navTimeout); // Cleanup timeout
    };
  }, []);

  return (
    <>
      {showNav && (
        <motion.button
          onClick={() => toggleOpen()}
          initial={{ opacity: 0 }}
          animate={{ opacity: navOpacity }}
          className="pointer-events-auto fixed top-5 right-4 z-50 md:hidden"
          aria-label="Toggle menu"
        >
          <motion.svg width="23" height="23" viewBox="0 0 23 23">
          <motion.path
  fill="transparent"
  strokeWidth="2"
  stroke="#00ffff"
  strokeLinecap="round"
  initial={{ d: "M 2 2.5 L 20 2.5" }}
  animate={isOpen ? { d: "M 3 16.5 L 17 2.5" } : { d: "M 2 2.5 L 20 2.5" }}
  transition={{ duration: 0.3 }}
/>

<motion.path
  fill="transparent"
  strokeWidth="2"
  stroke="#00ffff"
  strokeLinecap="round"
  initial={{ d: "M 2 9.423 L 20 9.423", opacity: 0 }}
  animate={isOpen ? { d: "M 2 9.423 L 20 9.423", opacity: 0 } : { d: "M 2 9.423 L 20 9.423", opacity: 1 }}
  transition={{ duration: 0.3 }}
/>

<motion.path
  fill="transparent"
  strokeWidth="2"
  stroke="#00ffff"
  strokeLinecap="round"
  initial={{ d: "M 2 16.346 L 20 16.346" }}
  animate={isOpen ? { d: "M 3 2.5 L 17 16.346" } : { d: "M 2 16.346 L 20 16.346" }}
  transition={{ duration: 0.3 }}
/>

          </motion.svg>
        </motion.button>
      )}

      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        className={`fixed inset-x-0 top-[68px] z-50 w-full md:hidden ${isOpen ? "" : "pointer-events-none"}`}
        ref={containerRef}
      >
        <motion.div
          className="absolute inset-0 top-0 w-full"
          variants={sidebarVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          style={{
            background: `
              linear-gradient(45deg, rgba(212, 0, 255, 0.29), rgba(0, 191, 255, 0.3)),
              linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25)),
              linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06)),
              black
            `,
          }}
        >
          <div className="absolute inset-0 pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-transparent before:via-black/25 before:to-transparent before:z-10 before:bg-[length:100%_2px,3px_100%]"></div>
        </motion.div>

        <motion.ul
          variants={listVariants}
          className="absolute grid w-full gap-3 px-10 py-16 max-h-screen overflow-y-auto text-[#B19CD9]"
        >
          {SIDENAV_ITEMS.map((item, idx) => (
            <div key={idx}>
              {item.submenu ? (
                <MenuItemWithSubMenu item={item} toggleOpen={toggleOpen} />
              ) : (
                <MenuItem>
                  <Link
                    href={item.path}
                    onClick={() => toggleOpen()}
                    className={`flex w-full text-2xl ${
                      item.path === pathname ? "font-bold text-[#00ffff]" : ""
                    }`}
                  >
                    {item.title}
                  </Link>
                </MenuItem>
              )}
              {idx < SIDENAV_ITEMS.length - 1 && (
                <MenuItem className="my-3 h-[2px] w-full bg-[#00ffff]" />
              )}
            </div>
          ))}
        </motion.ul>
      </motion.nav>
    </>
  );
};

export default HeaderMobile;

// Utility functions and components:

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="#00ffff"
    strokeLinecap="round"
    {...props}
  />
);

const MenuItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => (
  <motion.li variants={menuItemVariants} className={className}>
    {children}
  </motion.li>
);

const MenuItemWithSubMenu: React.FC<MenuItemWithSubMenuProps> = ({
  item,
  toggleOpen,
}) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      <MenuItem>
        <button
          className="flex w-full text-2xl"
          onClick={() => setSubMenuOpen(!subMenuOpen)}
        >
          <div className="flex flex-row justify-between w-full items-center">
            <span
              className={`${pathname.includes(item.path) ? "font-bold" : ""}`}
            >
              {item.title}
            </span>
            <div className={`${subMenuOpen && "rotate-180"}`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </div>
        </button>
      </MenuItem>
      {subMenuOpen && (
        <div className="mt-2 ml-2 flex flex-col space-y-2">
          {item.subMenuItems?.map((subItem, subIdx) => (
            <MenuItem key={subIdx}>
              <Link
                href={subItem.path}
                onClick={() => toggleOpen()}
                className={`${
                  subItem.path === pathname ? "font-bold" : ""
                }`}
              >
                {subItem.title}
              </Link>
            </MenuItem>
          ))}
        </div>
      )}
    </>
  );
};

const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
};

const listVariants = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
};

const useDimensions = (ref: any) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};
