import React from "react";

// Components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import CardSettings from "components/Cards/CardSettings.js"; // Or EditProfile.js

export default function EditProfile() {
  return (
    <>
      {/* Navbar */}
      <IndexNavbar transparent />

      {/* Main Content */}
      <main className="profile-page">
        {/* Hero Section */}
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>

        {/* Centered CardSettings Component */}
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                {/* CardSettings Component */}
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-8/12 px-4">
                    <CardSettings />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (if needed) */}
      {/* <Footer /> */}
    </>
  );
}