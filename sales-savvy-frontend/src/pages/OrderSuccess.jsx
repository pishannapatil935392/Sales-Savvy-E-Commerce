import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId =
    location.state?.orderId || "SS" + Date.now();

  const totalAmount =
    location.state?.totalAmount || 0;

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.card}>

          <div style={styles.successIcon}>
            ✓
          </div>

          <h1 style={styles.title}>
            Order Placed Successfully!
          </h1>

          <p style={styles.message}>
            Thank you for shopping with Sales Savvy.
          </p>

          <div style={styles.orderBox}>
            <p>
              <strong>Order ID:</strong>
            </p>

            <h2 style={styles.orderId}>
              {orderId}
            </h2>

            <p>
              <strong>Total Amount:</strong>
            </p>

            <h2>
              ₹{totalAmount}
            </h2>
          </div>

          <p style={styles.info}>
            Your order has been successfully placed.
          </p>

          <div style={styles.buttons}>

            <button
              style={styles.shopButton}
              onClick={() => navigate("/products")}
            >
              🛍️ Continue Shopping
            </button>

            <button
              style={styles.homeButton}
              onClick={() => navigate("/products")}
            >
              🏠 Back to Products
            </button>

          </div>

        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "50px 20px",
    backgroundColor: "#f5f7fb",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.12)",
  },

  successIcon: {
    width: "80px",
    height: "80px",
    margin: "0 auto 20px",
    borderRadius: "50%",
    backgroundColor: "#22c55e",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "50px",
    fontWeight: "bold",
  },

  title: {
    fontSize: "30px",
    marginBottom: "10px",
  },

  message: {
    fontSize: "17px",
    color: "#666",
  },

  orderBox: {
    marginTop: "25px",
    padding: "20px",
    backgroundColor: "#f8fafc",
    borderRadius: "10px",
  },

  orderId: {
    margin: "5px 0 20px",
  },

  info: {
    marginTop: "20px",
    color: "#555",
  },

  buttons: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    marginTop: "25px",
  },

  shopButton: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "#1f2937",
    color: "white",
  },

  homeButton: {
    padding: "12px 20px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "white",
  },
};

export default OrderSuccess;