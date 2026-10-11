
import { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        if (err.response?.status === 401 ||
            err.response?.status === 403) {
          setError("Access denied. Please login again as Admin.");
        } else {
          setError("Orders load ಆಗಲಿಲ್ಲ. Backend running ಇದೆಯೇ ಪರಿಶೀಲಿಸಿ.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "PLACED"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "SHIPPED"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "DELIVERED"
  ).length;

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: "📦",
      description: "All customer orders",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: "💰",
      description: "Order value before refunds",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: "⏳",
      description: "Awaiting shipment",
    },
    {
      title: "Shipped Orders",
      value: shippedOrders,
      icon: "🚚",
      description: "On the way to customers",
    },
    {
      title: "Delivered Orders",
      value: deliveredOrders,
      icon: "✅",
      description: "Successfully delivered",
    },
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-spinner"></div>
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>⚠️ Dashboard Error</h2>
        <p>{error}</p>
        <button
          className="dashboard-retry"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="admin-dashboard">
      {/* Dashboard Heading */}
      <header className="dashboard-heading">
        <div>
          <p className="dashboard-eyebrow">SALES SAVVY ADMIN</p>
          <h1>Admin Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome! Here is your store's order overview.
          </p>
        </div>

        <div className="dashboard-date">
          📅 {new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      </header>

      {/* Statistics Cards */}
      <section className="dashboard-stats">
        {stats.map((stat) => (
          <article className="dashboard-stat-card" key={stat.title}>
            <div className="dashboard-card-top">
              <span className="dashboard-stat-icon">{stat.icon}</span>
            </div>

            <p className="dashboard-stat-title">{stat.title}</p>
            <h2 className="dashboard-stat-value">{stat.value}</h2>
            <p className="dashboard-stat-description">
              {stat.description}
            </p>
          </article>
        ))}
      </section>

      {/* Recent Orders */}
      <section className="dashboard-recent">
        <div className="dashboard-section-heading">
          <div>
            <h2>Recent Orders</h2>
            <p>Latest orders received by your store.</p>
          </div>

          <button
            className="dashboard-view-all"
            onClick={() => {
              window.location.href = "/admin/orders";
            }}
          >
            Manage Orders →
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="dashboard-empty">
            <span>📭</span>
            <p>No orders available yet.</p>
          </div>
        ) : (
          <div className="dashboard-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Items</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {[...orders]
                  .reverse()
                  .slice(0, 5)
                  .map((order) => (
                    <tr key={order.id}>
                      <td className="dashboard-order-id">
                        {order.orderId}
                      </td>

                      <td>{order.customerName}</td>

                      <td className="dashboard-amount">
                        ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                      </td>

                      <td>{order.totalItems}</td>

                      <td>
                        <span
                          className={`dashboard-status status-${(
                            order.status || "PLACED"
                          ).toLowerCase()}`}
                        >
                          {order.status || "PLACED"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminDashboard;
