"use client";

import { useState } from "react";
import Image from "next/image";
import { useAboutPageAnimation } from "@/components/animation"; // Import animation

export default function ContactPage() {
  const { fadeIn } = useAboutPageAnimation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

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
    <div className={`overflow-y-scroll justify-center transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
      <div className="min-h-screen overflow-y-none text-white p-8 pt-5">
        <div className="h-full sm:h-screen space-y-1">
          <span className="font-bold text-cyan-200 text-4xl block mb-0 md:block sm:hidden">Contact</span>

          {/* Fixed-height container for inquiry text, form, and status */}
          <div className="space-y-2 pb-4 md:min-h-[43vh] flex flex-col justify-start">
            {!status.includes("success") && (
              <>
                <span className="text-red-50 md:text-xl block space-y-2 ml-4 sm:space-y-0 sm:text-xl sm:ml-3 sm:mb-2">
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
                    />
                  </div>
                  <div className="flex justify-center">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-[96%] p-2 bg-slate-300 text-black text-md font-bold rounded-none resize-none lg:h-[15vh] md:h-[20vh] sm:h-[30vh]"
                      disabled={loading}
                    ></textarea>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="w-[96%] bg-[#059ec9] text-white border-none rounded-none py-2 px-4 text-lg transition-transform transform hover:bg-cyan-700"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Display status message, centered vertically when success */}
            {status && (
              <div
                className={`flex flex-col justify-center items-center flex-grow ${
                  status.includes("success") ? "min-h-[41vh]" : ""
                }`}
              >
                <p
                  className={`text-center text-4xl ${
                    status.includes("success") ? "text-green-300" : "text-red-500"
                  }`}
                >
                  {status}
                </p>
              </div>
            )}
          </div>

          {/* LinkedIn section with fixed positioning on small screens */}
          <div className="md:mt-0 fixed bottom-4 left-0 right-0 md:static flex items-baseline justify-left md:ml-1 sm:ml-8 space-x-2 p-4 md:p-0 bg-transparent">
            <span className="text-lg lg:text-2xl">Connect with me on LinkedIn</span>
            <a
              href="https://www.linkedin.com/in/anton-langbruttig-75375688/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:scale-[1.3]"
            >
              <Image src="/images/linkedin.png" alt="LinkedIn" width={32} height={32} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}