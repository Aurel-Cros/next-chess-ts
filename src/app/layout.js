import { Inter } from "next/font/google";
import "./globals.css";
import BoardProvider from "@/context/BoardState";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BoardProvider>
          {children}
        </BoardProvider>
      </body>
    </html>
  );
}
