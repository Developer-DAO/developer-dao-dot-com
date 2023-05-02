import type { FC, PropsWithChildren } from "react";

import Menu from "./Menu";
// import Footer from "./Footer";
import { General, StrapiSingleData } from "../types";
// import ThemeToggle from "./ThemeToggle";

// const isDevelopment = process.env.NODE_ENV === "development";

type LayoutProps = {
  general: StrapiSingleData<General>;
};

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
  return (
    <>
      <div className="flex">
        <Menu />
        <div className="w-full px-6">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
