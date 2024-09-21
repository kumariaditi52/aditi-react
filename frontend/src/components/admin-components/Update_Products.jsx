import "../../css/update_products.css";
import { useState } from "react";
import axios from "axios";

export const Update_Products = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState("");

    const handleSearch = async () => {
        const token = localStorage.getItem("adminToken");
        try {
            const response = await axios.get(`/api/search?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setResults(response.data);
            setMessage("Successfully searched");
        } catch (error) {
            console.log(error);
            setMessage("Failed to search");
        }
    }

    return (
        <>
            <div className="update-procuts-container">
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
                        {message && (
                            <div className="message">
                                {message}
                            </div>
                        )}
                        {results.length > 0 ? (
                            <div className="table-container">
                                <table className="results-table">
                                    <thead>
                                        <tr>
                                            <th>Fruit Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Image</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map((fruit, index) => (
                                            <tr key={index}>
                                                <td>{fruit.name}</td>
                                                <td>
                                                    <input type="number" value={fruit.quantity} onChange={} />
                                                </td>
                                                <td>₹{fruit.price}</td>
                                                <td>
                                                    {fruit.photo ? (
                                                        <img src={fruit.photo} alt={fruit.name} className="fruit-image" />
                                                    ) : (
                                                        "No Image"
                                                    )}
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
            </div>
        </>
    )
}
