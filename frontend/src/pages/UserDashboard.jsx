import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, PlusCircle, LogOut, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch user info from localStorage
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name") || "User";
    setUserName(name);

    // Fetch user complaints
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/complaints/all");
        const data = await res.json();
        const filtered = data.filter(c => c.email === email);
        setComplaints(filtered.reverse()); // recent first
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-50 via-white to-green-100 text-gray-800">
      <Navbar />

      <div className="max-w-5xl mx-auto py-12 px-4 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-800">👨‍🌾 Welcome, {userName}!</h1>
            <p className="text-gray-600">Here's a quick overview of your activities</p>
          </div>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 w-5 h-5" />
            Logout
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            onClick={() => navigate("/report")}
            className="p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
          >
            <PlusCircle className="text-green-600 w-8 h-8 mb-2" />
            <h2 className="font-semibold text-lg">Report New Issue</h2>
            <p className="text-sm text-gray-600">Raise a new village complaint with details and image.</p>
          </Card>

          <Card
            onClick={() => navigate("/user/issues")}
            className="p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
          >
            <FileText className="text-green-600 w-8 h-8 mb-2" />
            <h2 className="font-semibold text-lg">View All Complaints</h2>
            <p className="text-sm text-gray-600">Track your previously submitted issues and statuses.</p>
          </Card>


          <Card
            onClick={() => navigate("/report")} // same as report form
            className="p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition-all bg-green-100 border border-green-200"
          >
            <MapPin className="text-green-700 w-8 h-8 mb-2" />
            <h2 className="font-semibold text-lg">Location Based Support</h2>
            <p className="text-sm text-gray-700">
              Submit issues with GPS and image for faster redressal.
            </p>
          </Card>

        </div>

        {/* Recent Complaints */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">📋 Recent Complaints</h2>

          {complaints.length === 0 ? (
            <p className="text-gray-600">No complaints found. Start by reporting one.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {complaints.slice(0, 4).map((c, index) => (
                <Card key={index} className="p-5 border-l-4 border-green-600">
                  <h3 className="font-bold text-lg">{c.category}</h3>
                  <p className="text-gray-700 text-sm mt-1">{c.message}</p>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <span className="text-gray-500">{c.location || "No location"}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${c.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                        }`}
                    >
                      {c.status}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
