import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const {login} = useContext(AuthContext)


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      fullName,
      email,
      password,
      bio,
    };
    console.log("Form Data: ", formData);
    setIsDataSubmitted(true);
    login(currentState === "Sign up" ? 'signup' : 'login', formData)
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center gap-12 px-4 backdrop-blur-2xl text-white">
      {/* left logo / preview */}
      <div className="hidden sm:flex flex-col items-center gap-4">
        <img
          src={assets.logo_big}
          alt="logo"
          className="w-[min(30vw,250px)] drop-shadow-lg"
        />
        <h1 className="text-3xl font-bold text-white/90 tracking-wide">
          ChatOp
        </h1>
        <p className="text-gray-300 text-sm text-center max-w-xs">
          Welcome to ChatOp — connect, chat and share moments in a sleek dark
          theme interface.
        </p>
      </div>

      {/* right form */}
      <form
        onSubmit={handleSubmit}
        className="border border-gray-600 bg-black/40 flex flex-col gap-5 rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="font-semibold text-2xl flex justify-between items-center">
          {currentState}
          <img
            src={assets.arrow_icon}
            alt="icon"
            className="cursor-pointer w-6 rotate-180 opacity-70 hover:opacity-100 transition"
            onClick={() =>
              setCurrentState(currentState === "Sign up" ? "Login" : "Sign up")
            }
          />
        </h2>

        {currentState === "Sign up" && (
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-3 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Full Name"
            required
          />
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Password"
          required
        />

        {currentState === "Sign up" && (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-3 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Short Bio"
            rows="3"
          />
        )}

        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 py-3 cursor-pointer rounded-lg text-lg font-medium transition shadow-md"
        >
          {currentState === "Sign up" ? "Create Account" : "Login"}
        </button>

        <p className="text-sm text-gray-400 text-center">
          {currentState === "Sign up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setCurrentState("Login")}
                className="text-violet-400 cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setCurrentState("Sign up")}
                className="text-violet-400 cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
