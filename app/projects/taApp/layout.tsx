import { Metadata } from "next";

const siteUrl = "https://antonlangbruttig.com";
const pageUrl = `${siteUrl}/projects/taApp`;
const previewImage = `${siteUrl}/images/portfoliolg.webp`;

export const metadata: Metadata = {
  title: "TA App - Django Management System | Anton Langbruttig",
  description: "Full-stack teaching assistant management system built with Python Django and SQLite. Features role-based access control, CRUD operations, TA assignment system, course scheduling, and comprehensive testing. Team project for UW-Milwaukee Software Engineering course.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "TA App - Django Teaching Assistant Management System",
    description: "Full-stack Django web app for managing teaching assistants. Role-based access, CRUD operations, course scheduling, TA assignments. Built with Python, Django, and SQLite.",
    url: pageUrl,
    siteName: "Anton Langbruttig",
    images: [
      {
        url: previewImage,
        width: 3456,
        height: 1986,
        alt: "TA App teaching assistant management system preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TA App - Django Management System",
    description: "Full-stack Django app for TA management. Role-based access, CRUD ops, scheduling. Python + SQLite.",
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

export default function TaAppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
