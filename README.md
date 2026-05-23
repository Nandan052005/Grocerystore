# 🛒 JSN Stores — Premium Grocery Web Application

A modern, fast, and feature-rich React e-commerce application designed for seamless grocery shopping. JSN Stores provides a complete digital storefront solution, featuring custom dashboards for **Customers**, **Managers**, and **Admins**.

---

## ✨ Key Features

### 👤 Customer Experience
* **Interactive Storefront**: Browse products by category (Fruits, Vegetables, Dairy, Spices, and more) with instantaneous searching and filtering.
* **Reactive Cart System**: Seamlessly add, increment, decrement, and remove items with real-time price calculation using React Context.
* **Modern Multi-Step Checkout**: A streamlined payment interface displaying billing info, secure payment methods (Credit Card, PayPal, Bank Transfer), and a complete live order summary sidebar.

### 💼 Manager Dashboard
* **Product Inventory Management**: Add new grocery products complete with image file uploads, pricing, custom category tagging, and stock quantities.
* **Live Catalog Control**: View and instantly delete items from the store's inventory database.

### 👑 Admin Console
* **User Permission Control**: Supervise all registered users with complete detail sheets (Emails, Usernames, Phones, Roles).
* **Dynamic Role Assignment**: Convert standard Customer accounts to Managers or vice-versa with a single click.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 18 (using Vite for ultra-fast Hot Module Replacement)
* **Routing:** React Router v7
* **State Management:** React Context API (Cart Context)
* **HTTP Client:** Axios & Fetch API
* **Icons:** Lucide React

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Nandan052005/Grocerystore.git
   cd Grocerystore
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure API Port:**
   Open `src/config.js` and set the backend API URL matching your running server port:
   ```javascript
   const config = {
     "url": "http://localhost:8081" // Adjust to your backend URL/port
   }
   export default config;
   ```

4. **Launch the Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the application.

---

## 📂 Project Structure

```text
├── src/
│   ├── assets/              # Static assets and category images
│   ├── About.jsx            # Store background, mission, and contact
│   ├── AdminDashboard.jsx   # Admin panel for user role switching
│   ├── Cart.jsx             # Cart review page with quantity adjusting
│   ├── CartContext.jsx      # Context provider handling shopping state
│   ├── config.js            # Configuration file for API URL endpoint
│   ├── CustomerDashboard.jsx# Customer shop page with filters & search
│   ├── Dairy.jsx / Fruits.jsx / Vegetables.jsx  # Category-specific landing pages
│   ├── ForgotPassword.jsx   # Reset link request interface
│   ├── Home.jsx             # Welcome page and category selection
│   ├── LoginPage.jsx        # Credentials input and role routing
│   ├── ManagerDashboard.jsx # Product manager input form and database list
│   ├── PaymentPage.jsx      # Checkout interface with detailed summary
│   ├── SignUpPage.jsx       # Customer / Admin registration page
│   ├── main.jsx             # Entry point rendering all Router paths
│   └── App.jsx              # Routing backup blueprint
├── index.html               # Main HTML entry document
├── vite.config.js           # Vite bundler configurations
└── package.json             # NPM dependencies & scripts
```
