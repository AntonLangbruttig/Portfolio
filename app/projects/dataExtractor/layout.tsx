import { Metadata } from "next";

const siteUrl = "https://antonlangbruttig.com";
const pageUrl = `${siteUrl}/projects/dataExtractor`;
const previewImage = `${siteUrl}/images/portfoliolg.webp`;

export const metadata: Metadata = {
  title: "PDF Data Extractor - Automated Batch Processing | Anton Langbruttig",
  description: "Automated PDF batch processing tool built with Python, pdfplumber, pandas, and regex. Extracts structured data from PDFs, handles multi-line entries, outputs Excel spreadsheets. 99% time reduction vs manual data entry.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "PDF Data Extractor - Python Automation Tool",
    description: "Automated batch processing tool for extracting structured data from PDFs using Python, pdfplumber, pandas, and regex pattern matching. 99% faster than manual entry.",
    url: pageUrl,
    siteName: "Anton Langbruttig",
    images: [
      {
        url: previewImage,
        width: 3456,
        height: 1986,
        alt: "PDF Data Extractor automation tool preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Data Extractor - Python Automation Tool",
    description: "Automated PDF processing with Python, pdfplumber, pandas. Batch extracts structured data to Excel. 99% time reduction.",
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

export default function DataExtractorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
