import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("login"); // login | signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state === "login") {
      console.log("LOGIN:", { email, password });
    } else {
      console.log("SIGN UP:", { name, email, password });
    }
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
        {/* Heading */}
        <h2 className="text-4xl font-semibold text-purple-200 text-center">
          {state === "login" ? "Sign In" : "Sign Up"}
        </h2>

        <p className="mt-3 text-sm text-purple-300/70 text-center">
          {state === "login"
            ? "Please enter your email and password."
            : "Create your account to get started."}
        </p>

        {/* Name (Signup only) */}
        {state === "signup" && (
          <div className="mt-8">
            <label className="font-medium text-purple-200">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 rounded-lg bg-[#2a2730] text-white 
                         focus:ring-2 focus:ring-purple-500 
                         outline-none px-3 py-3 w-full 
                         border border-purple-700/40"
            />
          </div>
        )}

        {/* Email */}
        <div className="mt-8">
          <label className="font-medium text-purple-200">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 rounded-lg bg-[#2a2730] text-white 
                       focus:ring-2 focus:ring-purple-500 
                       outline-none px-3 py-3 w-full 
                       border border-purple-700/40"
          />
        </div>

        {/* Password */}
        <div className="mt-6">
          <label className="font-medium text-purple-200">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 rounded-lg bg-[#2a2730] text-white
                       focus:ring-2 focus:ring-purple-500 
                       outline-none px-3 py-3 w-full 
                       border border-purple-700/40"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-8 py-3 w-full rounded-lg 
                     bg-linear-to-r from-purple-600 to-purple-800 
                     text-white font-semibold 
                     transition hover:opacity-90 shadow-md"
        >
          {state === "login" ? "Login" : "Create Account"}
        </button>

        {/* Switch */}
        <p className="text-center pt-6 text-purple-300/80">
          {state === "login" ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setState("signup")}
                className="text-purple-400 hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-purple-400 hover:underline cursor-pointer"
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
