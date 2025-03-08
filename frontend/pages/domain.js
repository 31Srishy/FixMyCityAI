import React, { useEffect, useState } from "react";
import axios from "axios";

// layout for page
import Form from "layouts/Form.js";

export default function Settings() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const pincode = user?.pincode || "";
    
  const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:8000/display-complaints/");

        // Filter complaints based on the user's pincode
        const filteredComplaints = response.data.filter((complaint) => complaint.pincode === pincode);

        // Initialize `liked` state for each filtered complaint
        const complaintsWithLikes = filteredComplaints.map((complaint) => ({
          ...complaint,
          liked: false, // Default to false
        }));

        setComplaints(complaintsWithLikes);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  const handleLike = async (id) => {
    try {
      // Find the complaint to update
      const complaintToUpdate = complaints.find((complaint) => complaint.id === id);
      const newVoteCount = complaintToUpdate.liked ? complaintToUpdate.vote - 1 : complaintToUpdate.vote + 1;

      // Send a request to the backend to update the vote count
      const response = await axios.post("http://127.0.0.1:8000/Complaints/add-vote/", {
        id: id,
        action: "toggle",
      });

      console.log("Backend response:", response.data); // Log the response

      // Update the frontend state
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint.id === id
            ? { ...complaint, liked: !complaint.liked, vote: newVoteCount }
            : complaint
        )
      );
    } catch (error) {
      console.error("Error updating vote:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 relative">
      {/* Overlapping Content */}
      <div className="w-full max-w-7xl px-4 absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
        <div className="space-y-6 overflow-y-auto max-h-screen">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="flex bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 p-4 mb-4"
            >
              {/* Image Section */}
<div className="w-48 h-48 flex-shrink-0 aspect-square overflow-hidden">
  {complaint.image && (
    <img
      src={complaint.image}
      alt="Complaint"
      className="w-full h-full object-cover rounded-lg"
      onLoad={(e) => {
        const img = e.target;
        console.log(`Image dimensions: ${img.width} x ${img.height}`);
      }}
    />
  )}
</div>

              {/* Description Section */}
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {complaint.classified_domain}
                  </h2>
                  <p className="text-gray-600 mt-2">{complaint.description}</p>

                  {/* Additional Fields */}
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Location:</span> {complaint.location}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Summary:</span> {complaint.summary}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Submitted Date:</span> {new Date(complaint.submitted_date).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Status:</span> {complaint.status}
                    </p>
                  </div>
                </div>

                {/* Like Button Section */}
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => handleLike(complaint.id)}
                    className={`flex items-center space-x-2 text-lg font-semibold ${
                      complaint.liked ? "text-blue-500" : "text-gray-500"
                    }`}
                  >
                    <span className="text-2xl">👍</span>
                    <span>{complaint.vote}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Settings.layout = Form;