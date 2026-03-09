import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/component/ParticleBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata = {
  title: "WEB - PLABON",
  description: "WEB - PLABON",
  icons: {
    icon: "/dragon-icon.svg",
    shortcut: "/dragon-icon.svg",
    apple: "/dragon-icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased relative overflow-x-hidden`}
      >
        <ParticleBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
