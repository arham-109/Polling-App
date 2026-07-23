import { useState, type FormEvent } from "react";
import { AndInput } from "../components/Input";
import { AntdPass } from "../components/Password";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import Google from "../assets/google.svg";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { login } from "../redux/states";

const Signup = () => {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [confirm, set_confirm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      message.error("Email is required");
      return;
    }

    if (!password) {
      message.error("Password is required");
      return;
    }

    if (password !== confirm) {
      message.error("Passwords don't match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        const user = userCredential.user;
        const userData = {
          email: user.email,
          uid: user.uid,
        };
        dispatch(login(userData as any));

        message.success("Signup successful!");
        navigate("/");
      })
      .catch((error) => {
        message.error(error.message.replace("Firebase: Error", ""));
      });
  };
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    signInWithPopup(auth, provider)
      .then((result) => {
        const userGoogle = {
          email: result.user.email,
          uid: result.user.uid,
        };
        dispatch(login(userGoogle as any));
        message.success("Google SignIn Sucessfull");
        navigate("/");
      })
      .catch((error) => {
        message.error(error.message.replace("Firebase: Error", ""));
      });
  };

  return (
      <form
      className="flex flex-col justify-center items-center p-[10%] gap-4.5 md:border md:border-slate-300 md:shadow-md m-20 w-116 h-140 mx-auto md:rounded-2xl animate-[fade_3s_ease-in-out_forwards] md:hover:-translate-y-2 md:hover:shadow-2xl md:transition-all md:duration-300"
      onSubmit={handleSignup}
    >
      <div>
        <h1 className="text-4xl font-bold">Signup</h1>
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
        <AntdPass
          placeholder="Confirm Password"
          onChange={(e: any) => set_confirm(e.target.value)}
        />
      </div>
      <div>
        <p className="w-max">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <button
          className="border border-white p-3 md:w-100 rounded-xl bg-indigo-500 hover:bg-indigo-700 text-white transition-all duration-400 cursor-pointer"
          type="submit"
        >
          Submit
        </button>
        <button
          className="flex justify-center items-center gap-2 border hover:-translate-y-1 transition-all duration-300 w-100 rounded-xl p-3 cursor-pointer"
          onClick={googleLogin}
        >
          <img src={Google} alt="google svg" className="h-5 w-5" />
          Signup with Google
        </button>
      </div>
    </form>
  );
};

export default Signup;
