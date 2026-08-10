import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "Norsk fra nul · Elke dag een beetje Noors",
    description: "Eén piepkleine Noorse zin per dag, voor absolute beginners.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Norsk fra nul",
      description: "Eén piepkleine Noorse zin per dag, voor absolute beginners.",
      images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Norsk fra nul" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Norsk fra nul",
      description: "Eén piepkleine Noorse zin per dag.",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
