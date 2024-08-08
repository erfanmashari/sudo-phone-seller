"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useEffect } from "react";

import { checkLoginStatus } from "@/functions";

import { ToastContainer } from "react-toastify";

import { BsFillPersonFill } from "react-icons/bs";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isLayoutAllowed: boolean =
    pathname === "/login" || pathname === "/register" ? false : true;

  useEffect(() => {
    // check login status
    const isLoggedIn: boolean = checkLoginStatus();
    if (isLayoutAllowed && !isLoggedIn) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLayoutAllowed ? (
        <main className="w-full flex flex-col">
          <header className="w-full flex flex-row justify-between items-center border-b border-gray-300 py-6 px-12">
            <h1 className="text-2xl font-bold text-gray-600">
              پنل فروشندگان سودوفون
            </h1>
            <button className="text-gray-600 border border-gray-600 rounded-full p-1">
              <BsFillPersonFill className="w-7 h-7 text-gray-600" />
            </button>
          </header>
          <nav className="w-full flex flex-row justify-between items-center border-b border-gray-300 py-3 px-12">
            <ul className="flex flex-row justify-center items-center gap-4">
              <Link href={"/"} className="cursor-pointer">
                افزودن محصول
              </Link>
              <Link href={"/products"} className="cursor-pointer">
                لیست محصولات
              </Link>
              <Link href={"/orders"} className="cursor-pointer">
                سفارشات
              </Link>
            </ul>
          </nav>
          {children}
        </main>
      ) : (
        <>{children}</>
      )}
      <ToastContainer rtl={true} />
    </>
  );
};

export default Layout;
