import Image from "next/image";
import Link from "next/link";
import { Twitter, Youtube, GitHub } from "react-feather";

import Rocket from "../../public/icons/rocket.svg";
import Book from "../../public/icons/book.svg";
import Tools from "../../public/icons/tools.svg";
import Sparkles from "../../public/icons/sparkles.svg";
import Diamond from "../../public/icons/diamond.svg";

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
    name: "Toosl",
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

const Menu = () => {
  return (
    <>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        className="absolute m-3 rounded-lg p-2 lg:hidden"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div className="hidden w-28 justify-center lg:flex">
        <div className="invisible w-28" />
        <div className="fixed top-8 bottom-8 flex h-[calc(100vh-64px)] w-24 flex-col items-center rounded-full border bg-[#565656]/30 p-2 ">
          <div className="relative h-24 w-full">
            <Image
              src="/D_D_logo-light.svg"
              alt="D_D Logo"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div className="flex h-full w-full flex-col items-center justify-between">
            <div className="flex w-full flex-col p-2">
              <div className="mb-4">
                <hr />
              </div>
              <div className="flex flex-col items-center gap-3">
                {menuItems.map((menuItem) => (
                  <Link key={menuItem.id} href={menuItem.link}>
                    <a>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-[#353535]">
                        <menuItem.logoIcon
                          style={{ display: "flex", margin: "auto" }}
                          stroke="#c2c2c2"
                        />
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-4">
                <hr />
              </div>
              <div className="flex flex-col items-center gap-3">
                {footerItems.map((footerItem) => (
                  <a
                    key={footerItem.id}
                    href={footerItem.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-[#353535]">
                      <footerItem.logoComponent size={16} color="#c2c2c2" />
                    </div>
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
