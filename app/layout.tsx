import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/provider";
import { GlobalContext } from "@/context";

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
          <GlobalContext>{children}</GlobalContext>
        </Provider>
      </body>
    </html>
  );
}
