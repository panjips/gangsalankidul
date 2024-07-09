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

export const HomeNavbar = () => {
  const cookies = useCookies();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { page: "BERITA", path: "/berita" },
    { page: "PROFIL", path: "/profil" },
    { page: "GALERI", path: "/galeri" },
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
          <Link href="/" className="font-bold text-green-950">
            GANGSALAN KIDUL
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden md:flex">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.page}-${index}`}>
            <Link
              color="foreground"
              className="font-semibold text-green-800"
              href={item.path}
            >
              {item.page}
            </Link>
          </NavbarItem>
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
