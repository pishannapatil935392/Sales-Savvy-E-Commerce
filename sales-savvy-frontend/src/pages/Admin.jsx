
import React from "react";
import Navbar from "../components/Navbar";

function Admin() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Admin Dashboard</h1>

        <p>Welcome to Sales Savvy Admin Panel.</p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "25px",
          }}
        >
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              minWidth: "180px",
            }}
          >
            <h3>Manage Products</h3>
            <p>View and manage products.</p>
          </div>

          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              minWidth: "180px",
            }}
          >
            <h3>Manage Orders</h3>
            <p>View and manage customer orders.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
