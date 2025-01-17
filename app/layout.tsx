import type { Metadata } from "next";
import { Provider } from "@/provider";
import { GlobalContext } from "@/context";
import "./globals.css";
import { Toaster } from "./../components/ui/toaster";

export const metadata: Metadata = {
  title: "Netflix Clone",
  description: "Netflix Clone built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalContext>
            {children}
            <Toaster />
          </GlobalContext>
        </Provider>
      </body>
    </html>
  );
}
