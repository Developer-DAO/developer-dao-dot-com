import type { FC, PropsWithChildren } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";

import Menu from "./Menu";
import Footer from "./Footer";
import { General, StrapiSingleData } from "../types";
import { Moon, Sun } from "react-feather";

type LayoutProps = {
  general: StrapiSingleData<General>;
};

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, general }) => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        className="absolute top-0 right-0 mt-3 mr-3 mr-2 mb-2 rounded-full bg-black px-5 py-2.5 dark:bg-white"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? (
          <Moon size={24} color="white" />
        ) : (
          <Sun size={24} color="black" />
        )}
      </button>
      <div className="container mx-auto flex">
        <Menu />
        <div className="w-full">
          {children}
          <Footer data={general.data?.attributes.Footer!} />
        </div>
      </div>
    </>
  );
};

export default Layout;
