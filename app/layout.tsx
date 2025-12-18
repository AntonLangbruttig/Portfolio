import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Background from "@/components/background";
import SideNav from "@/components/side-nav";
import ViewWindow from "@/components/view-window";
import HeaderMobile from "@/components/header-mobile";
import Navbar from '@/components/top-nav';
import { MobileMenuProvider } from "@/contexts/MobileMenuContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });
const defaultSiteUrl = "https://antonlangbruttig.com";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;
const previewImage = `${siteUrl.replace(/\/$/, "")}/images/portfoliolg.webp`;
const facebookAppId = process.env.NEXT_PUBLIC_FB_APP_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Anton Langbruttig",
  description:
    "Anton Langbruttig's personal website.",
  icons: {
    icon: [
      { url: "/images/favicon.ico", type: "image/x-icon" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  themeColor: "#000000",
  openGraph: {
    title: "Anton Langbruttig | Portfolio",
    description:
      "Portfolio showcasing Anton Langbruttig's software engineering projects, skills, and contact information.",
    url: siteUrl,
    siteName: "Anton Langbruttig",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Preview of Anton Langbruttig's portfolio website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anton Langbruttig | Portfolio",
    description:
      "Portfolio showcasing Anton Langbruttig's software engineering projects, skills, and contact information.",
    images: [previewImage],
  },
  ...(facebookAppId && {
    other: {
      "fb:app_id": facebookAppId,
    },
  }),
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Anton Langbruttig",
    "jobTitle": "Software Engineer",
    "url": siteUrl,
    "image": previewImage,
    "sameAs": [
      "https://github.com/antonlangbruttig",
      "https://www.linkedin.com/in/anton-langbruttig"
    ],
    "knowsAbout": [
      "Software Engineering",
      "Web Development",
      "Full Stack Development",
      "React",
      "TypeScript",
      "Next.js"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <MobileMenuProvider>
            <Background>
              <Navbar/>
              <div className="flex justify-center items-center min-h-screen">
                <main className="flex flex-col items-center  w-full max-w-[1200px] transition-all duration-300 ease-in-out xl:mr-44 lg:mr-34 mr-[88px]">
                  <div className="flex w-full justify-center">
                    <div className="lg:w-72 md:w-20 sm:w-20 flex-shrink-0">
                      <SideNav />
                    </div>
                      <div className="lg:w-[975px] lg:flex-shrink-0 md:w-[975px] md:flex-shrink-0 sm:w-full">
                      <ViewWindow>
                        <main>{children}</main>
                      </ViewWindow>
                    </div>
                  </div>
                  <HeaderMobile/>
                </main>
              </div>
            </Background>
          </MobileMenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

