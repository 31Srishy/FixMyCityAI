// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import { useRouter } from "next/router";
// import "leaflet/dist/leaflet.css";
// import axios from "axios"; // For making API requests

// // Fix for default marker icons in Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

// // Component to handle map click events
// const MapClickHandler = ({ handleMapClick }) => {
//   useMapEvents({
//     click: (e) => {
//       const { lat, lng } = e.latlng;
//       // Check if the clicked location is within the bounds
//       if (bounds.contains([lat, lng])) {
//         handleMapClick(e);
//       } else {
//         alert("Please select a location within the pincode area.");
//       }
//   },});
//   return null;
// };

// useEffect(() => {
//   if (bounds) {
//     map.setMaxBounds(bounds);
//     map.fitBounds(bounds);
//   }
// }, [bounds, map]);

// return null;
// };

// export default function CardComplaint() {
//   const [formData, setFormData] = useState({
//     image: null,
//     pincode: "",
//     latitude: "",
//     longitude: "",
//     location: "",
//     description: "",
//   });

//   const [position, setPosition] = useState([20.5937, 78.9629]); // Default map center
//   const [markerPosition, setMarkerPosition] = useState(null);
//   const [bounds, setBounds] = useState(null);
//   const router = useRouter();
//   useEffect(() => {
//     if (pincode) {
//       fetchCoordinatesByPincode(pincode);
//     }
//   }, [pincode]);

//   const fetchCoordinatesByPincode = async (pincode) => {
//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/search?format=json&postalcode=${pincode}&country=India&limit=1`
//       );
//       if (response.data && response.data.length > 0) {
//         const { lat, lon } = response.data[0];
//         const coordinates = [parseFloat(lat), parseFloat(lon)];
//         setPosition(coordinates);
//         setMarkerPosition(coordinates);
//         setFormData((prev) => ({
//           ...prev,
//           latitude: lat,
//           longitude: lon,
//         }));
//         fetchAddress(parseFloat(lat), parseFloat(lon));

//         // Define bounds for the pincode area (adjust as needed)
//         const bounds = L.latLngBounds([
//           [parseFloat(lat) - 0.05, parseFloat(lon) - 0.05], // Southwest corner
//           [parseFloat(lat) + 0.05, parseFloat(lon) + 0.05], // Northeast corner
//         ]);
//         setBounds(bounds);
//       } else {
//         console.error("No coordinates found for the pincode:", pincode);
//       }
//     } catch (error) {
//       console.error("Error fetching coordinates:", error);
//     }
//   };

//   // Fetch user's current location on component mount
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setPosition([latitude, longitude]);
//           setMarkerPosition([latitude, longitude]);
//           setFormData((prev) => ({
//             ...prev,
//             latitude: latitude.toString(),
//             longitude: longitude.toString(),
//           }));
//           fetchAddress(latitude, longitude); // Fetch address for current location
//         },
//         (error) => {
//           console.error("Error fetching location:", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   // Function to fetch address using reverse geocoding
//   const fetchAddress = async (lat, lng) => {
//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
//       );
//       const address = response.data.display_name;
//       setFormData((prev) => ({
//         ...prev,
//         location: address,
//       }));
//     } catch (error) {
//       console.error("Error fetching address:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleMapClick = async (e) => {
//     const { lat, lng } = e.latlng;
//     console.log("Map clicked at:", lat, lng); // Debugging
//     setMarkerPosition([lat, lng]);
//     setFormData((prev) => ({
//       ...prev,
//       latitude: lat.toString(),
//       longitude: lng.toString(),
//     }));
//     await fetchAddress(lat, lng); // Fetch address for the clicked location
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();

//     for (const key in formData) {
//       if (formData[key] !== null) {
//         formDataToSend.append(key, formData[key]);
//       }
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:8000/Complaints/submit-complaint/", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       if (response.ok) {
//         alert("Complaint submitted successfully!");
//         setFormData({
//           image: null,
//           pincode: "",
//           latitude: "",
//           longitude: "",
//           location: "",
//           description: "",
//         });
//         setMarkerPosition(null);
//       } else if (response.status === 409) {
//         // Handle the case where the complaint already exists
//         const errorData = await response.json();
//         alert(errorData.error);
//         // Redirect to domains page or any other page as needed
//         router.push("domain") // Adjust the URL as needed
//       } else {
//         const errorData = await response.json();
//         alert("Failed to submit complaint: " + JSON.stringify(errorData));
//       }
//     } catch (error) {
//       console.error("Error submitting complaint:", error);
//     }
// };

//   return (
//     <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
//       <div className="rounded-t bg-white mb-0 px-6 py-6">
//         <div className="text-center flex justify-between">
//           <h6 className="text-blueGray-700 text-xl font-bold">Complaint Form</h6>
//         </div>
//       </div>
//       <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
//         <form onSubmit={handleSubmit}>
//           <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Complaint Details</h6>
//           <div className="flex flex-wrap">
//             <div className="w-full lg:w-6/12 px-4">
//               <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Pincode</label>
//               <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Enter pincode" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full" required />
//             </div>
//             <div className="w-full lg:w-6/12 px-4">
//               <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Latitude</label>
//               <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full" readOnly />
//             </div>
//             <div className="w-full lg:w-6/12 px-4">
//               <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Longitude</label>
//               <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full" readOnly />
//             </div>
//             <div className="w-full lg:w-6/12 px-4">
//               <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Upload Image</label>
//               <input type="file" name="image" onChange={handleFileChange} className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full" />
//             </div>
//             <div className="w-full px-4">
//               <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Location</label>
//               <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Enter complaint location" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full" required />
//             </div>
//             <div className="w-full px-4">
//               <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Description</label>
//               <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe your complaint..." className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full" rows="4" required></textarea>
//             </div>
//             <div className="w-full px-4 mt-4">
//               <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Select Location on Map</label>
//               <div style={{ height: "300px", width: "100%", zIndex: 1 }}>
//                 <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
//                   <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                   />
//                   <MapClickHandler handleMapClick={handleMapClick} />
//                   {markerPosition && (
//                     <Marker position={markerPosition}>
//                       <Popup>Selected Location</Popup>
//                     </Marker>
//                   )}
//                 </MapContainer>
//               </div>
//             </div>
//           </div>
//           <div className="text-center mt-6">
//             <button className="bg-blueGray-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-md outline-none" type="submit">
//               Submit Complaint
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useRouter } from "next/router";
import "leaflet/dist/leaflet.css";
import axios from "axios"; // For making API requests

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Component to handle map click events
const MapClickHandler = ({ handleMapClick, bounds }) => {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      // Check if the clicked location is within the bounds
      if (bounds && bounds.contains([lat, lng])) {
        handleMapClick(e);
      } else {
        alert("Please select a location within the pincode area.");
      }
    },
  });

  useEffect(() => {
    if (bounds) {
      map.setMaxBounds(bounds);
      map.fitBounds(bounds);
    }
  }, [bounds, map]);

  return null;
};

export default function CardComplaint() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const pincode = user?.pincode || "";
  const [formData, setFormData] = useState({
    image: null,
    pincode: pincode,
    latitude: "",
    longitude: "",
    location: "",
    description: "",
  });

  const [position, setPosition] = useState([20.5937, 78.9629]); // Default map center
  const [markerPosition, setMarkerPosition] = useState(null);
  const [bounds, setBounds] = useState(null);
  const router = useRouter();



  useEffect(() => {
    if (pincode) {
      fetchCoordinatesByPincode(pincode);
    }
  }, [pincode]);

  const fetchCoordinatesByPincode = async (pincode) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&postalcode=${pincode}&country=India&limit=1`
      );
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const coordinates = [parseFloat(lat), parseFloat(lon)];
        setPosition(coordinates);
        setMarkerPosition(coordinates);
        setFormData((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lon,
        }));
        fetchAddress(parseFloat(lat), parseFloat(lon));

        // Define bounds for the pincode area (adjust as needed)
        const bounds = L.latLngBounds([
          [parseFloat(lat) - 0.05, parseFloat(lon) - 0.05], // Southwest corner
          [parseFloat(lat) + 0.05, parseFloat(lon) + 0.05], // Northeast corner
        ]);
        setBounds(bounds);
      } else {
        console.error("No coordinates found for the pincode:", pincode);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  // Fetch user's current location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          setMarkerPosition([latitude, longitude]);
          setFormData((prev) => ({
            ...prev,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          }));
          fetchAddress(latitude, longitude); // Fetch address for current location
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Function to fetch address using reverse geocoding
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const address = response.data.display_name;
      setFormData((prev) => ({
        ...prev,
        location: address,
      }));
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    console.log("Map clicked at:", lat, lng); // Debugging
    setMarkerPosition([lat, lng]);
    setFormData((prev) => ({
      ...prev,
      latitude: lat.toString(),
      longitude: lng.toString(),
    }));
    await fetchAddress(lat, lng); // Fetch address for the clicked location
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
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Complaint submitted successfully!");
        setFormData({
          image: null,
          pincode: "",
          latitude: "",
          longitude: "",
          location: "",
          description: "",
        });
        setMarkerPosition(null);
      } else if (response.status === 409) {
        // Handle the case where the complaint already exists
        const errorData = await response.json();
        alert(errorData.error);
        // Redirect to domains page or any other page as needed
        router.push("domain") // Adjust the URL as needed
      } else {
        const errorData = await response.json();
        alert("Failed to submit complaint: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };
  const emojiIcon = new L.DivIcon({
    className: "custom-emoji-marker",
    html: `<div style="
        font-size: 32px;  /* Increase font size */
        width: 40px; 
        height: 40px; 
        text-align: center; 
        line-height: 40px;
        ">📍</div>`, // Change the emoji if needed
    iconSize: [40, 40], // Set size
    iconAnchor: [20, 40], // Adjust positioning
  });

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
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full"
              readOnly // Make the input read-only
              required
            />
          </div>
            <div className="w-full lg:w-6/12 px-4">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Latitude</label>
              <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full" readOnly />
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Longitude</label>
              <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full" readOnly />
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
            <div className="w-full px-4 mt-4">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Select Location on Map</label>
              <div style={{ height: "300px", width: "100%", zIndex: 1 }}>
                <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <MapClickHandler handleMapClick={handleMapClick} bounds={bounds} />
                  {markerPosition && (
                    <Marker position={markerPosition} icon={emojiIcon}>
                      <Popup>Selected Location</Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
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