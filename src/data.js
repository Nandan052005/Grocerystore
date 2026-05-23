// ============================================================
// data.js — Local data layer (replaces all backend API calls)
// All data is stored in localStorage for persistence
// ============================================================

// ---- Default seed data ----
const DEFAULT_PRODUCTS = [
  { pid: 1, pname: "Apple", pprs: 120, pcategory: "fruits", quantity: 50 },
  { pid: 2, pname: "Banana", pprs: 40, pcategory: "fruits", quantity: 100 },
  { pid: 3, pname: "Orange", pprs: 80, pcategory: "fruits", quantity: 60 },
  { pid: 4, pname: "Mango", pprs: 150, pcategory: "fruits", quantity: 30 },
  { pid: 5, pname: "Grapes", pprs: 90, pcategory: "fruits", quantity: 45 },
  { pid: 6, pname: "Tomato", pprs: 30, pcategory: "vegetables", quantity: 80 },
  { pid: 7, pname: "Potato", pprs: 25, pcategory: "vegetables", quantity: 200 },
  { pid: 8, pname: "Onion", pprs: 35, pcategory: "vegetables", quantity: 150 },
  { pid: 9, pname: "Carrot", pprs: 45, pcategory: "vegetables", quantity: 70 },
  { pid: 10, pname: "Spinach", pprs: 20, pcategory: "vegetables", quantity: 90 },
  { pid: 11, pname: "Milk (1L)", pprs: 55, pcategory: "dairy", quantity: 100 },
  { pid: 12, pname: "Cheese", pprs: 200, pcategory: "dairy", quantity: 40 },
  { pid: 13, pname: "Butter", pprs: 250, pcategory: "dairy", quantity: 30 },
  { pid: 14, pname: "Yogurt", pprs: 35, pcategory: "dairy", quantity: 90 },
  { pid: 15, pname: "Paneer", pprs: 180, pcategory: "dairy", quantity: 50 },
  { pid: 16, pname: "Turmeric", pprs: 100, pcategory: "spices", quantity: 50 },
  { pid: 17, pname: "Chili Powder", pprs: 80, pcategory: "spices", quantity: 60 },
  { pid: 18, pname: "Cumin Seeds", pprs: 120, pcategory: "spices", quantity: 40 },
  { pid: 19, pname: "Black Pepper", pprs: 200, pcategory: "spices", quantity: 35 },
  { pid: 20, pname: "Coriander", pprs: 60, pcategory: "spices", quantity: 55 },
];

const DEFAULT_USERS = [
  { name: "Admin", email: "admin@jsnstores.com", password: "admin123", role: "Admin", phno: "9999999999" },
  { name: "Manager", email: "manager@jsnstores.com", password: "manager123", role: "Manager", phno: "8888888888" },
  { name: "Customer", email: "customer@jsnstores.com", password: "customer123", role: "Customer", phno: "7777777777" },
];

// ---- Emoji map for product display ----
const PRODUCT_EMOJIS = {
  'Apple': '🍎', 'Banana': '🍌', 'Orange': '🍊', 'Mango': '🥭', 'Grapes': '🍇',
  'Tomato': '🍅', 'Potato': '🥔', 'Onion': '🧅', 'Carrot': '🥕', 'Spinach': '🥬',
  'Milk (1L)': '🥛', 'Cheese': '🧀', 'Butter': '🧈', 'Yogurt': '🫙', 'Paneer': '🧈',
  'Turmeric': '🌿', 'Chili Powder': '🌶️', 'Cumin Seeds': '🫚', 'Black Pepper': '⚫', 'Coriander': '🌿',
};

const CATEGORY_EMOJIS = {
  fruits: '🍎', vegetables: '🥬', dairy: '🥛', spices: '🌶️',
};

const CATEGORY_COLORS = {
  fruits: '#fee2e2',
  vegetables: '#dcfce7',
  dairy: '#dbeafe',
  spices: '#fef3c7',
};

// ---- Initialize on first load ----
export function initializeData() {
  if (!localStorage.getItem('jsn_products')) {
    localStorage.setItem('jsn_products', JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem('jsn_users')) {
    localStorage.setItem('jsn_users', JSON.stringify(DEFAULT_USERS));
  }
}

// ---- Products CRUD ----
export function getProducts() {
  const data = localStorage.getItem('jsn_products');
  return data ? JSON.parse(data) : [];
}

export function getProductsByCategory(category) {
  return getProducts().filter(p => p.pcategory.toLowerCase() === category.toLowerCase());
}

export function addProduct(product) {
  const products = getProducts();
  const newPid = products.length > 0 ? Math.max(...products.map(p => p.pid)) + 1 : 1;
  const newProduct = { ...product, pid: newPid };
  products.push(newProduct);
  localStorage.setItem('jsn_products', JSON.stringify(products));
  return newProduct;
}

export function deleteProduct(pid) {
  const products = getProducts().filter(p => p.pid !== pid);
  localStorage.setItem('jsn_products', JSON.stringify(products));
}

// ---- Users CRUD ----
export function getUsers() {
  const data = localStorage.getItem('jsn_users');
  return data ? JSON.parse(data) : [];
}

export function signupUser(user) {
  const users = getUsers();
  if (users.find(u => u.email === user.email)) {
    throw new Error('An account with this email already exists.');
  }
  users.push(user);
  localStorage.setItem('jsn_users', JSON.stringify(users));
  return user;
}

export function loginUser(email, password) {
  const users = getUsers();
  return users.find(u => u.email === email && u.password === password) || null;
}

export function checkEmail(email) {
  return getUsers().some(u => u.email === email);
}

export function resetPassword(email, newPassword) {
  const users = getUsers();
  const idx = users.findIndex(u => u.email === email);
  if (idx === -1) return false;
  users[idx].password = newPassword;
  localStorage.setItem('jsn_users', JSON.stringify(users));
  return true;
}

export function updateUserRole(email, newRole) {
  const users = getUsers();
  const idx = users.findIndex(u => u.email === email);
  if (idx === -1) return false;
  users[idx].role = newRole;
  localStorage.setItem('jsn_users', JSON.stringify(users));
  return true;
}

// ---- Display helpers ----
export function getProductEmoji(product) {
  return PRODUCT_EMOJIS[product.pname] || CATEGORY_EMOJIS[product.pcategory?.toLowerCase()] || '🛒';
}

export function getCategoryColor(category) {
  return CATEGORY_COLORS[category?.toLowerCase()] || '#f3f4f6';
}
