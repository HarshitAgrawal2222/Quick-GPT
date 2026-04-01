import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [state, setState] = useState("login"); // login | signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { axios, setToken } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      state === "login"
        ? "/api/user/login"
        : "/api/user/register";

    const payload =
      state === "login"
        ? { email, password }
        : { name, email, password };

    try {
      const { data } = await axios.post(url, payload);

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(
          state === "login" ? "Login successful" : "Account created"
        );
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const switchMode = (mode) => {
    setState(mode);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <main className="flex items-center justify-center w-full min-h-screen 
                    bg-linear-to-b from-[#242124] to-[#000000] px-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col max-w-md 
                   bg-[#1b1a1d]/60 backdrop-blur-xl 
                   p-10 rounded-2xl shadow-lg 
                   border border-purple-700/40"
      >
        <h2 className="text-4xl font-semibold text-purple-200 text-center">
          {state === "login" ? "Sign In" : "Sign Up"}
        </h2>

        <p className="mt-3 text-sm text-purple-300/70 text-center">
          {state === "login"
            ? "Please enter your email and password."
            : "Create your account to get started."}
        </p>

        {state === "signup" && (
          <div className="mt-8">
            <label className="font-medium text-purple-200">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 rounded-lg bg-[#2a2730] text-white 
                         px-3 py-3 w-full border border-purple-700/40"
            />
          </div>
        )}

        <div className="mt-8">
          <label className="font-medium text-purple-200">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 rounded-lg bg-[#2a2730] text-white 
                       px-3 py-3 w-full border border-purple-700/40"
          />
        </div>

        <div className="mt-6">
          <label className="font-medium text-purple-200">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 rounded-lg bg-[#2a2730] text-white 
                       px-3 py-3 w-full border border-purple-700/40"
          />
        </div>

        <button
          type="submit"
          className="mt-8 py-3 w-full rounded-lg 
                     bg-linear-to-r from-purple-600 to-purple-800 
                     text-white font-semibold"
        >
          {state === "login" ? "Login" : "Create Account"}
        </button>

        <p className="text-center pt-6 text-purple-300/80">
          {state === "login" ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => switchMode("signup")}
                className="text-purple-400 cursor-pointer"
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => switchMode("login")}
                className="text-purple-400 cursor-pointer"
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </main>
  );
};

export default Login;


