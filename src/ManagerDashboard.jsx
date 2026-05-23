import { useState, useEffect } from "react";
import "./ManagerDashboard.css";
import { getProducts, addProduct, deleteProduct, getProductEmoji, getCategoryColor } from "./data";

export default function ManagerDashboard() {
  const [form, setForm] = useState({
    pname: "",
    pprs: "",
    pcategory: "",
    quantity: "",
  });
  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setItems(getProducts());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.pname || !form.pprs || !form.pcategory || !form.quantity) {
      setErrorMsg("All fields are required.");
      return;
    }

    const newProduct = addProduct({
      pname: form.pname,
      pprs: Number(form.pprs),
      pcategory: form.pcategory.toLowerCase(),
      quantity: Number(form.quantity),
    });

    setItems([...items, newProduct]);
    setForm({ pname: "", pprs: "", pcategory: "", quantity: "" });
    setErrorMsg("");
    setSuccessMsg(`"${newProduct.pname}" added successfully!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleDelete = (pid) => {
    deleteProduct(pid);
    setItems(items.filter(item => item.pid !== pid));
    setSuccessMsg("Item deleted.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="dashboard-container">
      <h1>Manager Dashboard</h1>

      <form onSubmit={handleSubmit} className="dashboard-form">
        <input name="pname" placeholder="Product Name" value={form.pname} onChange={handleChange} required />
        <input name="pprs" placeholder="Price (₹)" type="number" value={form.pprs} onChange={handleChange} required />
        <input name="pcategory" placeholder="Category" value={form.pcategory} onChange={handleChange} required />
        <input name="quantity" placeholder="Quantity" type="number" value={form.quantity} onChange={handleChange} required />
        <button type="submit">Add Item</button>
      </form>

      {errorMsg && <p className="error-message">{errorMsg}</p>}
      {successMsg && <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '1rem' }}>{successMsg}</p>}

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Icon</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.pid}>
              <td>{item.pid}</td>
              <td>{item.pname}</td>
              <td>
                <span style={{
                  fontSize: '1.5rem',
                  display: 'inline-block',
                  width: '40px', height: '40px',
                  lineHeight: '40px', textAlign: 'center',
                  borderRadius: '8px',
                  backgroundColor: getCategoryColor(item.pcategory)
                }}>
                  {getProductEmoji(item)}
                </span>
              </td>
              <td>₹{item.pprs}</td>
              <td>{item.pcategory}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleDelete(item.pid)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
