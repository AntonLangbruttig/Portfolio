import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bio - Anton Langbruttig",
  description: "Learn more about Anton Langbruttig, a software developer passionate about elegant design and intuitive user experiences.",
  icons: {
    icon: { url: "/images/favicon.ico", type: "image/x-icon" },
  },
};

export default function BioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
