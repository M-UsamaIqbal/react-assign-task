import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import ProtectedRoute from "./ProtectedRoute"; // Import the Protected Route

function App() {
  return (
    <Routes>
      {/* Protect Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>

      {/* Public Authentication Routes */}
      <Route path="/auth/*" element={<Auth />} />

      {/* Redirect unknown routes to login if not authenticated, else to dashboard */}
      <Route 
        path="*" 
        element={
          localStorage.getItem("token") ? (
            <Navigate to="/dashboard/home" replace />
          ) : (
            <Navigate to="/auth/sign-in" replace />
          )
        } 
      />
    </Routes>
  );
}

export default App;
