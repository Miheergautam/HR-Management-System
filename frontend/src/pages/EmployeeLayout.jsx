import { Outlet } from "react-router-dom";
import { ArrowLabel } from "../components/others/ArrowLabel";
import { ButtonPanel } from "../components/others/ButtonPanel";
import { useLocation } from "react-router-dom";

export function EmployeeLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      {location.pathname === "/home/employee" && (
        <>
          <ArrowLabel label="Employee" location={"/home"} />
          <ButtonPanel
            number={3}
            labels={["Create Employee", "Manage Employee" , "Employee Info"]}
            locations={["create", "manage" , "info"]}
          />
        </>
      )}
      <Outlet />
    </div>
  );
}