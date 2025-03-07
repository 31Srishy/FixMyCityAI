/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Fix My City With Azure AI
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Implemented by Bug Slayers{" "}
              </p>
            </div>
          </div>
        </div>
        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
          src="/img/pattern_nextjs.png"
          alt="..."
        />
      </section>

      {/* What We Do Section */}
      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div className="container mx-auto flex flex-wrap items-center">
          {/* Left side: Title */}
          <div className="w-full md:w-4/12 lg:w-4/12 xl:w-4/12 px-4 text-left">
            <h2 className="font-semibold text-4xl text-blueGray-600">What We Do</h2>
          </div>

          {/* Right side: Description */}
          <div className="w-full md:w-8/12 lg:w-8/12 xl:w-8/12 px-4">
            <p className="mt-4 text-lg leading-relaxed text-blueGray-500 animate-fade-in">
              FixMyCityAI is a cutting-edge platform designed to facilitate seamless communication between citizens and municipal authorities by streamlining the reporting and resolution of urban infrastructure issues. Our website enables residents to formally submit detailed complaints regarding civic concerns, such as malfunctioning public utilities, road surface deterioration, or waste management inefficiencies, accompanied by photographic evidence and precise descriptions. These submissions are promptly accessible to relevant authorities, allowing for efficient identification, prioritization, and resolution of urban challenges. By harnessing advanced technology, FixMyCityAI promotes transparency, accountability, and collaborative governance, contributing to the development of smarter, more sustainable, and well-maintained urban environments. Together, we aim to enhance civic engagement and urban livability.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}