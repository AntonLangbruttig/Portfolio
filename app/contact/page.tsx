"use client";

import ViewWindow from "@/components/view-window";
import Image from "next/image";
import { useAboutPageAnimation } from "@/components/utils/aboutAnimation"; // Import animation

export default function ContactPage() {
  const { fadeIn } = useAboutPageAnimation(); // Use shared animation logic

  return (
    <div className={`overflow-y-scroll justify-center transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
      <div className="min-h-screen overflow-y-none text-white p-8 pt-5">
        <div className="h-full sm:h-screen space-y-1">
          <span className="font-bold text-cyan-200 text-4xl block mb-0">
            Contact
          </span>
          <div className="space-y-2 pb-4">
            <span className="text-red-50 md:text-xl sm:text-base block space-y-2 ml-4 sm:space-y-0">
              For all inquiries please contact me below.
            </span>
          </div>
          <form className="space-y-3">
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Your Name"
                className="w-[96%] p-2 bg-slate-300 text-black font-bold text-md rounded-none"
              />
            </div>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Your Email"
                className="w-[96%] p-2 bg-slate-300 text-black text-md font-bold rounded-none"
              />
            </div>
            <div className="flex justify-center">
              <textarea
                placeholder="Your Message"
                className="w-[96%] p-2 bg-slate-300 text-black text-md font-bold rounded-none resize-none lg:h-[16vh] md:h-[20vh] sm:h-[30vh]"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-[96%] bg-[#059fc9] text-white border-none rounded-none py-2 px-4 text-lg transition-transform transform hover:scale-[1.01] hover:shadow-[0_0_15px_rgba(0,255,255,0.7),_0_0_15px_rgba(0,208,255,0.7)]"
              >
                Send Message
              </button>
            </div>
          </form>
          <div className="flex items-baseline justify-left md:ml-5 lg:pt-9 ml-2 pt-5 space-x-2">
            <span className="text-lg">Connect with me on LinkedIn</span>
            <a
              href="https://www.linkedin.com/in/anton-langbruttig-75375688/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              <Image
                src="/images/linkedin.png"
                alt="LinkedIn"
                width={32}
                height={32}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
