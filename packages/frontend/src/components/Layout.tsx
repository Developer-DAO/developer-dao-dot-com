import type { FC, PropsWithChildren } from "react";

import Menu from "./Menu";
import Footer from "./Footer";
import { General, StrapiSingleData } from "../types";
import ThemeToggle from "./ThemeToggle";

const isDevelopment = process.env.NODE_ENV === "development";

type LayoutProps = {
  general: StrapiSingleData<General>;
};

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, general }) => {
  return (
    <>
      <div className="container mx-auto flex">
        <Menu />
        <div className="w-full">
          {children}
          <Footer data={general.data.attributes.Footer} />
        </div>
      </div>
    </>
  );
};

export default Layout;
