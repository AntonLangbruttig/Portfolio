"use client";

import React from "react";
import Link from "next/link";
import { PageAnimation } from "@/utils/animation";
import { Icon } from "@iconify/react";

const DataExtractorAbout = () => {
  const { fadeIn } = PageAnimation();

  const technologies = [
    "Python", "pdfplumber", "pandas", "OpenPyXL", "Regular Expressions"
  ];

  return (
    <section className="h-[calc(100vh-50px)] overflow-hidden">
      <div className="h-[96.5%] overflow-y-scroll no-scrollbar py-6 ">
        {/* Main Header */}
        <h2
          className={`md:block sm:hidden font-bold text-cyan-200 text-4xl lg:mb-5 md:mb-7 underline px-14 transition-opacity duration-1000 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          PDF Data Extractor
        </h2>

        {/* Description */}
        <div
          className={`px-[75px] transition-opacity duration-1000 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="mb-7">
            <h3 className="text-red-50 md:text-xl text-2xl font-bold mb-4">
              Description
            </h3>
            <div
              className={`pl-[25px] text-gray-300 text-lg transition-opacity duration-1000 ${
                fadeIn ? "opacity-100" : "opacity-0"
              }`}
            >
            The PDF Data Extractor is an automated batch processing tool that transforms unstructured PDF documents
            into clean, structured Excel spreadsheets. Utilizing advanced Python libraries like pdfplumber and pandas,
            the application intelligently extracts tabular data, text, and metadata from PDF files with 99% time
            reduction compared to manual processing. The system handles multiple PDF formats, normalizes data structures,
            and outputs formatted XLSX files ready for analysis and reporting.
              <span className="animate-blink">_</span>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="mb-4">
            <h3 className="text-red-50 md:text-xl text-2xl font-bold mb-4">
              Technologies Used
            </h3>
            <div className="pl-6 flex flex-wrap gap-4">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border rounded-none border-gray-400 text-gray-300 text-base font-medium transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="w-5 lg:-mt-7 md:-mt-9 block md:hidden">
          <Link href="/projects">
            <div className="cursor-pointer w-20 h-80 md:relative md:justify-end md:-bottom-2
             md:items-end md:-ml-[85px] sm:fixed sm:-bottom-[230px] sm:-ml-[85px] text-[#0ccbed] duration-300 hover:opacity-50">
              <Icon icon="lucide:chevron-left" width="80" height="80" />
            </div>
          </Link>
          </div>
        </div>
        <div className="sm:block hidden h-8 w-full"></div>

      </div>
    </section>
  );
};

export default DataExtractorAbout;
