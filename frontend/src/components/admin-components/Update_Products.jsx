import "../../css/update_products.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast

export const Update_Products = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    // Handle search functionality
    const handleSearch = async () => {
        const token = localStorage.getItem("adminToken");
        try {
            const response = await axios.get(`/api/search?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setResults(response.data);
            toast.success("Successfully searched");
        } catch (error) {
            console.log(error);
            toast.error("Failed to search");
        }
    };

    // Handle quantity change in the input field
    const handleQuantityChange = (index, value) => {
        const updatedResults = [...results];
        updatedResults[index].quantity = value; // Update quantity in the results array
        setResults(updatedResults); // Update state with the modified results array
    };

    // Handle update product quantity
    const handleUpdate = async (id, newQuantity) => {
        const token = localStorage.getItem("adminToken");
        try {
            await axios.put(`/api/update/${id}`, { quantity: newQuantity }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Product updated successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update product");
        }
    };

    return (
        <>
            <div className="update-products-container">
                <div className="update-nav">
                    <div className="search-bar-container">
                        <input
                            type="text"
                            placeholder="Search Fruits by name ..."
                            className="search-bar-update-product"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="search-button-update-product" onClick={handleSearch}>Search</button>
                    </div>
                    <hr />
                </div>
                <div className="update-body">
                    <div className="update-product-body">
                        {results.length > 0 ? (
                            <div className="table-container">
                                <table className="results-table">
                                    <thead>
                                        <tr>
                                            <th>Fruit Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Photo</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map((fruit, index) => (
                                            <tr key={index}>
                                                <td>{fruit.name}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={fruit.quantity}
                                                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                                                    />
                                                </td>
                                                <td>₹{fruit.price}</td>
                                                <td>
                                                    {fruit.photo ? (
                                                        <img
                                                            src={`${encodeURIComponent(fruit.photo.split('/').pop())}`}
                                                            alt={fruit.name}
                                                            className="fruit-image"
                                                        />
                                                    ) : (
                                                        "No Image"
                                                    )}
                                                </td>
                                                <td>
                                                    <button
                                                        className="update-button"
                                                        onClick={() => handleUpdate(fruit._id, fruit.quantity)}
                                                    >
                                                        Update
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            search && (
                                <div className="no-results-message">
                                    No results found for {search}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Add ToastContainer here */}
        </>
    );
};
