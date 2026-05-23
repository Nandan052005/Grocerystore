import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./PaymentPage.css";

function PaymentPage() {
  const { cart, placeOrder } = useContext(CartContext);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    saveInfo: false
  });

  const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.pprs, 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder();
    navigate("/customerdashboard");
  };

  return (
    <div className="payment-page">
      <div className="payment-header">
        <Link to="/" className="brand-logo">JSN Stores</Link>
        <div className="payment-steps">
          <div className="step completed">Cart</div>
          <div className="step-divider"></div>
          <div className="step active">Payment</div>
          <div className="step-divider"></div>
          <div className="step">Confirmation</div>
        </div>
        <Link to="/cart" className="back-link">
          ← Back to Cart
        </Link>
      </div>

      <div className="payment-content">
        <div className="payment-form-container">
          <h2>Payment Details</h2>

          <div className="payment-methods">
            <div 
              className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('card')}
            >
              <span className="method-icon">💳</span>
              <span>Credit Card</span>
            </div>
            <div 
              className={`payment-method ${paymentMethod === 'paypal' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('paypal')}
            >
              <span className="method-icon">🅿️</span>
              <span>PayPal</span>
            </div>
            <div 
              className={`payment-method ${paymentMethod === 'bank' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('bank')}
            >
              <span className="method-icon">🏦</span>
              <span>Bank Transfer</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            {paymentMethod === 'card' && (
              <div className="card-details">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardName">Name on Card</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                </div>

                <div className="form-row two-columns">
                  <div className="form-group">
                    <label htmlFor="expiry">Expiry Date</label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="paypal-info">
                <p>You will be redirected to PayPal to complete your purchase securely.</p>
                <div className="paypal-logo">PayPal</div>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="bank-info">
                <p>Use these details to make a bank transfer:</p>
                <div className="bank-details">
                  <p><strong>Bank:</strong> JSN National Bank</p>
                  <p><strong>Account Name:</strong> JSN Stores Ltd</p>
                  <p><strong>Account Number:</strong> 1234567890</p>
                  <p><strong>Sort Code:</strong> 12-34-56</p>
                  <p><strong>Reference:</strong> Your email address</p>
                </div>
              </div>
            )}

            <div className="billing-section">
              <h3>Billing Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Example Street"
                    required
                  />
                </div>
              </div>

              <div className="form-row two-columns">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="123456"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group checkbox">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="saveInfo">Save my information for faster checkout next time</label>
                </div>
              </div>
            </div>

            <button type="submit" className="pay-button">Complete Payment</button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cart.map((item) => (
              <div key={item.pid} className="order-item">
                <div className="item-info">
                  <span className="item-quantity">x{item.quantity}</span>
                  <span className="item-name">{item.pname}</span>
                </div>
                <span className="item-price">₹{item.pprs * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="price-breakdown">
            <div className="price-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="price-row">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="price-row">
              <span>Estimated Tax</span>
              <span>₹{tax}</span>
            </div>
            <div className="price-row total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <div className="secure-checkout">
            <span className="secure-icon">🔒</span>
            <p>Secure SSL Encrypted Checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;