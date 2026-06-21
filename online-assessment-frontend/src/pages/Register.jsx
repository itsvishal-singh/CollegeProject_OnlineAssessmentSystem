import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");

  const navigate = useNavigate();

  const isMobileValid = mobile.length >= 10;

  const passwordsMatch =
    confirmPassword.length === 0 || password === confirmPassword;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    // Full name validation
    const cleanedName = fullName.trim();
    const invalidNames = ["null","nul", "test", "admin", "student"]
    if (invalidNames.includes(cleanedName.toLowerCase())) {
      setNameError("Please enter your real name");
      return;
    }
    const fullNameRegex = /^(?=.{3,50}$)[A-Za-z]+(?: [A-Za-z]+)*$/;
    if (!fullNameRegex.test(cleanedName)) {
      setNameError("Enter a valid full name");
      return;
    }
    setNameError("");
    try {
      await axios.post("http://localhost:8085/api/auth/register", {
        username,
        password,
        role: "STUDENT",
        fullName,
        mobile,
      });
      alert("Registration Successful ✅");
      navigate("/login");
    } catch (err) {
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="h-[calc(100vh-99px)] flex items-center justify-center bg-[conic-gradient(from_45deg_at_top,_var(--tw-gradient-stops))] from-purple-600 via-blue-700 to-indigo-700">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-[500px]">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          Create Student Account
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Join the Assessment Platform
        </p>

        <form onSubmit={handleRegister} className="space-y-4 font-semibold">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-xl text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="+91- Mobile Number"
            pattern="[0-9]{10,}"
            minLength={10}
            maxLength={10}
            className={`w-full border p-3 rounded-xl text-indigo-600 focus:outline-none focus:ring-2 ${
              isMobileValid
                ? "focus:ring-indigo-400"
                : "focus:ring-red-400 text-red-600"
            }`}
            value={mobile}
            onChange={(e) => {
              // Allow only digits
              const onlyDigits = e.target.value.replace(/\D/g, "");
              setMobile(onlyDigits);
            }}
            required
          />
          {mobile.length > 0 && !isMobileValid && (
            <p className="text-red-500 text-sm mt-1">
              Mobile number must be 10 digits
            </p>
          )}
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full border p-3 rounded-xl text-indigo-600 focus:outline-none focus:ring-2 ${
                passwordsMatch
                  ? "focus:ring-indigo-400"
                  : "focus:ring-red-400 border-red-400 text-red-600"
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {!passwordsMatch && (
              <p className="text-red-500 text-sm mt-1">
                Passwords do not match ❌
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!passwordsMatch || !isMobileValid}
            className={`w-full py-3 rounded-lg text-white transition duration-300 shadow-md ${
              passwordsMatch && isMobileValid
                ? "bg-indigo-600 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
