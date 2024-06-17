import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

export const NavbarDashboard = () => {
  const cookies = useCookies();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { page: "Berita", path: "/dashboard/berita" },
    { page: "Agenda", path: "/dashboard/agenda" },
    { page: "Profil", path: "/dashboard/profil" },
    { page: "Log out", path: "/login" },
  ];

  const handleLogout = () => {
    cookies.remove("token");
    router.push("/login");
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">GANGSALAN KIDUL</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden md:flex">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.page}-${index}`}>
            {item.page === "Log out" ? (
              <Link
                color="danger"
                href="#"
                onClick={handleLogout}
                className="w-full"
              >
                {item.page}
              </Link>
            ) : (
              <Link
                color="foreground"
                className="w-full"
                href={item.path}
                size="lg"
              >
                {item.page}
              </Link>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.page}-${index}`}>
            {item.page === "Log out" ? (
              <Link
                color="danger"
                href="#"
                onClick={handleLogout}
                className="w-full"
              >
                {item.page}
              </Link>
            ) : (
              <Link
                color="foreground"
                className="w-full"
                href={item.path}
                size="lg"
              >
                {item.page}
              </Link>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
