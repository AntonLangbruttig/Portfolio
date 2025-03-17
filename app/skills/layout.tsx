import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills - Anton Langbruttig",
  description: "Explore the skills and expertise of Anton Langbruttig in software development, design, and more.",
  icons: {
    icon: { url: "/images/favicon.ico", type: "image/x-icon" },
  },
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
