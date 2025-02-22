import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";

const CardTable = ({ color }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    if (data.length === 0) {
      const dummyData = [
        { id: 1, domain: "Roads & Transport", summary: "Pothole on Main Street causing traffic congestion", assignedAuthority: "Municipal Corporation", user: "John Doe", location: "Main Street, City Center", status: "Pending" },
        { id: 2, domain: "Water Supply", summary: "No water supply in Sector 12 since 3 days", assignedAuthority: "Water Board", user: "Jane Smith", location: "Sector 12, Downtown", status: "In Progress" },
        { id: 3, domain: "Electricity", summary: "Frequent power cuts in residential area", assignedAuthority: "Electricity Department", user: "Michael Johnson", location: "Greenwood Colony", status: "Resolved" },
        { id: 4, domain: "Garbage Collection", summary: "Overflowing garbage bins in public park", assignedAuthority: "Sanitation Department", user: "Emily Brown", location: "Central Park", status: "Pending" },
        { id: 5, domain: "Public Safety", summary: "Broken streetlights leading to safety concerns", assignedAuthority: "Public Works Department", user: "David Wilson", location: "Lakeview Avenue", status: "In Progress" }
      ];
      setData(dummyData);
      setColumns(Object.keys(dummyData[0]));
    }
  }, [data]);

  return (
    <div className="overflow-x-auto p-4 bg-blueGray-700 text-white">
      {columns.length > 0 && (
        <table className="items-center w-full bg-transparent border-collapse">
          <thead className={`bg-${color === "dark" ? "white-800 text-bluegray-700" : "bluegray-700 text-white-800"}`}>
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  {column.replace(/([A-Z])/g, " $1").trim()}
                </th>
              ))}
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                {columns.map((column) => (
                  <td key={column} className="px-6 py-4 text-sm text-blue-700 border-b">
                    {item[column]}
                  </td>
                ))}
                <td className="px-6 py-4 text-sm border-b relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                    className="px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                  {openDropdown === item.id && (
                    <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <button
                          onClick={() => alert(`Update clicked for ${item.id}`)}
                          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-700 transition duration-300"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => alert(`Delete clicked for ${item.id}`)}
                          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-700 transition duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardTable;

// import React from "react";
// import PropTypes from "prop-types";

// // components

// import TableDropdown from "components/Dropdowns/TableDropdown.js";

// export default function CardTable({ color }) {
//   return (
//     <>
//       <div
//         className={
//           "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
//           (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
//         }
//       >
//         <div className="rounded-t mb-0 px-4 py-3 border-0">
//           <div className="flex flex-wrap items-center">
//             <div className="relative w-full px-4 max-w-full flex-grow flex-1">
//               <h3
//                 className={
//                   "font-semibold text-lg " +
//                   (color === "light" ? "text-blueGray-700" : "text-white")
//                 }
//               >
//                 Card Tables
//               </h3>
//             </div>
//           </div>
//         </div>
//         <div className="block w-full overflow-x-auto">
//           {/* Projects table */}
//           <table className="items-center w-full bg-transparent border-collapse">
//             <thead>
//               <tr>
//                 <th
//                   className={
//                     "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
//                     (color === "light"
//                       ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                       : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
//                   }
//                 >
//                   Project
//                 </th>
//                 <th
//                   className={
//                     "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
//                     (color === "light"
//                       ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                       : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
//                   }
//                 >
//                   Budget
//                 </th>
//                 <th
//                   className={
//                     "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
//                     (color === "light"
//                       ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                       : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
//                   }
//                 >
//                   Status
//                 </th>
//                 <th
//                   className={
//                     "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
//                     (color === "light"
//                       ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                       : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
//                   }
//                 >
//                   Users
//                 </th>
//                 <th
//                   className={
//                     "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
//                     (color === "light"
//                       ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                       : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
//                   }
//                 >
//                   Completion
//                 </th>
//                 <th
//                   className={
//                     "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
//                     (color === "light"
//                       ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
//                       : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
//                   }
//                 ></th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
//                   <img
//                     src="/img/bootstrap.jpg"
//                     className="h-12 w-12 bg-white rounded-full border"
//                     alt="..."
//                   ></img>{" "}
//                   <span
//                     className={
//                       "ml-3 font-bold " +
//                       +(color === "light" ? "text-blueGray-600" : "text-white")
//                     }
//                   >
//                     Argon Design System
//                   </span>
//                 </th>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   $2,500 USD
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <i className="fas fa-circle text-orange-500 mr-2"></i> pending
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <div className="flex">
//                     <img
//                       src="/img/team-1-800x800.jpg"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
//                     ></img>
//                     <img
//                       src="/img/team-2-800x800.jpg"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
//                     ></img>
//                     <img
//                       src="/img/team-3-800x800.jpg"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
//                     ></img>
//                     <img
//                       src="/img/team-4-470x470.png"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
//                     ></img>
//                   </div>
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     <span className="mr-2">60%</span>
//                     <div className="relative w-full">
//                       <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
//                         <div
//                           style={{ width: "60%" }}
//                           className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
//                   <TableDropdown />
//                 </td>
//               </tr>
//               <tr>
//                 <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
//                   <img
//                     src="/img/angular.jpg"
//                     className="h-12 w-12 bg-white rounded-full border"
//                     alt="..."
//                   ></img>{" "}
//                   <span
//                     className={
//                       "ml-3 font-bold " +
//                       +(color === "light" ? "text-blueGray-600" : "text-white")
//                     }
//                   >
//                     Angular Now UI Kit PRO
//                   </span>
//                 </th>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   $1,800 USD
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <i className="fas fa-circle text-emerald-500 mr-2"></i>{" "}
//                   completed
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <div className="flex">
//                     <img
//                       src="/img/team-1-800x800.jpg"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
//                     ></img>
//                     <img
//                       src="/img/team-2-800x800.jpg"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
//                     ></img>
//                     <img
//                       src="/img/team-3-800x800.jpg"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
//                     ></img>
//                     <img
//                       src="/img/team-4-470x470.png"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
//                     ></img>
//                   </div>
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     <span className="mr-2">100%</span>
//                     <div className="relative w-full">
//                       <div className="overflow-hidden h-2 text-xs flex rounded bg-emerald-200">
//                         <div
//                           style={{ width: "100%" }}
//                           className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
//                   <TableDropdown />
//                 </td>
//               </tr>
//               <tr>
//                 <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
//                   <img
//                     src="/img/sketch.jpg"
//                     className="h-12 w-12 bg-white rounded-full border"
//                     alt="..."
//                   ></img>{" "}
//                   <span
//                     className={
//                       "ml-3 font-bold " +
//                       +(color === "light" ? "text-blueGray-600" : "text-white")
//                     }
//                   >
//                     Black Dashboard Sketch
//                   </span>
//                 </th>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   $3,150 USD
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <i className="fas fa-circle text-red-500 mr-2"></i> delayed
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <div className="flex">
//                     <img
//                       src="/img/team-1-800x800.jpg"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
//                     ></img>
//                     <img
//                       src="/img/team-2-800x800.jpg"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
//                     ></img>
//                     <img
//                       src="/img/team-3-800x800.jpg"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
//                     ></img>
//                     <img
//                       src="/img/team-4-470x470.png"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
//                     ></img>
//                   </div>
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     <span className="mr-2">73%</span>
//                     <div className="relative w-full">
//                       <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
//                         <div
//                           style={{ width: "73%" }}
//                           className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
//                   <TableDropdown />
//                 </td>
//               </tr>
//               <tr>
//                 <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
//                   <img
//                     src="/img/react.jpg"
//                     className="h-12 w-12 bg-white rounded-full border"
//                     alt="..."
//                   ></img>{" "}
//                   <span
//                     className={
//                       "ml-3 font-bold " +
//                       +(color === "light" ? "text-blueGray-600" : "text-white")
//                     }
//                   >
//                     React Material Dashboard
//                   </span>
//                 </th>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   $4,400 USD
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <i className="fas fa-circle text-teal-500 mr-2"></i> on
//                   schedule
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <div className="flex">
//                     <img
//                       src="/img/team-1-800x800.jpg"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
//                     ></img>
//                     <img
//                       src="/img/team-2-800x800.jpg"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
//                     ></img>
//                     <img
//                       src="/img/team-3-800x800.jpg"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
//                     ></img>
//                     <img
//                       src="/img/team-4-470x470.png"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
//                     ></img>
//                   </div>
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     <span className="mr-2">90%</span>
//                     <div className="relative w-full">
//                       <div className="overflow-hidden h-2 text-xs flex rounded bg-teal-200">
//                         <div
//                           style={{ width: "90%" }}
//                           className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
//                   <TableDropdown />
//                 </td>
//               </tr>
//               <tr>
//                 <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
//                   <img
//                     src="/img/vue.jpg"
//                     className="h-12 w-12 bg-white rounded-full border"
//                     alt="..."
//                   ></img>{" "}
//                   <span
//                     className={
//                       "ml-3 font-bold " +
//                       +(color === "light" ? "text-blueGray-600" : "text-white")
//                     }
//                   >
//                     React Material Dashboard
//                   </span>
//                 </th>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   $2,200 USD
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <i className="fas fa-circle text-emerald-500 mr-2"></i>{" "}
//                   completed
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <div className="flex">
//                     <img
//                       src="/img/team-1-800x800.jpg"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
//                     ></img>
//                     <img
//                       src="/img/team-2-800x800.jpg"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
//                     ></img>
//                     <img
//                       src="/img/team-3-800x800.jpg"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
//                     ></img>
//                     <img
//                       src="/img/team-4-470x470.png"
//                       alt="..."
//                       className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
//                     ></img>
//                   </div>
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
//                   <div className="flex items-center">
//                     <span className="mr-2">100%</span>
//                     <div className="relative w-full">
//                       <div className="overflow-hidden h-2 text-xs flex rounded bg-emerald-200">
//                         <div
//                           style={{ width: "100%" }}
//                           className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
//                   <TableDropdown />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// CardTable.defaultProps = {
//   color: "light",
// };

// CardTable.propTypes = {
//   color: PropTypes.oneOf(["light", "dark"]),
// };