import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Gothic_A1 } from "next/font/google";

import Provider from "@/components/provider/Provider";
import Header from "@/components/header/Header";

const gothic = Gothic_A1({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "개발자들의 소통공간, 개발로그",
  description: "dogFoot",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/hack-font/3.3.0/web/hack.css"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${gothic.className} flex flex-col items-center`}>
        <Provider>
          <div className="h-[94px]" />
          <Header />
          {children}
          <div id="portal" />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
