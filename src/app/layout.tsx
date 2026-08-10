import type { Metadata } from "next";

import StoreProvider from "./StoreProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Planetary Hours Clock",
  description: "Displays the current planetary hour and shows all planetary hours for the day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html
        lang="en"
        className="h-full antialiased"
      >
        <body className="min-h-full flex flex-col bg-moonlight">
            {children}
        </body>
      </html>
    </StoreProvider>
  );
}
