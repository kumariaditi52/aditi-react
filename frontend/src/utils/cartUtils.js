import axios from "axios";


const handleAddToCart = async (fruit, token) => {
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]))
        } catch (e) {
            console.log(e)
        }
    }
    const payload = parseJwt(token) // this gives the userId that is currently logged in 
    // console.log(payload)
    const userId = payload.userId;

    const quantity = 1; // Default quantity (can be adjusted)
    const data = {
        userId,
        fruitId: fruit._id,
        price: fruit.price,
        quantity,
    };

    try {
        // Send the POST request to the /api/cart endpoint
        const response = await axios.post("/api/add-to-cart", data, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
            },
        });

        // Handle the successful response
        console.log("Added to cart:", response.data);
    } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error adding to cart:", error);
    }
};


export default handleAddToCart;