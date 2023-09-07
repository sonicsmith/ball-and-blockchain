import { Navbar } from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Web3Container } from "@/components/WebContainer";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ball and Blockchain",
  description:
    "Create a permanent, immutable record of your love, on the blockchain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " bg-main h-screen bg-cover bg-blend-multiply bg-gray-500"
        }
      >
        <Web3Container>
          <Navbar />
          {children}
        </Web3Container>
      </body>
    </html>
  );
}
