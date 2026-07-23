import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { logout as logoutAction } from "../redux/states";

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const currentUser = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmail = currentUser?.email || "";
  const avatarInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "U";

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logoutAction());
        message.success("Logout Successful");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 md:px-8 py-3 max-w-7xl mx-auto">
        <h1 className="text-lg md:text-2xl font-bold uppercase tracking-wide text-slate-800">
          Polling App
        </h1>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <span
              className="text-base font-semibold text-slate-700 max-w-62.5 truncate"
              title={userEmail}
            >
              {userEmail}
            </span>
            <button
              className="px-4 py-2 rounded-lg border border-red-500 text-white bg-red-500 hover:bg-red-600 font-medium transition-all duration-300 shadow-sm"
              onClick={logout}
            >
              Logout
            </button>
          </div>

          <div className="md:hidden relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {avatarInitial}
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-slate-200 p-3 z-50">
                <p className="text-[11px] text-slate-400 font-medium">
                  Logged in as
                </p>
                <p
                  className="text-xs font-semibold text-slate-800 truncate my-1"
                  title={userEmail}
                >
                  {userEmail}
                </p>
                <hr className="my-2 border-slate-100" />
                <button
                  onClick={logout}
                  className="w-full text-left py-1.5 px-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
