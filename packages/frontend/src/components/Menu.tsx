import Image from "next/image";
import Link from "next/link";
import {
  Twitter,
  Youtube,
  GitHub,
  X as CrossIcon,
  Menu as MenuIcon,
} from "react-feather";

import Rocket from "../../public/icons/rocket.svg";
import Book from "../../public/icons/book.svg";
import Tools from "../../public/icons/tools.svg";
import Sparkles from "../../public/icons/sparkles.svg";
import Diamond from "../../public/icons/diamond.svg";
import type { ReactNode } from "react";
import { useState } from "react";
import { useTheme } from "next-themes";

const menuItems = [
  {
    id: "rocket",
    name: "Rocket",
    link: "/rocket",
    logoIcon: Rocket,
  },
  {
    id: "books",
    name: "Books",
    link: "/books",
    logoIcon: Book,
  },
  {
    id: "tools",
    name: "Tools",
    link: "/tools",
    logoIcon: Tools,
  },
  {
    id: "sparkles",
    name: "Sparkles",
    link: "/sparkles",
    logoIcon: Sparkles,
  },
  {
    id: "diamond",
    name: "Diamond",
    link: "/diamond",
    logoIcon: Diamond,
  },
];

const footerItems = [
  {
    id: "twitter",
    name: "Twitter",
    url: "https://twitter.com/developerdao",
    logoComponent: Twitter,
  },
  {
    id: "youtube",
    name: "Youtube",
    url: "https://www.youtube.com/c/DeveloperDAO",
    logoComponent: Youtube,
  },
  {
    id: "github",
    name: "Github",
    url: "https://github.com/Developer-DAO",
    logoComponent: GitHub,
  },
];


const MenuItemContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-[20px] border border-white/30 bg-[#353535] group-hover:bg-white group-hover:rounded-lg group-hover:before:opacity-100 before:opacity-0 before:absolute before:bg-[#D7D7D7] before:rounded-full before:w-2 before:h-2 before:-left-1/2 before:transition-opacity transition-[border-radius_background-color] duration-100">
      {children}
    </div>
  )
}

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = (nextIsOpen: boolean) => {
    if (nextIsOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    setIsOpen(nextIsOpen);
  };
  const { theme } = useTheme();

  return (
    <>
      <Link href="/">
        <a className="absolute m-3 cursor-pointer rounded-lg p-2 lg:hidden">
          <Image
            src={`/D_D_logo-${theme === "dark" ? "dark" : "light"}.svg`}
            alt="D_D logo"
            width={40}
            height={40}
          />
        </a>
      </Link>

      <button
        className="absolute right-0 m-3 cursor-pointer rounded-lg p-2 lg:hidden"
        onClick={() => toggle(!isOpen)}
      >
        {isOpen ? <CrossIcon size={40} /> : <MenuIcon size={40} />}
      </button>

      {isOpen && (
        <div
          id="mobile-menu"
          className="bg-main fixed top-20 bottom-0 z-10 w-full lg:hidden"
        >
          <div className="font-xl flex flex-col gap-10 p-5 uppercase">
            {menuItems.map((menuItem) => (
              <Link key={menuItem.id} href={menuItem.link}>
                <a className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-[#353535]">
                    <menuItem.logoIcon
                      style={{ display: "flex", margin: "auto" }}
                      stroke="#c2c2c2"
                    />
                  </div>
                  <span className="ml-3 text-xl">{menuItem.name}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div id="desktop-menu" className="hidden w-28 justify-center lg:flex">
        <div className="invisible w-28" />
        <div className="fixed top-8 bottom-8 flex h-[calc(100vh-64px)] w-24 flex-col items-center rounded-full border border-white/30 bg-[#565656]/30 p-2 py-5">
          <div className="relative w-full">
            <img
              src="/D_D_logo-light.svg"
              alt="D_D Logo"
              className="rounded-full object-cover object-center h-20 w-20"
            />
          </div>
          <div className="flex h-full w-full flex-col items-center justify-between">
            <div className="flex w-full flex-col p-2">
              <div className="mb-4">
                <hr className="border-white/10" />
              </div>
              <div className="flex flex-col items-center gap-3">
                {menuItems.map((menuItem) => (
                  <Link key={menuItem.id} href={menuItem.link}>
                    <a className="relative group">
                      <MenuItemContainer>
                        <menuItem.logoIcon
                          className="flex mx-auto text-[#c2c2c2] group-hover:text-black"
                        />
                      </MenuItemContainer>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-4">
                <hr className="border-white/10" />
              </div>
              <div className="flex flex-col items-center gap-3">
                {footerItems.map((footerItem) => (
                  <a
                    key={footerItem.id}
                    href={footerItem.url}
                    target="_blank"
                    rel="noreferrer"
                    className="relative group"
                  >
                    <MenuItemContainer>
                      <footerItem.logoComponent size={16} className="text-[#c2c2c2] group-hover:text-black" />
                    </MenuItemContainer>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;