import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { MapPin, Bot, MessageSquare, ArrowRight } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const email = localStorage.getItem("email");
    setIsLoggedIn(!!email); // set to true if email exists
  }, []);

  const handleReportClick = () => {
    if (isLoggedIn) {
      navigate("/report");
    } else {
      navigate("/Login");
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-100 via-white to-green-50 text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-green-800">GrameenConnect</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Empowering villages by resolving issues through smart technology.
        </p>
        <Button onClick={handleReportClick} className="text-lg px-6 py-4 rounded-xl">
          Report an Issue
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-12 text-green-800">Key Features</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div
            onClick={handleReportClick}
            className="p-6 rounded-2xl shadow-xl bg-green-50 text-center cursor-pointer hover:scale-105 transition-transform"
          >
            <MapPin className="h-12 w-12 mx-auto text-green-700 mb-4" />
            <h3 className="text-xl font-bold mb-2">Geo-tagged Reporting</h3>
            <p>Citizens can report issues with GPS & photos.</p>
          </div>
          <div
            onClick={handleReportClick}
            className="p-6 rounded-2xl shadow-xl bg-green-50 text-center cursor-pointer hover:scale-105 transition-transform"
          >
            <Bot className="h-12 w-12 mx-auto text-green-700 mb-4" />
            <h3 className="text-xl font-bold mb-2">Chatbot Assistance</h3>
            <p>Interactive chatbot for simple complaint registration.</p>
          </div>
          <div
            onClick={handleReportClick}
            className="p-6 rounded-2xl shadow-xl bg-green-50 text-center cursor-pointer hover:scale-105 transition-transform"
          >
            <MessageSquare className="h-12 w-12 mx-auto text-green-700 mb-4" />
            <h3 className="text-xl font-bold mb-2">SMS Alerts</h3>
            <p>Stay informed via real-time SMS notifications.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center bg-green-600 text-white">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Join the Movement</h2>
        <p className="mb-6 text-lg">Let’s make every village smarter and connected.</p>
        <Button
          variant="secondary"
          className="text-lg px-6 py-4 rounded-xl"
          onClick={handleReportClick}
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>
    </div>
  );
}
