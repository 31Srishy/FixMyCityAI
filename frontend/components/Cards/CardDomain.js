import React, { useState } from "react";

export default function CardDomain() {
  const [formData, setFormData] = useState({
    domain_name: "",
  });

  const handleChange = (e) => {
    setFormData({ domain_name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/Complaints/add-domain/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Domain added successfully!");
        setFormData({ domain_name: "" });
      } else {
        const errorData = await response.json();
        alert("Failed to add domain: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error adding domain:", error);
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Add Domain</h6>
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={handleSubmit}>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Domain Details
          </h6>
          <div className="w-full px-4">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              Domain Name
            </label>
            <input
              type="text"
              name="domain_name"
              value={formData.domain_name}
              onChange={handleChange}
              placeholder="Enter domain name"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full"
              required
            />
          </div>
          <div className="text-center mt-6">
            <button
              className="bg-blueGray-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-md outline-none"
              type="submit"
            >
              Submit Domain
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
