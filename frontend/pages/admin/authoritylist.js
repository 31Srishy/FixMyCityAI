import React from "react";

// components

import CardAuthorityList from "components/Cards/CardAuthorityList.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function AuthorityList() {
    // Retrieve user data safely
    // console.log(localStorage.getItem("user"));
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const domainId = user?.domain_id || ""; // Get domain_id or default to empty string
  
    return (
      <div className="w-full mb-12 px-4 relative z-10">
        <div className="w-full mb-12 px-4">
          <CardAuthorityList domainId={domainId} />
        </div>
      </div>
    );
  }
  
  

AuthorityList.layout = Admin;