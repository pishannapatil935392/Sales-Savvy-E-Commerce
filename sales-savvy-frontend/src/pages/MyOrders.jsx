
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get("/orders");
        setOrders(response.data);
      } catch (err) {
        console.error("Fetch orders error:", err);
        setError("Unable to load orders. Please login and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1>📦 My Orders</h1>

        {loading && <p>Loading orders...</p>}

        {error && <p style={styles.error}>{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p>No orders found.</p>
        )}

        {!loading && !error && orders.length > 0 && (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.cell}>Order ID</th>
                  <th style={styles.cell}>Date</th>
                  <th style={styles.cell}>Total Items</th>
                  <th style={styles.cell}>Amount</th>
                  <th style={styles.cell}>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td style={styles.cell}>{order.orderId}</td>
                    <td style={styles.cell}>
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleString()
                        : "N/A"}
                    </td>
                    <td style={styles.cell}>{order.totalItems}</td>
                    <td style={styles.cell}>
                      ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                    </td>
                    <td style={styles.cell}>
                      <span style={styles.status}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
  tableWrapper: {
    overflowX: "auto",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  cell: {
    padding: "14px",
    borderBottom: "1px solid #ddd",
  },
  status: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "5px 10px",
    borderRadius: "6px",
    fontWeight: "bold",
  },
  error: {
    color: "#b91c1c",
  },
};

export default MyOrders;