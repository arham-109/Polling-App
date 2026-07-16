import { useState, type FormEvent } from "react";
import { AndInput } from "../components/Input";
import { AntdPass } from "../components/Password";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Google from "../assets/google.svg";
import { useDispatch } from "react-redux";
import { login } from "../redux/states";

const Login = () => {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();



  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      message.error("Email is required");
      return;
    }

    if (!password) {
      message.error("Password is required");
      return;
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: user.email,
          uid: user.uid,
        };
        dispatch(login(userData as any));
        message.success("Login successful");
        Navigate("/");
      })
      .catch((error) => {
        message.error(error.message.replace("Firebase: Error", ""));
      });
  };
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const userGoogle = {
          email: result.user.email,
          uid: result.user.uid,
        };
        dispatch(login(userGoogle as any));
        message.success("Google Login Successfull");
        Navigate("/");
      })
      .catch((error) => {
        console.error(error);
        message.error(error.message);
      });
  };

  return (
    <form
      className="flex flex-col justify-center items-center  m-auto p-[10%] gap-10"
      onSubmit={handleLogin}
    >
      <div>
        <h1 className="text-4xl font-bold">Login</h1>
      </div>
      <div className="flex flex-col gap-5 w-100 text-[18px]">
        <AndInput
          placeholder="Enter Your Email"
          onChange={(e: any) => set_email(e.target.value)}
        />
        <AntdPass
          placeholder="Enter Password"
          onChange={(e: any) => set_password(e.target.value)}
        />
      </div>
      <div>
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <button
          className="border border-white p-3 w-100 rounded bg-blue-500 text-white hover:bg-blue-700 hover:text-white transition-all duration-400 cursor-pointer"
          onSubmit={handleLogin}
        >
          Submit
        </button>
        <button
          className="flex justify-center items-center gap-2 border w-100 rounded p-3 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          onClick={googleLogin}
        >
          <img src={Google} alt="google svg" className="h-5 w-5" />
          Continue with google
        </button>
      </div>
    </form>
  );
};

export default Login;
