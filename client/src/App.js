import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAndRegistration from "./Components/LoginAndRegistration/LoginAndRegistration";
import Dashboard from "./Components/Dashboard/Dashboard";
import AdminLoginForm from "./Components/AdminLoginForm/AdminLoginForm";
import AdminDashboard from "./pages/AdminDashboard";
import ProductForm from "./Components/AdminLoginForm/ProductForm";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<AdminLoginForm />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/product/new" element={<ProductForm />} />
          <Route path="/" element={<LoginAndRegistration />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
