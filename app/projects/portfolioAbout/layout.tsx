import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Website - More Info | Anton Langbruttig",
  description: "Personal portfolio with synchronized boot animations, vintage CRT effects, and serverless backend built with Next.js, TypeScript, and AWS.",
  alternates: {
    canonical: 'https://antonlangbruttig.com/projects/portfolioAbout',
  },
  openGraph: {
    title: "Portfolio Website - More Info | Anton Langbruttig",
    description: "Personal portfolio with synchronized boot animations, vintage CRT effects, and serverless backend built with Next.js, TypeScript, and AWS.",
    url: 'https://antonlangbruttig.com/projects/portfolioAbout',
  },
  icons: {
    icon: { url: "/images/favicon.ico", type: "image/x-icon" },
  },
};

export default function LetsFaceItLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
