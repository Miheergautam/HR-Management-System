import { useNavigate } from "react-router-dom";
import { ArrowLabel } from "../components/others/ArrowLabel";

import { Outlet, useLocation } from "react-router-dom";

export function Profile() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSaveDetails = () => {
    // Save the user details
    navigate("info");
  };

  return (
    <div className="flex flex-col gap-2">
      <ArrowLabel label="Profile" location={"/home"} />
      <div className="grid grid-cols-4 gap-4 p-2">
        {location.pathname !== "/home/profile/change-password" && (
          <div className="bg-neutral-900 rounded-xl border border-neutral-700 p-4">
            <div className="flex flex-col gap-4">
              {location.pathname !== "/home/profile/edit" && (
                <>
                  <button
                    className="text-white rounded-xl py-2 px-4 border border-neutral-600 bg-indigo-500"
                    onClick={() => navigate("edit")}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate("change-password")}
                    className="text-white rounded-xl py-2 px-1 border border-neutral-600 bg-indigo-500"
                  >
                    Change Password
                  </button>
                </>
              )}
              {location.pathname === "/home/profile/edit" && (
                <button
                  onClick={handleSaveDetails}
                  className="text-white rounded-xl py-2 px-4 border border-neutral-600 bg-indigo-500"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}
