import "../../css/update_products.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineRefresh } from "react-icons/md";
import { MdOutlineYoutubeSearchedFor } from "react-icons/md";

export const Update_Products = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

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

    const handleQuantityChange = (index, value) => {
        const updatedResults = [...results];
        updatedResults[index].quantity = value;
        setResults(updatedResults);
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
    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <>
            <div className="update-products-container">
                <div className="update-nav">
                    <div className="search-bar-container-update">
                        <input
                            type="text"
                            placeholder="Search Fruits by name ..."
                            className="search-bar-update-product"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="search-button-update-product" onClick={handleSearch}>Search <MdOutlineYoutubeSearchedFor size={11} /></button>
                    <button className="search-button-update-product" onClick={refreshPage}>Refresh <MdOutlineRefresh size={10} /></button>

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
                                                        src={`${fruit.photo}`}
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
                                No results found for "{search}"
                            </div>
                        )
                    )}
                </div>
            </div>
        </div >
            <ToastContainer /> {/* Add ToastContainer here */ }
        </>
    );
};
