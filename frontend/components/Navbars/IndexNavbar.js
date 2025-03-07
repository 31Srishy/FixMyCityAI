import React, { useState, useEffect } from "react";
import Link from "next/link";
import IndexDropdown from "components/Dropdowns/IndexDropdown.js";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = async () => {
    console.log("Logging out...");

    const refreshToken = localStorage.getItem("refresh");

    if (!refreshToken) {
      console.warn("No refresh token found. Redirecting to login...");
      localStorage.removeItem("access");
      setIsAuthenticated(false);
      window.location.href = "/auth/login"; // Redirect user to login
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/registration/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setIsAuthenticated(false);
        window.dispatchEvent(new Event("storage"));
        window.location.href = "/auth/login"; // Redirect after logout
      } else {
        console.error("Logout failed. Server response:", await response.json());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/" legacyBehavior>
              <a className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap">
                FixMyCityAI
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              {/* Removed Home and Dashboard links */}
              <li className="flex items-center">
                <IndexDropdown />
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {!isAuthenticated ? (
                <li>
                  <Link href="/auth/register" legacyBehavior>
                    <a className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                      Register here
                    </a>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href="/profile" legacyBehavior>
                    <a className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                      Profile
                    </a>
                  </Link>
                </li>
              )}

              <li className="flex items-center">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  >
                    Logout
                  </button>
                ) : (
                  <Link href="/auth/login" legacyBehavior>
                    <a className="bg-blueGray-700 text-white text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150">
                      Login
                    </a>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}