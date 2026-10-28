"use client";

import { SunIcon as Sunburst } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const FullScreenLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validatePassword = (value: string) => {
    return value.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      console.log("Login submitted!");
      console.log("Email:", email);
      router.push("/dashboard");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden p-6 bg-white">
      <div className="w-full relative max-w-5xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-gray-100 bg-white">
        
        {/* Left Side: Fluted glass & glowing light effect */}
        <div className="bg-black text-white p-8 md:p-12 md:w-1/2 relative overflow-hidden flex flex-col justify-start min-h-[480px]">
          {/* Glowing orbs positioned at the bottom */}
          <div className="w-[18rem] h-[18rem] bg-orange-500 absolute z-[1] rounded-full -bottom-16 left-[5%] blur-sm pointer-events-none"></div>
          <div className="w-[10rem] h-[6rem] bg-white absolute z-[1] rounded-full -bottom-8 left-[22%] opacity-60 blur-md pointer-events-none"></div>
          <div className="w-[8rem] h-[5rem] bg-white absolute z-[1] rounded-full -bottom-4 left-[10%] opacity-40 blur-sm pointer-events-none"></div>

          {/* Fluted glass vertical columns scoped strictly to left panel */}
          <div className="flex absolute inset-0 z-[2] overflow-hidden backdrop-blur-2xl pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-full flex-1 opacity-30 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, #000000 69%, rgba(255,255,255,0.3) 100%)",
                }}
              />
            ))}
          </div>

          {/* Dark gradient overlay scoped to left panel */}
          <div
            className="w-full h-full z-[3] absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.95) 100%)",
            }}
          />

          {/* Headline */}
          <h1 className="text-2xl md:text-3xl font-medium leading-tight z-10 tracking-tight relative">
            Design and dev partner for startups and founders.
          </h1>
        </div>

        {/* Right Side: Clean White Login Form */}
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center bg-white relative z-10 text-gray-900">
          <div className="flex flex-col items-start mb-8">
            <div className="text-orange-500 mb-4">
              <Sunburst className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-semibold mb-2 tracking-tight text-gray-900">
              Welcome Back
            </h2>
            <p className="text-left text-sm text-gray-500">
              Welcome back to HextaStudio — Please log in
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Your email
              </label>
              <input
                type="email"
                id="login-email"
                placeholder="hi@hextastudio.in"
                className={`text-sm w-full py-2.5 px-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 transition-colors ${
                  emailError ? "border-red-500" : "border-gray-200"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!emailError}
                aria-describedby="login-email-error"
              />
              {emailError && (
                <p id="login-email-error" className="text-red-500 text-xs mt-1">
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs text-orange-500 hover:text-orange-600 font-medium">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="login-password"
                className={`text-sm w-full py-2.5 px-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 transition-colors ${
                  passwordError ? "border-red-500" : "border-gray-200"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!passwordError}
                aria-describedby="login-password-error"
              />
              {passwordError && (
                <p id="login-password-error" className="text-red-500 text-xs mt-1">
                  {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm mt-1 cursor-pointer"
            >
              Log in to your account
            </button>

            <div className="text-center text-gray-500 text-sm mt-3">
              Don&apos;t have an account?{" "}
              <Link href="/" className="text-gray-900 font-medium underline hover:text-black">
                Sign up
              </Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
