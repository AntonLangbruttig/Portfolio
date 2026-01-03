import { Metadata } from "next";

const siteUrl = "https://antonlangbruttig.com";
const pageUrl = `${siteUrl}/projects/portfolioAbout`;
const previewImage = `${siteUrl}/images/portfoliolg.webp`;

export const metadata: Metadata = {
  title: "Portfolio Website - Interactive Design & Animations | Anton Langbruttig",
  description: "Personal portfolio with synchronized boot animations, vintage CRT effects, and serverless backend built with Next.js, TypeScript, and AWS. Features custom animations, responsive design, and modern web technologies.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Portfolio Website - Interactive Design & Animations",
    description: "Personal portfolio with synchronized boot animations, vintage CRT effects, and serverless backend built with Next.js, TypeScript, and AWS.",
    url: pageUrl,
    siteName: "Anton Langbruttig",
    images: [
      {
        url: previewImage,
        width: 3456,
        height: 1986,
        alt: "Portfolio website with custom animations preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Website - Interactive Design & Animations",
    description: "Portfolio with synchronized boot animations, CRT effects, serverless backend. Next.js, TypeScript, AWS.",
    images: [previewImage],
  },
  icons: {
    icon: [
      { url: "/images/favicon.ico?v=2", type: "image/x-icon" },
      { url: "/images/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/images/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
  },
};

export default function LetsFaceItLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
