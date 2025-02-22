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