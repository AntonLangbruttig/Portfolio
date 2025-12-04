"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PageAnimation } from "@/utils/animation";

export default function ContactPage() {
  const { fadeIn } = PageAnimation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [isOverlapping, setIsOverlapping] = useState(false);
  const [isShortScreen, setIsShortScreen] = useState(false);
  const [isVeryShortScreen, setIsVeryShortScreen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverlap = () => {
      if (!contentRef.current || !logoRef.current) return;

      const textRect = contentRef.current.getBoundingClientRect();
      const logoRect = logoRef.current.getBoundingClientRect();

      const overlap = !(
        textRect.right < logoRect.left ||
        textRect.left > logoRect.right ||
        textRect.bottom < logoRect.top ||
        textRect.top > logoRect.bottom
      );

      setIsOverlapping(overlap);
    };

    const checkHeight = () => {
      setIsShortScreen(window.innerHeight < 677);
      setIsVeryShortScreen(window.innerHeight < 700);
    };

    const handleResizeAndScroll = () => {
      checkOverlap();
      checkHeight();
    };

    checkOverlap();
    checkHeight();

    window.addEventListener("resize", handleResizeAndScroll);
    scrollContainerRef.current?.addEventListener("scroll", checkOverlap);

    return () => {
      window.removeEventListener("resize", handleResizeAndScroll);
      scrollContainerRef.current?.removeEventListener("scroll", checkOverlap);
    };
  }, [fadeIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill out all fields.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("Please enter a valid email.");
      setLoading(false);
      return;
    }

    console.log("Submitting:", formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        console.log("Success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
        console.error("Server error:", await res.text());
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus("An error occurred.");
    }

    setLoading(false);
  };

  return (
    <div
      ref={scrollContainerRef}
      className={`h-[89.3vh] md:h-screen ${isShortScreen ? "overflow-y-auto" : "overflow-y-hidden"} md:overflow-y-hidden transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`text-white p-8 pt-5 ${isShortScreen ? "min-h-[100vh]" : ""} md:min-h-0 ${isShortScreen ? "pb-16" : "pb-8"} md:pb-8`}
      >
        <div className="space-y-1">
          <span className="font-bold text-cyan-200 text-4xl  mb-2  underline">Contact</span>
          <div ref={contentRef} className="space-y-2 pb-4 flex flex-col justify-start">
            {!status.includes("success") && (
              <>
                <span className="text-red-50 md:text-xl block space-y-2 ml-4 pt-4 md:pt-2 sm:space-y-0 sm:text-xl sm:ml-3 sm:mb-4">
                  For all inquiries please contact me below.
                </span>
                <form className="space-y-3" onSubmit={handleSubmit}>
                  <div className="flex justify-center">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-[96%] p-2 bg-slate-300 text-black font-bold text-md rounded-none"
                      disabled={loading}
                      autoComplete="given-name" 
                    />
                  </div>
                  <div className="flex justify-center">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-[96%] p-2 bg-slate-300 text-black text-md font-bold rounded-none"
                      disabled={loading}
                      autoComplete="email" 
                    />
                  </div>
                  <div className="flex justify-center">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-[96%] p-2 bg-slate-300 text-black text-md font-bold rounded-none resize-none  h-[33vh] md:h-[140px]"
                      disabled={loading}
                      autoComplete="off" 
                    ></textarea>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="w-[96%] bg-[#059ec9] text-white border-none rounded-none py-2 px-4 text-lg transition-transform 
                      transform hover:bg-cyan-700 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              </>
            )}
            <div
              className={`flex flex-col justify-center items-center ${
                status && status.includes("success") ? "min-h-[41vh]" : "h-12 md:h-8"
              }`}
            >
              {status && (
                <p
                  className={`text-center text-4xl ${
                    status.includes("success") ? "text-green-300" : "lg:text-xl text-xl text-red-500"
                  }`}
                >
                  {status}
                </p>
              )}
            </div>
          </div>

          {/* Desktop version - static in flow */}
          <div className="hidden md:flex items-baseline pt-4 ml-4 space-x-2 bg-transparent ">
            <span className="text-2xl">Connect with me on LinkedIn</span>
            <a
              href="https://www.linkedin.com/in/anton-langbruttig/"
              target="_blank"
              rel="noopener noreferrer" 
              className="text-blue-400 hover:scale-[1.3]"
            >
              <Image 
                src="/images/linkedin.png" 
                alt="LinkedIn" 
                width={32} 
                height={32}  
                style={{ width: "100%", height: "auto", maxWidth: "32px", maxHeight: "32px" }} 
              />
            </a>
          </div>

{/* Mobile version - hides "LinkedIn" text below 382px when scrolling, below 346px when fixed */}
<div
  className={`md:hidden flex items-baseline space-x-2 bg-transparent ${
    isShortScreen ? "pt-5" : "fixed bottom-0 left-4 right-4 pb-4"
  }`}
>
  <span className="text-xl ">
    Connect with me on
    {/* Hide "LinkedIn" at different breakpoints depending on scroll mode */}
    <span className={isShortScreen ? "hidden min-[383px]:inline" : "hidden min-[347px]:inline"}>
      {" "}LinkedIn
    </span>
  </span>

  <a
    href="https://www.linkedin.com/in/anton-langbruttig/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 hover:scale-[1.3] transition-transform flex-shrink-0"
  >
    <Image 
      src="/images/linkedin.png" 
      alt="LinkedIn" 
      width={32} 
      height={32}
      className="w-8 h-8"
    />
  </a>
</div>
        </div>
      </div>

      {/* AL Logo Watermark - Same as Skills page */}
      <div
        ref={logoRef}
        className={`fixed bottom-4 right-4 hidden min-[500px]:block md:hidden transition-opacity duration-300 ${
          fadeIn && !isOverlapping ? "opacity-70" : "opacity-0"
        } pointer-events-none`}
      >
        <img
          src="/images/AL.png"
          alt="AL Logo"
          className="w-28 h-auto min-[870px]:w-36"
        />
      </div>
    </div>
  );
}