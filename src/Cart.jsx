import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { getProductEmoji, getCategoryColor } from "./data";

function Cart() {
  const { cart, increment, decrement } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate("/payment");
  };

  const totalBill = cart.reduce(
    (sum, item) => sum + item.quantity * item.pprs,
    0
  );

  if (cart.length === 0) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>🛒 Your cart is empty</h2>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛍️ Your Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.pid} className="cart-item-card">
            <div className="cart-emoji-display"
              style={{ backgroundColor: getCategoryColor(item.pcategory) }}>
              <span>{getProductEmoji(item)}</span>
            </div>
            <h3 className="cart-item-name">{item.pname}</h3>
            <p className="cart-item-price">Price: ₹{item.pprs}</p>
            <div className="quantity-control">
              <button onClick={() => decrement(item.pid)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increment(item.pid)}>+</button>
            </div>
            <p>Total: ₹{item.quantity * item.pprs}</p>
          </div>
        ))}
      </div>

      <div className="cart-total-section">
        <h3 className="cart-total">🧾 Total Bill: ₹{totalBill}</h3>
      </div>

      <div className="cart-action">
        <button onClick={handlePlaceOrder} className="place-order-btn">
          ✅ Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
