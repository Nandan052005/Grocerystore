import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsByCategory, getProductEmoji, getCategoryColor } from "./data";
import "./CustomerDashboard.css";

export default function VegetablesPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProductsByCategory("vegetables"));
  }, []);

  return (
    <div>
      <header className="header">
        <div className="logo">JSN Stores</div>
        <div className="search-container">
          <input type="text" placeholder="🔍Search..." className="search-bar" />
        </div>
        <nav>
          <button className="signup-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="signup-btn" onClick={() => navigate("/about")}>About</button>
          <button className="signup-btn" onClick={() => navigate("/")}>Home</button>
          <button className="signup-btn" onClick={() => navigate("/signup")}>SignUp</button>
        </nav>
      </header>

      <h1 style={{ textAlign: "center", margin: "1.5rem 0", color: "#1f2937" }}>🥬 Vegetables</h1>

      <div className="shop-container">
        {products.map((item) => (
          <div key={item.pid} className="item-card">
            <div className="product-emoji-display"
              style={{ backgroundColor: getCategoryColor(item.pcategory) }}>
              <span>{getProductEmoji(item)}</span>
            </div>
            <h2>{item.pname}</h2>
            <p>Price: ₹{item.pprs}</p>
            <p>Available: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
