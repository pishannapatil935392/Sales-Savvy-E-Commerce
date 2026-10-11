
import { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders");
      setOrders(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Orders load ಆಗಲಿಲ್ಲ. Admin login ಪರಿಶೀಲಿಸಿ."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    setMessage("");

    try {
      const response = await API.patch(`/orders/${id}/status`, {
        status,
      });

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.id === id
            ? { ...order, status: response.data.status }
            : order
        )
      );

      setMessage(`Order status successfully updated to ${status}.`);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Status update ಆಗಲಿಲ್ಲ. Admin login ಪರಿಶೀಲಿಸಿ."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <div className="admin-orders-loading">Loading orders...</div>;
  }

  return (
    <div className="admin-orders-page">
      <div className="admin-orders-heading">
        <div>
          <p className="admin-eyebrow">SALES SAVVY ADMIN</p>
          <h1>Manage Orders</h1>
          <p className="admin-subtitle">
            View orders and manage delivery status.
          </p>
        </div>

        <div className="orders-count">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>
      </div>

      {message && (
        <div className="admin-message" role="status">
          {message}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="admin-empty">No orders found.</div>
      ) : (
        <div className="admin-orders-card">
          <div className="admin-table-scroll">
            <table className="admin-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Items</th>
                  <th>Current Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span className="order-id">{order.orderId}</span>
                    </td>

                    <td className="customer-name">
                      {order.customerName}
                    </td>

                    <td>{order.email}</td>

                    <td className="order-amount">
                      ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                    </td>

                    <td>{order.totalItems}</td>

                    <td>
                      <span
                        className={`status-badge status-${(
                          order.status || "PLACED"
                        ).toLowerCase()}`}
                      >
                        <span className="status-dot"></span>
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <select
                        className={`status-select status-select-${(
                          order.status || "PLACED"
                        ).toLowerCase()}`}
                        value={order.status}
                        disabled={updatingId === order.id}
                        onChange={(event) =>
                          updateStatus(order.id, event.target.value)
                        }
                        aria-label={`Update status for ${order.orderId}`}
                      >
                        <option value="PLACED">🟡 Placed</option>
                        <option value="SHIPPED">🔵 Shipped</option>
                        <option value="DELIVERED">🟢 Delivered</option>
                        <option value="CANCELLED">🔴 Cancelled</option>
                      </select>

                      {updatingId === order.id && (
                        <span className="updating-text">Updating...</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;