// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReportIssue from "./pages/ReportIssue";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chatbot from "./pages/Chatbot";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ComplaintDetails from "./pages/ComplaintDetails";
import UserIssues from "./pages/UserIssues";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatbot" element={<Chatbot />} />

        {/* Protected USER Routes */}
        <Route
          path="/report"
          element={
            <ProtectedRoute role="USER">
              <ReportIssue />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/issues"
          element={
            <ProtectedRoute role="USER">
              <UserIssues />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Both can view complaints */}
        <Route
          path="/:id"
          element={
            <ProtectedRoute>
              <ComplaintDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
