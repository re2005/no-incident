import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Days without incidents",
    description: "Days without incidents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
        <div style={{padding: "20px"}}>
            <h1 className="text-3xl tracking-tighter text-center font-bold">Days without incidents</h1>
            {children}
        </div>
    </body>
    </html>
  );
}
