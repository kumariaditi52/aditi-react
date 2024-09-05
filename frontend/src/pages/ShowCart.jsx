import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import "../css/showcart.css";
import { refreshPage } from "../components/reloadPage";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShowCart() {
  const [cartItems, setCartItems] = useState([]);


  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error("Error parsing JWT", e);
      return null;
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      const payload = parseJwt(token);
      if (!payload || !payload.userId) {
        console.error("Invalid token payload");
        return;
      }

      const userId = payload.userId;

      try {
        const response = await axios.get(`/api/showcart?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data); // Set cart items in state
      } catch (error) {
        console.error("Error fetching cart data", error);
      }
    };
    fetchCartData();
  }, []);

  /* remove item from cart */
  const removeItem = async (itemId) => {
    // console.log(itemId);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      const payload = parseJwt(token);
      if (!payload || !payload.userId) {
        console.error("Invalid token payload");
        return;
      }
      const userId = payload.userId;

      await axios.delete('/api/deleteItem', {
        data: { userId, itemId }
      })
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.log(error)
    }
  }

  // handle the increment and decrement button 
  const handleQuantity = async (fruitId, action) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("No token found");
            return;
        }

        const payload = parseJwt(token);
        if (!payload || !payload.userId) {
            console.error("Invalid token payload");
            return;
        }

        const userId = payload.userId;

        const response = await axios.post(`/api/handleQuantity`, { userId, fruitId, action });
        const updatedItems = response.data.items;

        setCartItems((prevItems) => {
          return prevItems.map((cart) => {
            return {
              ...cart,
              items: cart.items.map((item) => {
                if (item.fruitId._id === fruitId) {
                  return {
                    ...item,
                    quantity: updatedItems.find(updatedItem => updatedItem.fruitId._id === fruitId).quantity,
                  };
                }
                return item;
              }),
            };
          });
        });
        // Find the updated item using fruitId
        const updatedItem = updatedItems.find(item => item.fruitId._id === fruitId);

        if (updatedItem) {
            // Display the toast notification with the fruit name
            toast.success(`${updatedItem.fruitId.name} ${action === 'increment' ? 'added to' : 'removed from'} the Cart`);
        } else {
            // console.error("Updated item not found");
        }

    } catch (error) {
        console.error("Error in handleQuantity:", error);
    }
};


  const calculateTotalPrice = () => {
    return cartItems.reduce((total, cart) => {
      return total + cart.items.reduce((subTotal, item) => {
        return subTotal + item.quantity * item.price;
      }, 0);
    }, 0);
  };
  const totalPrice = calculateTotalPrice();


  return (
    <>
      <Navbar />
      <div className="dfvidf"></div>
      <div className="cart-container">

        {cartItems.length > 0 ? (
          <>
            <div className="card-heading">Your Saved Items are Here</div>
            <hr className="heading-divider" /> <ToastContainer className="toast-container" />
            <div className="cart-content">
              <div className="card-list">
                {cartItems[0].items.map((item) => (
                  <div key={item._id} className={`card card-animated`}>
                    <img src={item.fruitId.photo} alt={item.fruitId.name} className="card-image" />
                    <div className="card-content">
                      <h3>{item.fruitId.name}</h3>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: ₹ {item.price}</p>
                      <p>
                        Quantity:
                        <button
                          className="button-for-value"
                          onClick={() => { handleQuantity(item.fruitId._id, 'decrement'); }}
                          name="decrement"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          className="quantity-measurement"
                          name="quantity"
                          type="number"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="button-for-value"
                          onClick={() => { handleQuantity(item.fruitId._id, 'increment');}}
                          name="increment"
                        >
                          +
                        </button>
                      </p>
                      <button
                        className="remove-item"
                        onClick={() => {
                          removeItem(item._id);
                          refreshPage();
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div className="price-box">
              <h3>Total Price: ₹ {totalPrice.toFixed(2)}</h3>
              <Link to="/buy">
                <button className="place-order">Place Order</button>
              </Link>
            </div>
          </>
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
    </>
  );
}
