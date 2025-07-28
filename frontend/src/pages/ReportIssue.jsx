import React, { useState } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    name: localStorage.getItem("name") || "",
    title: "",
    description: "",
    location: "",
    image: null,
  });

  const [coords, setCoords] = useState({ lat: "", lng: "" });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // 🌍 Detect user location and convert to city/state
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setStatus("Detecting your location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });

        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const place = res.data.address;
          const locationText = `${place.village || place.town || place.city || place.county || "Unknown"}, ${place.state || ""}`;
          setFormData((prev) => ({ ...prev, location: locationText }));
          setStatus("📍 Location detected successfully!");
        } catch (err) {
          console.error("Reverse geocoding failed", err);
          setFormData((prev) => ({
            ...prev,
            location: `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`
          }));
          setStatus("⚠️ Detected coordinates only.");
        }
      },
      () => {
        alert("Unable to retrieve your location.");
        setStatus("❌ Location access denied.");
      }
    );
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";
    if (formData.image) {
      const imageData = new FormData();
      imageData.append("image", formData.image);
      try {
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=11a042c922bb7d52d52ca156acfc72b1`,
          imageData
        );
        imageUrl = res.data.data.url;
      } catch (err) {
        console.error("Image upload failed", err);
        alert("Image upload failed. Please try again.");
        setLoading(false);
        return;
      }
    }

    try {
      await axios.post("http://localhost:8080/api/complaints/submit", {
        name: formData.name,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        imageUrl,
        email: localStorage.getItem("email"),
      });

      alert("✅ Issue submitted successfully!");
      setFormData({
        name: "",
        title: "",
        description: "",
        location: "",
        image: null,
      });
      setPreviewImage(null);
    } catch (err) {
      console.error("Error submitting complaint", err);
      alert("❌ Failed to submit issue. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 border border-green-200 dark:border-green-700 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-6">
          📢 Report an Issue
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-gray-800 dark:text-gray-100">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="title"
            placeholder="Issue Title"
            className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Describe the issue"
            className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm resize-none min-h-[100px]"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              type="text"
              name="location"
              placeholder="Location (or detect below)"
              className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm pr-12"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={detectLocation}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition"
              title="Detect my location"
            >
              <MapPin className="w-6 h-6" />
            </button>
          </div>

          {status && <p className="text-sm text-green-600 dark:text-green-300">{status}</p>}

          {coords.lat && coords.lng && (
            <div className="rounded-xl overflow-hidden border mt-2 shadow-md">
              <iframe
                title="Location Map"
                width="100%"
                height="200"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          )}

          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full border p-3 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />

          {previewImage && (
            <div className="text-center">
              <img
                src={previewImage}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg mx-auto mt-2 border shadow-md"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white p-3 rounded-xl font-semibold tracking-wide shadow-lg transition"
          >
            {loading ? "Submitting..." : "🚀 Submit Issue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
