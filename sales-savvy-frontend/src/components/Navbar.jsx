
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("role");

  const isAdmin =
    role === "ADMIN" || role === "ROLE_ADMIN";

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      setCartCount(
        cart.reduce(
          (total, product) =>
            total + Number(product.cartQuantity || 1),
          0
        )
      );
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");

    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      {/* LOGO */}
      <div
        style={styles.logo}
        onClick={() => navigate("/products")}
      >
        🛍️ Sales Savvy
      </div>

      {/* RIGHT SECTION */}
      <div style={styles.rightSection}>
        <span style={styles.user}>
          Hello, {userName || "User"}
        </span>

        <span style={styles.role}>
          {role || "USER"}
        </span>

        {/* ADMIN DASHBOARD - ADMIN ONLY */}
        {isAdmin && (
          <button
            style={styles.adminButton}
            onClick={() => navigate("/admin/dashboard")}
          >
            📊 Admin Dashboard
          </button>
        )}

        {/* ADMIN ORDERS - ADMIN ONLY */}
        {isAdmin && (
          <button
            style={styles.button}
            onClick={() => navigate("/admin/orders")}
          >
            📋 Manage Orders
          </button>
        )}

        {/* MY ORDERS BUTTON */}
        <button
          style={styles.button}
          onClick={() => navigate("/my-orders")}
        >
          📦 My Orders
        </button>

        {/* CART BUTTON */}
        <button
          style={styles.cartButton}
          onClick={() => navigate("/cart")}
        >
          🛒 Cart
          <span style={styles.cartCount}>
            {cartCount}
          </span>
        </button>

        {/* LOGOUT BUTTON */}
        <button
          style={styles.button}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    minHeight: "65px",
    padding: "10px 30px",
    backgroundColor: "#1f2937",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    boxSizing: "border-box",
  },

  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  user: {
    fontSize: "16px",
  },

  role: {
    padding: "5px 10px",
    borderRadius: "15px",
    backgroundColor: "#374151",
    fontSize: "13px",
  },

  adminButton: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "#4f46e5",
    color: "white",
  },

  cartButton: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "white",
    color: "#1f2937",
  },

  cartCount: {
    marginLeft: "6px",
    backgroundColor: "#ef4444",
    color: "white",
    borderRadius: "50%",
    padding: "3px 7px",
    fontSize: "12px",
  },

  button: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "#374151",
    color: "white",
  },
};

export default Navbar;
