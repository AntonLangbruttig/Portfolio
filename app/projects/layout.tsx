import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Anton Langbruttig",
  description: "Discover projects by Anton Langbruttig, showcasing creativity, technical expertise, and innovative solutions.",
  alternates: {
    canonical: "https://antonlangbruttig.com/projects",
  },
  icons: {
    icon: { url: "/images/favicon.ico", type: "image/x-icon" },
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
