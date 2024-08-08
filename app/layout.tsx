import Layout from "@/context/Layout";

import { Vazirmatn } from "next/font/google";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "پنل فروشندگان فروشگاه سودوفون",
  description: "پنل فروشندگان فروشگاه سودوفون",
};

const vazirmatn = Vazirmatn({ subsets: ["arabic"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="rtl" lang="en">
      <body className={`${vazirmatn.className} bg-white`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
