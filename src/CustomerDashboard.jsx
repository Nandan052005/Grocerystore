import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./CustomerDashboard.css";
import { CartContext } from "./CartContext";
import { getProducts, getProductEmoji, getCategoryColor } from "./data";

const CustomerDashboard = () => {
  const { addToCart } = useContext(CartContext);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [customerName, setCustomerName] = useState("Account");

  useEffect(() => {
    setItems(getProducts());
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCustomerName(user.name || "Customer");
    }
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`${item.pname} has been added to the cart.`);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.pname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pcategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ||
      item.pcategory.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [
    ...new Set(items.map((item) => item.pcategory.toLowerCase())),
  ];

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">JSN Stores</Link>
        </div>
        <div className="center-controls">
          <input
            type="text" placeholder="🔍 Search here"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select className="category-dropdown" value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <ul className="menu">
          <li><Link className="nav-link" to="/">Home</Link></li>
          <li><Link className="nav-link" to="/customerdashboard">Shop</Link></li>
          <li><Link className="nav-link" to="/cart">🛒 Cart</Link></li>
          <li><span className="nav-link">{customerName}</span></li>
        </ul>
      </nav>

      <div className="shop-container">
        {filteredItems.map((item) => (
          <div key={item.pid} className="item-card">
            <div className="product-emoji-display"
              style={{ backgroundColor: getCategoryColor(item.pcategory) }}>
              <span>{getProductEmoji(item)}</span>
            </div>
            <h2>{item.pname}</h2>
            <p>Price: ₹{item.pprs}</p>
            <p>Category: {item.pcategory}</p>
            <p>Available: {item.quantity}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
