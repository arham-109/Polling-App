import type { FormEvent } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const currentUser = useSelector((state: any) => state.user);

  const Handlelogout = (e: FormEvent) => {
    e.preventDefault();
    console.log("running")
  };
  return (
    <div className="flex justify-between items-center mt-[1%]">
      <h1 className="text-2xl font-bold">{currentUser?.email}</h1>
      <h1 className="text-2xl font-bold uppercase">Polling App</h1>
      <button
        className="border p-2 rounded border-red-500 text-white bg-red-500 hover:bg-red-700 transition-all duration-300"
        onClick={Handlelogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
