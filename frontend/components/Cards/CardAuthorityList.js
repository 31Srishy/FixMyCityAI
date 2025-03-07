import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function CardAuthorityList({ domainId }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const authority_id = user?.id || "";

  useEffect(() => {
    if (!domainId) return;
    
    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/Complaints/complaints-by-domain/?domain_id=${domainId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch complaints");
        }
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [domainId]);

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-gray-600 mb-1 text-xs font-semibold">
              Complaints from your domain
            </h6>
            <h2 className="text-gray-800 text-xl font-bold">
              Choose your complaint
            </h2>
          </div>
          {/* button to filter based on status inprogress*/}
        </div>
      </div>
      <div className="p-4 flex-auto">
        {loading ? (
          <p className="text-center text-gray-600">Loading complaints...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : complaints.length === 0 ? (
          <p className="text-center text-gray-600">No complaints found.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="flex bg-gray-100 p-4 rounded-lg shadow-md"
              >
                {/* Left: Complaint Image */}
                <div className="w-1/3">
                  <img
                    src={complaint.image}
                    alt="Complaint"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Right: Complaint Details */}
                <div className="w-2/3 pl-4 flex flex-col justify-between">
                  <h3 className="text-lg font-bold text-gray-900">
                    {complaint.location}
                  </h3>

                  {/* Truncated description with "Read More" */}
                  <p className="text-sm text-gray-700">
                    {complaint.description.length > 100
                      ? `${complaint.description.substring(0, 100)}...`
                      : complaint.description}
                    {complaint.description.length > 100 && (
                      <span className="text-blue-500 cursor-pointer ml-1">
                        Read More
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-700">
                      <span className="text-blue-500 cursor-pointer ml-1">
                        Key Points: {complaint.summary}
                      </span>
                  </p>

                  <p className="text-xs text-gray-600">
                    <strong>Submitted:</strong>{" "}
                    {new Date(complaint.submitted_date).toDateString()}
                  </p>

                  {complaint.status === "Pending" ? (
  <button
    style={{
      backgroundColor: "#4B5563", // Blue-Gray 600
      color: "white",
      padding: "8px 16px",
      fontSize: "12px",
      fontWeight: "600",
      borderRadius: "6px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s ease",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#374151")} // Blue-Gray 700 on hover
    onMouseOut={(e) => (e.target.style.backgroundColor = "#4B5563")} // Reset to Blue-Gray 600
    onClick={async () => {
      try {
        const response = await fetch("http://localhost:8000/Complaints/assignauthority/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ complaint_id: complaint.id, authority_id: authority_id }),
        });

        const data = await response.json();
        console.log("Response Status:", response.status); // Log HTTP status code
        console.log("Response Data:", data); // Log actual response from backend

        if (response.ok) {
          alert(`Complaint assigned to ${data.assigned_to}. Status updated to ${data.new_status}!`);
          router.push("/admin/authoritylist");
        } else {
          alert(data.error || "Unknown error occurred");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        alert("Failed to assign authority");
      }
    }}
  >
    Take it up
  </button>
) : (
  <div>
    <p className="text-xs text-gray-600 mt-2">
      <strong>Status:</strong>{" "}
      <span className="font-semibold">{complaint.status}</span>
    </p>
    {complaint.status !== "Resolved" && (
      <button
        style={{
          backgroundColor: "#2563EB", // Blue 600
          color: "white",
          padding: "8px 16px",
          fontSize: "12px",
          fontWeight: "600",
          borderRadius: "6px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1D4ED8")} // Blue 700 on hover
        onMouseOut={(e) => (e.target.style.backgroundColor = "#2563EB")} // Reset to Blue 600
        onClick={async () => {
          try {
            const response = await fetch("http://localhost:8000/Complaints/update-complaint/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                complaint_id: complaint.id,
                status: "Resolved", // Example: Marking complaint as Resolved
              }),
            });

            const data = await response.json();
            console.log("Response Status:", response.status);
            console.log("Response Data:", data);

            if (response.ok) {
              alert(`Complaint status updated to ${data.new_status}.`);
              router.reload(); // Reload the page to reflect updates
            } else {
              alert(data.error || "Failed to update complaint");
            }
          } catch (error) {
            console.error("Fetch Error:", error);
            alert("Failed to update complaint");
          }
        }}
      >
        Update Status
      </button>
    )}
  </div>
)}


                  {/* {complaint.status === "Pending" && (
                    <button
                    style={{
                      backgroundColor: "#4B5563", // Blue-Gray 600
                      color: "white",
                      padding: "8px 16px",
                      fontSize: "12px",
                      fontWeight: "600",
                      borderRadius: "6px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#374151")} // Blue-Gray 700 on hover
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#4B5563")} // Reset to Blue-Gray 600
                    onClick={async () => {
                        try {
                          const response = await fetch("http://localhost:8000/Complaints/assignauthority/", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ complaint_id: complaint.id, authority_id: authority_id }),
                          });
                    
                          const data = await response.json();
                          console.log("Response Status:", response.status); // Log HTTP status code
                          console.log("Response Data:", data); // Log actual response from backend
                    
                          if (response.ok) {
                            alert(`Complaint assigned to ${data.assigned_to}. Status updated to ${data.new_status}!`);
                            router.push("/admin/authoritylist");
                          } else {
                            alert(data.error || "Unknown error occurred");
                          }
                        } catch (error) {
                          console.error("Fetch Error:", error);
                          alert("Failed to assign authority");
                        }
                      }}
                    
                  >
                    Take it up
                  </button>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
