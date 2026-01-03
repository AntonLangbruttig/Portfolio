import { Metadata } from "next";

const siteUrl = "https://antonlangbruttig.com";
const pageUrl = `${siteUrl}/projects/luxAbout`;
const previewImage = `${siteUrl}/images/portfoliolg.webp`;

export const metadata: Metadata = {
  title: "Let's Face It Website - Luxury Makeup Studio | Anton Langbruttig",
  description: "Full-stack luxury makeup studio website with serverless AWS backend. Built with React, TypeScript, Tailwind CSS, AWS Lambda, API Gateway, SES, and Amplify. Features custom booking forms, portfolio gallery, SEO optimization, and CI/CD deployment.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Let's Face It Website - Serverless Makeup Booking Platform",
    description: "Full-stack luxury makeup studio website with AWS Lambda serverless backend, custom booking system, portfolio gallery, and SEO optimization. Built with React, TypeScript, and Tailwind CSS.",
    url: pageUrl,
    siteName: "Anton Langbruttig",
    images: [
      {
        url: previewImage,
        width: 3456,
        height: 1986,
        alt: "Let's Face It luxury makeup studio website preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Let's Face It Website - Serverless Makeup Booking Platform",
    description: "Full-stack luxury makeup studio with AWS Lambda backend, React, TypeScript, and custom booking system.",
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
