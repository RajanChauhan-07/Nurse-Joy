"use client";

import { SunIcon as Sunburst } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import nurseJoyImg from "@/assets/nurse-joy-greeting.jpeg";

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
        
        {/* Left Side: Nurse Joy Greeting Hero Artwork */}
        <div className="relative md:w-1/2 min-h-[480px] overflow-hidden bg-[#fdf2f4] flex items-center justify-center">
          <Image
            src={nurseJoyImg}
            alt="Nurse Joy Greeting"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Right Side: Clean White Login Form */}
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center bg-white relative z-10 text-gray-900">
          <div className="flex flex-col items-start mb-8">
            <div className="text-[#e66f92] mb-4">
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Your email
              </label>
              <input
                type="email"
                id="email"
                placeholder="hi@hextastudio.in"
                className={`text-sm w-full py-2.5 px-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e66f92] bg-white text-gray-900 transition-colors ${
                  emailError ? "border-red-500" : "border-gray-200"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!emailError}
                aria-describedby="email-error"
              />
              {emailError && (
                <p id="email-error" className="text-red-500 text-xs mt-1">
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs text-[#e66f92] hover:text-[#d4597d] font-medium">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                className={`text-sm w-full py-2.5 px-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e66f92] bg-white text-gray-900 transition-colors ${
                  passwordError ? "border-red-500" : "border-gray-200"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!passwordError}
                aria-describedby="password-error"
              />
              {passwordError && (
                <p id="password-error" className="text-red-500 text-xs mt-1">
                  {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#e66f92] hover:bg-[#d4597d] active:bg-[#c24a6e] text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm mt-1 cursor-pointer"
            >
              Log in to your account
            </button>

            <div className="text-center text-gray-500 text-sm mt-3">
              Don&apos;t have an account?{" "}
              <Link href="/" className="text-gray-900 font-medium underline hover:text-[#e66f92]">
                Sign up
              </Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default FullScreenLogin;
