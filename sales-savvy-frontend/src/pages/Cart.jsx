
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  // LOAD CART
  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const cartWithQuantity = savedCart.map((product) => ({
      ...product,
      cartQuantity: product.cartQuantity || 1,
    }));

    setCart(cartWithQuantity);

    localStorage.setItem(
      "cart",
      JSON.stringify(cartWithQuantity)
    );
  }, []);

  // SAVE CART + UPDATE NAVBAR
  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((product) =>
      product.id === id
        ? {
            ...product,
            cartQuantity: product.cartQuantity + 1,
          }
        : product
    );

    updateCart(updatedCart);
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((product) =>
        product.id === id
          ? {
              ...product,
              cartQuantity: product.cartQuantity - 1,
            }
          : product
      )
      .filter(
        (product) => product.cartQuantity > 0
      );

    updateCart(updatedCart);
  };

  // REMOVE PRODUCT
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(
      (product) => product.id !== id
    );

    updateCart(updatedCart);
  };

  // TOTAL ITEMS
  const totalItems = cart.reduce(
    (total, product) =>
      total + product.cartQuantity,
    0
  );

  // TOTAL AMOUNT
  const totalAmount = cart.reduce(
    (total, product) =>
      total +
      Number(product.price || 0) *
        product.cartQuantity,
    0
  );

  return (
    <>
      <Navbar />

      <div style={styles.container}>

        <h1 style={styles.title}>
          🛒 Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div style={styles.empty}>

            <h2>Your cart is empty</h2>

            <button
              style={styles.shopButton}
              onClick={() =>
                navigate("/products")
              }
            >
              Continue Shopping
            </button>

          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div style={styles.cartContainer}>

              {cart.map((product) => (

                <div
                  style={styles.cartItem}
                  key={product.id}
                >

                  {/* IMAGE */}
                  <div style={styles.image}>
                    🛍️
                  </div>

                  {/* DETAILS */}
                  <div style={styles.details}>

                    <h3>{product.name}</h3>

                    <p>
                      {product.description ||
                        "No description available"}
                    </p>

                    <p style={styles.price}>
                      ₹{product.price ?? "N/A"}
                    </p>

                    <p>
                      Category:{" "}
                      {product.category ||
                        "No category"}
                    </p>

                    {/* QUANTITY */}
                    <div
                      style={
                        styles.quantitySection
                      }
                    >

                      <span>
                        Quantity:
                      </span>

                      <button
                        style={
                          styles.quantityButton
                        }
                        onClick={() =>
                          decreaseQuantity(
                            product.id
                          )
                        }
                      >
                        −
                      </button>

                      <span
                        style={styles.quantity}
                      >
                        {product.cartQuantity}
                      </span>

                      <button
                        style={
                          styles.quantityButton
                        }
                        onClick={() =>
                          increaseQuantity(
                            product.id
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    {/* SUBTOTAL */}
                    <p style={styles.subtotal}>
                      Subtotal: ₹
                      {Number(
                        product.price || 0
                      ) *
                        product.cartQuantity}
                    </p>

                  </div>

                  {/* REMOVE */}
                  <button
                    style={styles.removeButton}
                    onClick={() =>
                      removeFromCart(
                        product.id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            {/* CART SUMMARY */}
            <div style={styles.summary}>

              <h2>Cart Summary</h2>

              <p>
                Total Items:{" "}
                <strong>
                  {totalItems}
                </strong>
              </p>

              <h2>
                Total Amount: ₹
                {totalAmount}
              </h2>

              <button
  style={styles.checkoutButton}
  onClick={() => navigate("/checkout")}
>
  💳 Proceed to Checkout
</button>

            </div>
          </>
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

  title: {
    textAlign: "center",
    marginBottom: "30px",
  },

  empty: {
    textAlign: "center",
    backgroundColor: "#ffffff",
    padding: "40px",
    maxWidth: "600px",
    margin: "0 auto",
    borderRadius: "12px",
    boxShadow:
      "0 4px 12px rgba(0, 0, 0, 0.12)",
  },

  shopButton: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },

  cartContainer: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  cartItem: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    backgroundColor: "#ffffff",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow:
      "0 3px 10px rgba(0, 0, 0, 0.1)",
  },

  image: {
    width: "100px",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "45px",
    backgroundColor: "#eef2f7",
    borderRadius: "8px",
  },

  details: {
    flex: 1,
  },

  price: {
    fontSize: "20px",
    fontWeight: "bold",
  },

  quantitySection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "15px",
  },

  quantityButton: {
    width: "32px",
    height: "32px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "bold",
  },

  quantity: {
    minWidth: "30px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },

  subtotal: {
    fontSize: "17px",
    fontWeight: "bold",
    marginTop: "12px",
  },

  removeButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  summary: {
    maxWidth: "400px",
    margin: "30px auto",
    padding: "25px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow:
      "0 3px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },

  checkoutButton: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default Cart;

