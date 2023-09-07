"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// @ts-ignore
import { ConnectKitButton } from "connectkit";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 w-full bg-black h-20 flex text-gray-500 text-sm justify-between">
      <div className="w-32 h-16 mx-6">{/* Placeholder */}</div>
      <div className="flex m-auto gap-10 text-lg hover:cursor-pointer">
        <div
          className={pathname === "/" ? "text-pinkTheme" : "hover:text-white"}
        >
          <Link href="/">HOME</Link>
        </div>
        <div
          className={
            pathname === "/create" ? "text-pinkTheme" : "hover:text-white"
          }
        >
          <Link href="/create">CREATE</Link>
        </div>
        <div
          className={
            pathname === "/find" ? "text-pinkTheme" : "hover:text-white"
          }
        >
          <Link href="/find">FIND</Link>
        </div>
        <div
          className={
            pathname === "/about" ? "text-pinkTheme" : "hover:text-white"
          }
        >
          <Link href="/about">ABOUT</Link>
        </div>
      </div>
      <div className="my-auto mx-6">
        <ConnectKitButton />
      </div>
    </nav>
  );
};
