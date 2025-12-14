import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Data Extractor - More Info | Anton Langbruttig",
  description: "Learn more about PDF Data Extractor, an automated batch processing tool developed by Anton Langbruttig.",
  icons: {
    icon: { url: "/images/favicon.ico", type: "image/x-icon" },
  },
};

export default function DataExtractorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
