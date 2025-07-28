import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function UserIssues() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("email");
      try {
        const res = await fetch("http://localhost:8080/api/complaints/all");
        const data = await res.json();
        const filtered = data.filter((c) => c.email === email);
        setComplaints(filtered.reverse());
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-4">
        {/* ✅ Back Button */}
        <Button
          className="mb-6 bg-green-700 text-white"
          onClick={() => navigate("/user/dashboard")}
        >
          ← Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold text-green-800 mb-6">📋 All Your Complaints</h1>

        {complaints.length === 0 ? (
          <p className="text-gray-600">You haven’t submitted any complaints yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {complaints.map((c, index) => (
              <Card key={index} className="p-5 border-l-4 border-green-600">
                <h3 className="font-bold text-lg">{c.category}</h3>
                <p className="text-gray-700 text-sm mt-1">{c.message}</p>
                <div className="flex items-center justify-between mt-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{c.location || "Not specified"}</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      c.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                {c.imageUrl && (
                  <img
                    src={c.imageUrl}
                    alt="Issue"
                    className="mt-4 w-full h-40 object-cover rounded-lg border"
                  />
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
