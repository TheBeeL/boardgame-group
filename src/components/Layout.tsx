import Navbar from "@components/Navbar";
import { Container } from "@mui/joy";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container className="pt-2">
      <Navbar className="mb-2" />
      <main>{children}</main>
    </Container>
  );
};

export default Layout;
