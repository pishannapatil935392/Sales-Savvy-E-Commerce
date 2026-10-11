
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const totalItems = cart.reduce(
    (total, product) =>
      total + Number(product.cartQuantity || 1),
    0
  );

  const totalAmount = cart.reduce(
    (total, product) =>
      total +
      Number(product.price || 0) *
        Number(product.cartQuantity || 1),
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/products");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login before placing your order.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customerName: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        pincode: customer.pincode,
        totalAmount: totalAmount,
        totalItems: totalItems,
      };

      // Send order to Spring Boot backend
      const response = await API.post("/orders", orderData);

      // Use the order ID returned by the backend
      const savedOrder = response.data;

      // Clear cart only after successful order creation
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

      // Navigate to success page
      navigate("/order-success", {
        state: {
          orderId: savedOrder.orderId,
          totalAmount: savedOrder.totalAmount,
        },
      });
    } catch (err) {
      console.error("Place order error:", err);

      if (err.response) {
        setError(
          err.response.data?.message ||
            `Order failed. Server returned ${err.response.status}.`
        );
      } else {
        setError(
          "Cannot connect to the server. Please check that Spring Boot is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>💳 Checkout</h1>

        <div style={styles.checkoutContainer}>
          <div style={styles.formSection}>
            <h2>Customer Details</h2>

            {error && (
              <p style={styles.error}>
                {error}
              </p>
            )}

            <form onSubmit={handlePlaceOrder}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                style={styles.input}
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                style={styles.input}
              />

              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                style={styles.input}
              />

              <label>Address</label>
              <textarea
                name="address"
                value={customer.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
                style={styles.textarea}
              />

              <label>City</label>
              <input
                type="text"
                name="city"
                value={customer.city}
                onChange={handleChange}
                placeholder="Enter your city"
                required
                style={styles.input}
              />

              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={customer.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
                required
                style={styles.input}
              />

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.placeOrderButton,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Placing Order..." : "🛍️ Place Order"}
              </button>
            </form>
          </div>

          <div style={styles.summary}>
            <h2>Order Summary</h2>

            {cart.map((product) => (
              <div key={product.id} style={styles.product}>
                <div>
                  <strong>{product.name}</strong>
                  <p>
                    ₹{Number(product.price).toLocaleString("en-IN")} ×{" "}
                    {product.cartQuantity || 1}
                  </p>
                </div>

                <strong>
                  ₹
                  {(
                    Number(product.price || 0) *
                    Number(product.cartQuantity || 1)
                  ).toLocaleString("en-IN")}
                </strong>
              </div>
            ))}

            <hr />

            <p>
              Total Items: <strong>{totalItems}</strong>
            </p>

            <h2>
              Total: ₹{totalAmount.toLocaleString("en-IN")}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    backgroundColor: "#f5f7fb",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  checkoutContainer: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
  },
  formSection: {
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box",
    fontSize: "15px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "12px",
    marginTop: "6px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box",
    fontSize: "15px",
    resize: "vertical",
  },
  placeOrderButton: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "6px",
    fontSize: "17px",
    fontWeight: "bold",
    backgroundColor: "#1f2937",
    color: "white",
    marginTop: "10px",
  },
  summary: {
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    alignSelf: "start",
  },
  product: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "15px",
  },
  error: {
    color: "#b91c1c",
    backgroundColor: "#fee2e2",
    padding: "10px",
    borderRadius: "6px",
  },
};

export default Checkout;