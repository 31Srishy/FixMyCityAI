import React, { useEffect, useState } from "react";
import axios from "axios";

// layout for page
import Form from "layouts/Form.js";

export default function Settings() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch complaints from the backend
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:8000/display-complaints/");
        // Initialize `liked` state for each complaint
        const complaintsWithLikes = response.data.map((complaint) => ({
          ...complaint,
          liked: false, // Default to false
          showFullDescription: false, // Default to false
          showFullSummary: false, // Default to false
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

  const toggleDescription = (id) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint.id === id
          ? { ...complaint, showFullDescription: !complaint.showFullDescription }
          : complaint
      )
    );
  };

  const toggleSummary = (id) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint.id === id
          ? { ...complaint, showFullSummary: !complaint.showFullSummary }
          : complaint
      )
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 relative">
      {/* Overlapping Content */}
      <div className="w-full max-w-7xl px-4 absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
        {/* Main Heading */}
        <h1 className="text-3xl font-bold text-center text-white mb-8">All Complaints</h1>

        <div className="space-y-6 overflow-y-auto max-h-screen">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="flex bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 p-4 mb-4"
            >
              {/* Image Section */}
              <div className="w-48 h-48 flex-shrink-0 overflow-hidden">
                {complaint.image ? (
                  <img
                    src={complaint.image}
                    alt="Complaint"
                    className="w-full h-full object-cover rounded-lg"
                    onLoad={(e) => {
                      const img = e.target;
                      console.log(`Image dimensions: ${img.width} x ${img.height}`);
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-gray-500 text-sm">No Image Available</span>
                  </div>
                )}
              </div>

              {/* Description Section */}
              <div className="w-2/3 p-4 flex flex-col justify-between bg-gray-100 rounded-lg ml-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {complaint.classified_domain}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {complaint.showFullDescription
                      ? complaint.description
                      : `${complaint.description.slice(0, 100)}...`}
                    {complaint.description.length > 100 && (
                      <button
                        onClick={() => toggleDescription(complaint.id)}
                        className="text-blue-500 hover:underline ml-2"
                      >
                        {complaint.showFullDescription ? "Read less" : "Read more"}
                      </button>
                    )}
                  </p>

                  {/* Additional Fields */}
                  <div className="mt-4 space-y-2">
                    {complaint.summary ? (
                      <p className="text-gray-600 mt-2">
                        Location:
                        {complaint.showFullSummary
                          ? complaint.location
                          : `${complaint.location.slice(0, 50)}...`}
                        {complaint.location.length > 50 && (
                          <button
                            onClick={() => toggleSummary(complaint.id)}
                            className="text-blue-500 hover:underline ml-2"
                          >
                            {complaint.showFullSummary ? "Read less" : "Read more"}
                          </button>
                        )}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Location:</span> {complaint.location}
                      </p>
                    )}
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
                <div className="mt-4 flex justify-end">
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