import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - More Info | Anton Langbruttig",
  description: "Learn more about Let's Face It, a custom makeup platform developed by Anton Langbruttig.",
  icons: {
    icon: { url: "/images/favicon.ico", type: "image/x-icon" },
  },
};

export default function LetsFaceItLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
