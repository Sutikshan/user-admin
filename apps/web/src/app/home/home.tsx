import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { MainNav } from "./components/mainNav";
import { UserNav } from "./components/userNav";

export function Home() {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate("/login");
    }
  }, [state]);

  return (
    <div className="container relative">
      <div className="flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-2">
            <MainNav className="mx-4" />{" "}
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex flex-1">
          <div className="flex-1">
            <div id="detail" className="p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
