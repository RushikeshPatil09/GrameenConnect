import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  LogOut,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  //  Helper to convert lat/lng to address
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const data = await res.json();
      return data.results[0]?.formatted_address || "Unknown location";
    } catch (error) {
      console.error("Geocoding error:", error);
      return "Unknown location";
    }
  };

  // Fetch complaints with geocoding if needed
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/complaints/all");
        const data = await res.json();

        const withLocations = await Promise.all(
          data.map(async (c) => {
            if (!c.location && c.latitude && c.longitude) {
              const address = await getAddressFromCoordinates(c.latitude, c.longitude);
              return { ...c, location: address };
            }
            return c;
          })
        );

        setComplaints(withLocations.reverse());
      } catch (err) {
        console.error(" Failed to fetch complaints:", err);
      }
    };
    fetchComplaints();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleStatusUpdate = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/complaints/updateStatus/${id}`,
        { method: "PUT" }
      );
      if (res.ok) {
        const updated = complaints.map((c) =>
          c.id === id ? { ...c, status: "Resolved" } : c
        );
        setComplaints(updated);
        alert(" Complaint marked as resolved!");
      } else {
        alert(" Failed to update status");
      }
    } catch (err) {
      console.error("Update error", err);
    }
  };

  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const pending = complaints.filter((c) => c.status === "Pending").length;

  const filtered = complaints
    .filter((c) =>
      filterStatus === "All" ? true : c.status === filterStatus
    )
    .filter((c) => {
      const name = c.name?.toLowerCase() ?? "";
      const category = c.category?.toLowerCase() ?? "";
      const q = search.toLowerCase();
      return name.includes(q) || category.includes(q);
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 text-gray-800">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-800">
              🧑‍💼 Admin Dashboard
            </h1>
            <p className="text-gray-600">Managing all complaints effectively</p>
          </div>
          <Button onClick={handleLogout} variant="destructive">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 bg-white shadow-md text-center">
            <h3 className="text-xl font-bold text-green-800"> Total</h3>
            <p className="text-2xl mt-2">{total}</p>
          </Card>
          <Card className="p-5 bg-white shadow-md text-center">
            <h3 className="text-xl font-bold text-yellow-600"> Pending</h3>
            <p className="text-2xl mt-2">{pending}</p>
          </Card>
          <Card className="p-5 bg-white shadow-md text-center">
            <h3 className="text-xl font-bold text-green-700"> Resolved</h3>
            <p className="text-2xl mt-2">{resolved}</p>
          </Card>
        </div>

        {/* Filter + Search */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center mt-8">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-green-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-green-600 rounded-lg px-3 py-1 focus:outline-none"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full md:w-72">
            <Search className="text-green-700 h-5 w-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or title"
              className="border border-gray-300 px-3 py-1 rounded-md w-full"
            />
          </div>
        </div>

        {/* Complaints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {filtered.length === 0 ? (
            <p className="text-gray-500 text-lg">No complaints found.</p>
          ) : (
            filtered.map((c, index) => (
              <Card
                key={index}
                className="p-5 bg-white rounded-xl shadow-md border-l-4 border-green-600"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-green-800">
                    {c.category}
                  </h3>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      c.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <p className="text-gray-700 mt-2">{c.message}</p>

                <div className="flex items-center gap-2 text-sm mt-3 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{c.location || "Not specified"}</span>
                </div>

                {c.imageUrl && (
                  <img
                    src={c.imageUrl}
                    alt="issue"
                    className="mt-4 rounded-lg border max-h-48 object-cover w-full"
                  />
                )}

                <div className="mt-4 text-right">
                  {c.status === "Pending" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(c.id)}
                    >
                      <AlertCircle className="h-4 w-4 mr-1" /> Mark as Resolved
                    </Button>
                  ) : (
                    <Button size="sm" variant="default" disabled>
                      <CheckCircle className="h-4 w-4 mr-1" /> Resolved
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
