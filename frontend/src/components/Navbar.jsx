import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setRole(storedRole || "");
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLogoClick = () => {
    const role = localStorage.getItem("role");
    if (role === "admin") navigate("/admin");
    else if (role === "user") navigate("/user");
    else navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1
          onClick={handleLogoClick}
          className="text-2xl font-bold text-green-700 cursor-pointer"
        >
          GrameenConnect
        </h1>

        <div className="space-x-4 hidden md:flex items-center">
          <Button variant="ghost">
            <a href="/">Home</a>
          </Button>
          <Button variant="ghost">
            <a href="/report">Report</a>
          </Button>
          <Button variant="ghost">
            <a href="/chatbot">Chatbot</a>
          </Button>

          {isLoggedIn ? (
            <>
              <span className="text-green-700 font-medium">
                Hi, {role.charAt(0).toUpperCase() + role.slice(1)}
              </span>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Button>
              <a href="/login">Login</a>
            </Button>
          )}
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden">
          <Menu className="w-6 h-6 text-green-700" />
        </div>
      </div>
    </nav>
  );
}
