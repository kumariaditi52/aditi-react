import "../css/body.css";
import axios from "axios";
import { useEffect, useState } from "react";
import handleAddToCart from "../utils/cartUtils.js";
import { refreshPage } from "../components/reloadPage";
import { useTypewriter } from "react-simple-typewriter";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Carousel from "./carousel.jsx";

const Body = () => {
    const [fruits, setFruits] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const token = localStorage.getItem("authToken");

    const addToCart = (fruit) => {
        if (token) {
            handleAddToCart(fruit, token);
            setCartCount(cartCount + 1);
        }
        else {
            console.log("User is not authenticated");
        }
    }
    useEffect(() => {
        axios.get("/api/fruits").then(response => {
            setFruits(response.data);
        }).catch(error => {
            console.error("Error fetching fruits in body.jsx ", error)
        }
        )
    }, [])

    const [text] = useTypewriter({
        words: ["Fresh Fruits", "Find Fruits", "Look up Categories", "Sliced One", "Non Sliced"],
        loop: true,
        delaySpeed: 2000,
    });

    return (
        <>
            <div className="body-container">
                <div className="search-bar-container">
                    <input className="search-bar" type="text" placeholder={text} />
                    <div className="carousel-container">
                        <Carousel />
                    </div>
                </div>
                <Navbar />
                <div className="fruit-container">
                    {fruits.map(fruit => (
                        <div key={fruit._id} className="fruit-card">
                            <img src={fruit.photo} alt={fruit.name} />
                            <h2>{fruit.name}</h2>
                            <p><b>Price:</b> ₹ {fruit.price}</p>
                            <p className="Nutrition"><b>Nutritions:</b> {fruit.nutritions}</p>
                            <div className="button-group">
                                <button type="button" onClick={() => { addToCart(fruit); refreshPage(); }} className="add-to-cart-button">Add to Cart</button>
                                <button type="button" className="buy-button">Buy</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
            <Footer />
        </>
    );
}

export default Body