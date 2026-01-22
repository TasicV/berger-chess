import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Berger Tournament",
    description: "Round Robin/Berger tournament pairing system",
};

export default function RootLayout({ children, params }: {
    children: React.ReactNode;
    params: { lang?: string };
}) {
    return (
        <html lang={params?.lang || 'sr'}>
        <body className={inter.className}>
        {children}
        </body>
        </html>
    );
}