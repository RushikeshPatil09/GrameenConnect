import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      const role = res.data;

      if (role === "INVALID") {
        setError("Invalid email or password.");
      } else {
        // Inside login success:
localStorage.setItem("token", "dummy-token");
localStorage.setItem("role", role);
localStorage.setItem("email", res.data.email); // Add this if backend sends email
localStorage.setItem("name", res.data.name);   // Optional

        if (role === "ADMIN") {
          navigate("/admin/dashboard");
        } else if (role === "USER") {
          navigate("/user/dashboard");
        } else {
          setError("Unknown role.");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="max-w-md w-full p-8 shadow-xl rounded-2xl space-y-6 border border-green-200">
          <h2 className="text-3xl font-bold text-center text-green-700">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-green-700">Email</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@village.com"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-green-700">Password</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="mt-1"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full py-2 text-lg rounded-xl"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <a href="/register" className="text-green-700 font-medium hover:underline">
              Register here
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}
