
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Default page */}
        <Route
          path="/"
          element={<Navigate to="/products" replace />}
        />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Products */}
        <Route path="/products" element={<Products />} />

        {/* Shopping Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Checkout */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* Customer Orders */}
        <Route path="/my-orders" element={<MyOrders />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        {/* Admin Orders Management */}
        <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/products" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
