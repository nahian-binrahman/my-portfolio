import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";

import { PersonSchema } from "@/components/seo/json-ld";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nahianbinrahman.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Nahian Bin Rahman | Full-stack & AI Engineer",
    template: "%s | Nahian Bin Rahman",
  },
  description: "Full-stack engineer building scalable web & AI-powered products using Next.js, Supabase, and LLMs.",
  keywords: ["Next.js", "React", "TypeScript", "Full-stack", "AI", "Engineer", "R3F", "LLM"],
  authors: [{ name: "Nahian Bin Rahman" }],
  creator: "Nahian Bin Rahman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Nahian Bin Rahman",
    title: "Nahian Bin Rahman | Full-stack & AI Engineer",
    description: "Full-stack engineer building scalable web & AI-powered products.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Nahian Bin Rahman" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nahian Bin Rahman | Full-stack & AI Engineer",
    description: "Full-stack engineer building scalable web & AI-powered products.",
    creator: "@nahian_dev",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <PersonSchema />
          <Navbar />
          <main className="flex-grow bg-mesh-gradient">
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
