import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/nav-bar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RP Hypertrophy Hub",
  description:
    "Visualize Renaissance Periodization hypertrophy training volume recommendations by muscle group.",
  icons: {
    icon: [
      { url: "/RP-Hypertrophy-Hub-Visualizer/favicon.svg", type: "image/svg+xml" },
      { url: "/RP-Hypertrophy-Hub-Visualizer/favicon.ico", sizes: "32x32" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if(location.hash.startsWith('#/')){location.replace(location.pathname+location.hash.slice(2)+'/');}`,
          }}
        />
      </head>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
