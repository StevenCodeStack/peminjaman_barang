import React from "react";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const Navbar = () => {
  return (
    <header className="z-1 h-18 flex justify-between items-center gap-20 lg:gap-25 py-4 w-full fixed top-0 left-0 px-5 md:px-10 xl:px-25 bg-black text-white">
      <h1 className="font-rubik text-4xl">
        SHARE<span className="text-primary">IT</span>
      </h1>
      <MobileMenu />
      <DesktopMenu />
    </header>
  );
};

export default Navbar;
