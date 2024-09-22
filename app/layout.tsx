import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from '@vercel/analytics/react';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Deepak Bhalerao-Portfolio",
  description: "Deepak Bhalerao Portfolio - Maratha Vidya Prasarak Samaja's KBTCOE, Nashik, SPPU",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen ">
          {children}
          <Toaster />
          <Analytics />
        </main>
      </body>
    </html>
  );
}
