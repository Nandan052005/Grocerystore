import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Home.css";
import { initializeData } from "./data";

import Home from "./Home.jsx";
import Fruits from "./Fruits.jsx";
import SignUpPage from "./SignUpPage.jsx";
import LoginPage from "./LoginPage.jsx";
import VegetablesPage from "./Vegetables.jsx";
import Dairy from "./Dairy.jsx";
import About from "./About.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import CustomerDashboard from "./CustomerDashboard.jsx";
import ManagerDashboard from "./ManagerDashboard.jsx";
import { CartProvider } from "./CartContext.jsx";
import Cart from "./Cart.jsx";
import PaymentPage from "./PaymentPage.jsx";

// Seed localStorage with default data on first load
initializeData();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/fruits" element={<Fruits />} />
          <Route path="/vegetables" element={<VegetablesPage />} />
          <Route path="/dairy" element={<Dairy />} />
          <Route path="/about" element={<About />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/customerdashboard" element={<CustomerDashboard />} />
          <Route path="/managerdashboard" element={<ManagerDashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
);
