
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  // LOAD PRODUCTS
  const loadProducts = async () => {
    try {
      const response = await API.get("/products");

      setProducts(
        Array.isArray(response.data) ? response.data : []
      );
      setError("");
    } catch (err) {
      console.error("Load products failed:", err);
      setError("Unable to load products. Please login and try again.");
    }
  };

  // ADD PRODUCT TO CART
  const addToCart = (product) => {
    try {
      console.log("Add to Cart clicked:", product);

      const savedCart = localStorage.getItem("cart");
      const existingCart = savedCart
        ? JSON.parse(savedCart)
        : [];

      if (!Array.isArray(existingCart)) {
        throw new Error("Invalid cart data");
      }

      const existingIndex = existingCart.findIndex(
        (item) => String(item.id) === String(product.id)
      );

      let updatedCart;

      if (existingIndex !== -1) {
        // Increase quantity if product already exists
        updatedCart = existingCart.map((item, index) =>
          index === existingIndex
            ? {
                ...item,
                cartQuantity:
                  (Number(item.cartQuantity) || 1) + 1,
              }
            : item
        );
      } else {
        // Add new product
        updatedCart = [
          ...existingCart,
          {
            ...product,
            cartQuantity: 1,
          },
        ];
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      // Notify Navbar and other components
      window.dispatchEvent(new Event("cartUpdated"));

      console.log("Updated cart:", updatedCart);

      alert(
        existingIndex !== -1
          ? `${product.name} quantity increased in cart`
          : `${product.name} added to cart successfully`
      );
    } catch (err) {
      console.error("Add to Cart failed:", err);
      alert("Unable to add product to cart. Please check Console.");
    }
  };

  // SEARCH FILTER
  const filteredProducts = products.filter((product) => {
    const search = searchText.toLowerCase().trim();

    return (
      product.name?.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search)
    );
  });

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>Sales Savvy</h1>

        <h2 style={styles.heading}>Our Products</h2>

        {/* SEARCH BOX */}
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* ERROR MESSAGE */}
        {error && <p style={styles.error}>{error}</p>}

        {/* PRODUCT GRID */}
        <div style={styles.productGrid}>
          {filteredProducts.length === 0 ? (
            <p style={styles.noProducts}>
              {error ? "Products could not be loaded" : "No products found"}
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div style={styles.card} key={product.id}>
                {/* PRODUCT IMAGE */}
                <div style={styles.imageBox}>🛍️</div>

                {/* PRODUCT DETAILS */}
                <div style={styles.cardContent}>
                  <h3 style={styles.productName}>
                    {product.name}
                  </h3>

                  <p style={styles.description}>
                    {product.description || "No description available"}
                  </p>

                  <p style={styles.price}>
                    ₹{product.price ?? "N/A"}
                  </p>

                  <p style={styles.info}>
                    <strong>Available Quantity:</strong>{" "}
                    {product.quantity ?? "N/A"}
                  </p>

                  <p style={styles.category}>
                    {product.category || "No category"}
                  </p>

                  {/* ADD TO CART */}
                  <button
                    type="button"
                    style={styles.button}
                    onClick={() => addToCart(product)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
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
    marginBottom: "10px",
    fontSize: "36px",
    color: "#1f2937",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    color: "#374151",
  },

  searchContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
  },

  searchInput: {
    width: "500px",
    maxWidth: "90%",
    padding: "14px 18px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
  },

  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
  },

  imageBox: {
    height: "180px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "70px",
    backgroundColor: "#eef2f7",
  },

  cardContent: {
    padding: "20px",
  },

  productName: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#111827",
  },

  description: {
    color: "#666",
    minHeight: "40px",
  },

  price: {
    fontSize: "22px",
    fontWeight: "bold",
    margin: "15px 0",
    color: "#047857",
  },

  info: {
    margin: "8px 0",
  },

  category: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "20px",
    backgroundColor: "#e8f0fe",
    marginBottom: "15px",
  },

  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#1f2937",
    color: "white",
  },

  noProducts: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    gridColumn: "1 / -1",
  },

  error: {
    textAlign: "center",
    fontWeight: "bold",
    color: "red",
  },
};

export default Products;
