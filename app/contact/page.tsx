"use client";

import ViewWindow from "@/components/view-window";
import Image from "next/image";
import { useState, useEffect } from "react";
import { animationSequence } from "@/components/animation";

export default function ContactPage() {
  const [infoText, setInfoText] = useState("");
  const [imageLines, setImageLines] = useState(0);
  const [animationState, setAnimationState] = useState("initial");
  const [showBackground, setShowBackground] = useState(false);
  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    animationSequence(
      setShowLine,
      setAnimationState,
      setShowBackground,
      setInfoText,
      setImageLines,
      500, // initialDelay
      2000, // lineAnimationDuration
      1000, // staticDuration
      500, // flickerDuration
      200 // contentDelay
    );
  }, []);

  return (
<div className="min-h-screen overflow-y-auto text-white p-8">

        <div className=" h-full sm:h-screen space-y-8">
          <span className="font-bold text-emerald-50 text-4xl block mb-6">Contact</span>
          
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-2 bg-gray-800 text-white rounded" />
            <input type="email" placeholder="Your Email" className="w-full p-2 bg-gray-800 text-white rounded" />
            <textarea placeholder="Your Message" className="w-full p-2 bg-gray-800 text-white rounded" rows={4}></textarea>
            <button type="submit" className="w-full bg-emerald-500 text-white p-2 rounded hover:bg-emerald-600 transition-colors">Send Message</button>
          </form>

          <div className="flex items-center justify-center space-x-4">
            <span className="text-lg">Connect with me on LinkedIn:</span>
            <a
              href="https://www.linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Image src="/images/AL.png" alt="LinkedIn" width={32} height={32} />
            </a>
          </div>
        </div>
    </div>
  );
}

