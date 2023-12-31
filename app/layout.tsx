import { Metrophobic } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";

const inter = Metrophobic({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-xl min-h-screen p-2 mx-auto bg-white lg:p-4">
          <Toaster />
          {children}
        </main>
      </body>
    </html>
  );
}
