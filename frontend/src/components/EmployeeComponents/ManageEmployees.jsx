import { ArrowLabel } from "../others/ArrowLabel";
import { SearchBar } from "../others/SearchBar";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useEmployee } from "../../contexts/EmployeeContext";

export function ManageEmployees() {
  const [searchInput, setSearchInput] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const { fetchedData, setSelectedEmployee } = useEmployee();

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    setEmployeeData(
      fetchedData.filter(
        (employee) => employee.employeeId && employee.employeeId !== ""
      )
    );
    setIsFetched(true);
  };

  const handleEdit = (id) => {
    const employee = employeeData.find((e) => e._id === id);
    if (employee) {
      setSelectedEmployee(employee);
    }
    // Placeholder for edit logic
    navigate(`/home/employee/edit`);
  };

  return (
    <div className="flex flex-col">
      <ArrowLabel label="Manage Employees" location={"/home/employee"} />
      <div className="flex justify-center items-center gap-4 my-4 border border-neutral-600 rounded-xl bg-neutral-900">
        <SearchBar
          label="Search By Department..."
          onChange={handleSearchInput}
          value={searchInput}
        />
        <MdSearch
          className="w-6 h-6 cursor-pointer"
          onClick={handleSearchClick}
        />
      </div>
      {isFetched && (
        <div className="p-4">
          <table className="w-full text-center bg-neutral-900 border border-neutral-600">
            <thead className="border border-neutral-600 bg-neutral-800">
              <tr>
                <th className="py-3">EmployeeId</th>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Current Project</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee) => (
                <tr
                  key={employee.employeeId}
                  className="border border-neutral-600"
                >
                  <td className="py-3">{employee.employeeId}</td>
                  <td>{`${employee.firstName} ${employee.lastName}`}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>{employee.project ? employee.project[0] : "None"}</td>
                  <td>
                    <Edit
                      className="w-6 h-6 cursor-pointer text-yellow-500"
                      onClick={() => handleEdit(employee._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
