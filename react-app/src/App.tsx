import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Polls from "./pages/Polls";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { login, logout } from "./redux/states";

const App = () => {
  const currentUser = useSelector((state: any) => state.user);
  const isLoading = useSelector((state: any) => state.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    pollUser();
  }, []);

  const pollUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          email: user.email,
          uid: user.uid,
        };
        dispatch(login(userData as any));
        navigate("/");
      } else {
        dispatch(logout());
        navigate("/login");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900 text-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold animate-pulse tracking-wide">
            Loading Application...
          </h2>
          <p className="text-sm text-slate-400 mt-1">Verifying your session</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {currentUser ? (
        <>
          <Route path="/" element={<Polls />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default App;
