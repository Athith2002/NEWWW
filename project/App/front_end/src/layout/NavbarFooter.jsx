import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const NavbarFooter = () => {
  return (
    <section className="h-[100dvh]">
      <div className="fixed inset-x-0 top-0 z-[9999999999] m-2 overflow-hidden rounded-t-2xl">
        <Navbar />
      </div>
      <div className="flex h-full w-full overflow-hidden rounded-2xl bg-white">
        <div className="relative flex h-full w-[50%] grow flex-col overflow-y-auto overflow-x-hidden px-3 md:px-0">
          <div className="flex w-full flex-1 flex-col items-center justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavbarFooter;
