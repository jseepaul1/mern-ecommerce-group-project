import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAndRegistration from "./Components/LoginAndRegistration/LoginAndRegistration";
import Dashboard from "./Components/Dashboard/Dashboard";
import AdminLoginForm from "./Components/AdminLoginForm/AdminLoginForm";
import AdminDashboard from "./pages/AdminDashboard";
import ProductForm from "./Components/AdminLoginForm/ProductForm";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import DisplayProduct from "./Components/DisplayProduct/DisplayProduct";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<AdminLoginForm />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/new"
            element={
              <ProtectedRoute>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <DisplayProduct />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<LoginAndRegistration />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
