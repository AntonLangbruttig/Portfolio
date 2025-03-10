import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

const MenuItem = ({ item }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  // Function to determine if the current item or sub-item is active
  const isActive = (itemPath) => {
    return (
      pathname === itemPath ||
      (item.subMenuItems &&
        item.subMenuItems.some((subItem) => subItem.path === pathname))
    );
  };

  return (
    <div className="w-full">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-4 rounded-lg transition-all duration-300 w-full justify-between group ${
              isActive(item.path) ? "bg-white" : "hover:text-white"
            }`}
            aria-expanded={subMenuOpen}
            aria-controls={`submenu-${item.title}`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon && (
                <span
                  style={{ color: isActive(item.path) ? "#00ffff" : "#33FFFF" }}
                >
                  {item.icon}
                </span>
              )}
              <span
                className="font-semibold text-xl flex transition-all duration-300 hover:text-white px-2 py-1  group-hover:text-white"
                style={{
                  color: isActive(item.path) ? "#00ffff" : "#33FFFF",
                  fontFamily: '"VT323", monospace',
                  fontWeight: "400",
                  letterSpacing: "0.05em",
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  textAlign: "left",
                  fontSize: "1.5rem",
                }}
              >
                {item.title}
              </span>
            </div>

            <div
              className={`${
                subMenuOpen ? "rotate-180" : ""
              } flex transition-transform`}
            >
              <Icon icon="lucide:chevron-down" width="24" height="24"/>
            </div>
          </button>

          {subMenuOpen && (
            <div
              id={`submenu-${item.title}`}
              className="my-2 ml-12 flex flex-col space-y-4"
            >
              {item.subMenuItems?.map((subItem, idx) => {
                const isSubItemActive = subItem.path === pathname;
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className="group transition-all duration-300"
                  >
                    <div
                      className={`flex flex-row space-x-4 items-center px-3 py-2 rounded-none transition-all duration-300 group-hover:text-white ${
                        pathname.includes(item.path)
                          ? "font-bold text-[#00ffff]"
                          : "hover:text-white"
                      }`}
                      style={{
                        color: isSubItemActive ? "#00ffff" : "#33FFFF",
                        fontFamily: '"VT323", monospace',
                        fontWeight: "400",
                        letterSpacing: "0.05em",
                        lineHeight: "1.6",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        textAlign: "left",
                        fontSize: "1.5rem",
                      }}
                    >
                      {subItem.icon && (
                        <span
                          style={{
                            color: isSubItemActive ? "#00ffff" : "#33FFFF",
                          }}
                        >
                          {subItem.icon}
                        </span>
                      )}
                      <span>{subItem.title}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className="group flex flex-row space-x-4 items-center p-4 rounded-none transition-all duration-300"
        >
       <div
        className={`flex flex-row space-x-4 items-center px-3 py-2 rounded-none group ${
          isActive(item.path) ? "text-[#00ffff]" : "text-[#B19CD9] hover:text-white"
        }`}
      >
        {item.icon && (
          <span className={isActive(item.path) ? "text-[#00ffff]" : "group-hover:text-white"}>{item.icon}</span>
        )}
        <span
          style={{
            fontFamily: '"VT323", monospace',
            fontWeight: "400",
            letterSpacing: "0.05em",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            textAlign: "left",
            fontSize: "1.5rem",
          }}
        >
          {item.title}
        </span>
      </div>
        </Link>
      )}
    </div>
  );
};

export default MenuItem;
