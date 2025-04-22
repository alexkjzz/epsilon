import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

import Sidebar from "@/app/private/components/ui/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Epsilon",
  description: "Educative App",
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen bg-stone-600">
        <Sidebar />
        <main className="ml-48 flex flex-col min-h-screen">{children}</main>
      </body>
    </html>
  );
}
