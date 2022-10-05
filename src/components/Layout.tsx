import Navbar from "@components/Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container pt-2 pb-5">
      <Navbar className="mb-2" />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
