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
  const navigate = useNavigate();
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
        navigate("/");
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
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        message.error(error.message);
      });
  };

  return (
    <form
      className="flex flex-col justify-center items-center p-6 sm:p-8 gap-4.5 w-full max-w-md my-8 md:my-20 mx-auto px-4 md:border md:border-slate-300 md:shadow-md md:rounded-2xl animate-[fade_3s_ease-in-out_forwards] md:hover:-translate-y-2 md:hover:shadow-2xl md:transition-all md:duration-300"
      onSubmit={handleLogin}
    >
      <div>
        <h1 className="text-4xl font-bold">Login</h1>
      </div>

      <div className="flex flex-col gap-5 w-full text-[18px]">
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
        <p className="text-center md:w-max">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <button
          type="submit"
          className="border border-white p-3 w-full bg-indigo-500 text-white hover:bg-indigo-700 hover:text-white transition-all duration-400 cursor-pointer rounded-xl"
        >
          Submit
        </button>
        <button
          type="button"
          className="flex justify-center items-center gap-2 border w-full rounded-xl p-3 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
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
