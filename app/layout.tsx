import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css"; 
import Providers from "@/components/Providers";
import Link from "next/link";
import { RiHome2Line } from "@remixicon/react";
import AuthBadge from "@/components/AuthBadge";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next.js Niko-Niko",
  description: "Niko-Niko method made in Next.js",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      ><Providers>
        <header className="w-full my-6 flex justify-between">
          <Link href="/" className="p-3 text-base font-medium text-gray-500 rounded-full bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"><RiHome2Line /></Link>
          <AuthBadge />
        </header>
         {children}</Providers>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/evan-guyot"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to my Github →
        </a>
      </footer>
      </body>
    </html>
  );
}
