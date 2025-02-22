import React from "react";

// components

import CardDomain from "components/Cards/CardDomain.js";


// layout for page

import Form from "layouts/Form.js";

export default function Settings() {
    return (
      <div className="flex justify-center items-center min-h-screen p-6">
        <div className="w-full max-w-3xl px-4">
          <CardDomain />
        </div>
      </div>
    );
}

Settings.layout = Form;
