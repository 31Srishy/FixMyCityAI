import React from "react";

// components

import CardComplaint from "components/Cards/CardComplaint.js";


// layout for page

import Form from "layouts/Form.js";

export default function Settings() {
    return (
      <div className="flex justify-center items-center min-h-screen p-6">
        <div className="w-full max-w-3xl px-4">
          <CardComplaint />
        </div>
      </div>
    );
}

Settings.layout = Form;
