import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // Dummy product data for demonstration
  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <div className="cart-container">
      <div className="cart-buttons">
        <button onClick={() => navigate("/user-page")}>Home</button>
        <button onClick={() => navigate("")}>View Product</button>
        <button onClick={() => navigate("")}>Request Item</button>
        <button onClick={() => navigate("")}>Product Status</button>
        <button onClick={() => navigate("/")}>Logout</button>
      </div>
      <div className="cart-items">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} - ${item.price}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="proceed-buttons">
        <button>proceed to checkout</button>
      </div>
      
    </div>
  );
};

export default Cart;
