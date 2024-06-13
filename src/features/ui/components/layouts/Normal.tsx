import { type ReactNode } from "react";
import Navbar from "../Navbar";
import ProtectedResource from "~/features/auth/guards/ProtectedResource";

export interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar>
                <Navbar.Navbrand></Navbar.Navbrand>
                {/*  
        <ProtectedResource roles={["ADMIN", "MANAGER"]}>
          <Navbar.NavItem to="/admin">Admin</Navbar.NavItem>
        </ProtectedResource>
        */}
                <Navbar.NavItem to="/manageuser">Manage User</Navbar.NavItem>
                <Navbar.NavItem
                    to="/
        Report"
                >
                    Report
                </Navbar.NavItem>
                <Navbar.NavItem to="/articles">Blog</Navbar.NavItem>
            </Navbar>
            <main className="p-4">{children}</main>
        </>
    );
};

export default Layout;