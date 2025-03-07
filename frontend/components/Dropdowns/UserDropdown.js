import React, { useCallback, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const UserDropdown = () => {
  const router = useRouter();
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access"));
  const btnDropdownRef = useRef(null);
  const popoverDropdownRef = useRef(null);

  const toggleDropdownPopover = useCallback(() => {
    setDropdownPopoverShow((prev) => !prev);
  }, []);

  const handleLogout = async () => {
    console.log("Logging out...");

    const refreshToken = localStorage.getItem("refresh");

    if (!refreshToken) {
      console.warn("No refresh token found. Redirecting to login...");
      localStorage.removeItem("access");
      setIsAuthenticated(false); // ✅ No more ReferenceError
      window.location.href = "/auth/login";
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/registration/logout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setIsAuthenticated(false); // ✅ No more ReferenceError
        window.dispatchEvent(new Event("storage"));
        window.location.href = "/auth/login";
      } else {
        console.error("Logout failed. Server response:", await response.json());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback((event) => {
    if (
      popoverDropdownRef.current &&
      !popoverDropdownRef.current.contains(event.target) &&
      btnDropdownRef.current &&
      !btnDropdownRef.current.contains(event.target)
    ) {
      setDropdownPopoverShow(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative">
      <button ref={btnDropdownRef} onClick={toggleDropdownPopover} className="text-blueGray-500 focus:outline-none">
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img alt="User Avatar" className="w-full rounded-full align-middle border-none shadow-lg" src="/img/team-1-800x800.jpg" loading="lazy" />
          </span>
        </div>
      </button>

      {dropdownPopoverShow && (
        <div ref={popoverDropdownRef} className="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 absolute right-0 mt-2">
          <Link href="/profile" legacyBehavior>
            <a className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100">
              View Profile
            </a>
          </Link>
          <Link href="/editProfile" legacyBehavior>
            <a className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100">
              Settings
            </a>
          </Link>
          <button onClick={handleLogout} className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100 text-left">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
