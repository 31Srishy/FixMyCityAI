import React, { useState } from "react";

export default function CardComplaint() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_no: "",
    location: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
        if (formData[key] !== null) {
            formDataToSend.append(key, formData[key]);
        }
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/Complaints/submit-complaint/", {
            method: "POST",
            body: formDataToSend, // Don't set Content-Type manually
        });

        if (response.ok) {
            alert("Complaint submitted successfully!");
            setFormData({
                full_name: "",
                email: "",
                phone_no: "",
                location: "",
                description: "",
                image: null,
            });
        } else {
            const errorData = await response.json();
            alert("Failed to submit complaint: " + JSON.stringify(errorData));
        }
    } catch (error) {
        console.error("Error submitting complaint:", error);
    }
};

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Complaint Form</h6>
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={handleSubmit}>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Complaint Details</h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Full Name</label>
              <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Enter your full name" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full" required />
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full" required />
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Phone Number</label>
              <input type="tel" name="phone_no" value={formData.phone_no} onChange={handleChange} placeholder="Enter your phone number" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full" required />
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Upload Image</label>
              <input type="file" name="image" onChange={handleFileChange} className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full" />
            </div>
            <div className="w-full px-4">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Enter complaint location" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full" required />
            </div>
            <div className="w-full px-4">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe your complaint..." className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full" rows="4" required></textarea>
            </div>
          </div>
          <div className="text-center mt-6">
            <button className="bg-blueGray-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-md outline-none" type="submit">
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
