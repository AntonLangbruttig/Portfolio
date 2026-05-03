import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Anton Langbruttig",
  description: "Get in touch with Anton Langbruttig for inquiries, collaborations, and projects.",
  alternates: {
    canonical: "https://antonlangbruttig.com/contact",
  },
  icons: {
    icon: { url: "/images/favicon.ico", type: "image/x-icon" },
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
