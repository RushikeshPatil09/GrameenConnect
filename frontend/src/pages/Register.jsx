import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [agree, setAgree] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/users/register", {
        name: fullName,
        email,
        password,
        role: "USER" // default role
      });

      if (res.status === 200) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed. Email might already exist.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="max-w-md w-full p-8 shadow-xl rounded-2xl space-y-6">
          <h2 className="text-3xl font-bold text-center text-green-700">Create Account</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ramesh Patil"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
              />
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-1"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <label>I agree to the <a href="#" className="text-green-700 underline">terms & conditions</a>.</label>
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm text-center">{success}</p>}

            <Button disabled={!agree} type="submit" className="w-full py-2 text-lg rounded-xl">
              Register
            </Button>
          </form>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-green-700 hover:underline">
              Login
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}
