import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TA App - More Info | Anton Langbruttig",
  description: "Learn more about the TA App, a teaching assistant management system developed by Anton Langbruttig.",
  icons: {
    icon: { url: "/images/favicon.ico", type: "image/x-icon" },
  },
};

export default function TaAppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
