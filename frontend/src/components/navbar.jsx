import "../css/navbar.css";
import { useState, useEffect } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import axios from "axios";


function Navbar() {
    const [isDropdown, setDropdown] = useState(false);
    const navigate = useNavigate(); // Initialize navigate
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cartCount, setCartCount] = useState(0);


    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            console.error("Error parsing JWT", e);
            return null;
        }
    };

    useEffect(() => {
        const fetchCartCount = async () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                setIsAuthenticated(true);

                const payload = parseJwt(token);
                if (!payload || !payload.userId) {
                    console.error("Invalid token payload");
                    return;
                }

                const userId = payload.userId;
                try {
                    const response = await axios.get(`/api/showCartCount?userId=${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setCartCount(response.data.totalItemCount);
                } catch (error) {
                    console.error("Error fetching cart count: ", error);
                }
            }
        };

        fetchCartCount(); // Call the function to fetch cart count
    }, []); // Empty dependency array to ensure this runs only once on mount


    const toggleDropdown = () => {
        setDropdown((prevDropdown) => !prevDropdown);
    }

    const handleSignup = () => {
        navigate("/signup"); // Redirect to the signup page
    }

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate("/");   // navigate to the home page
    }

    const location = useLocation();
    const isCartPage = location.pathname === '/cart'; // Adjust this path if necessary

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to={'/'}>
                    <img
                        src="logo_2.jfif"
                        alt="brand icon"
                    /></Link>
            </div>
            <div className="navbar-text">
                <h1>Fruitzz</h1>
                <p>A Quality App For Good Quality Fruits</p>
            </div>


            {/* cart icon is here */}
            <div className="navbar-icons">
                <div className="cart">
                    <Link to="/cart" className="cart-link">
                        {cartCount > -1 && (
                            <span className="add-value-cart">{cartCount}</span>
                        )}
                        <i className="fa-solid fa-cart-shopping" color="#68736c"></i>
                    </Link>

                </div>

                {!isCartPage && (
                    <div className="dropdown">
                        <button onClick={toggleDropdown} className="dropdown-button">
                            <i className="fa-regular fa-circle-user"></i>
                        </button>
                        <div className={`dropdown-menu ${isDropdown ? 'show' : ''}`}>
                            <ul>
                                {isAuthenticated ? (
                                    <>
                                    <li>
                                        <a onClick={handleLogout} style={{ cursor: 'pointer', color: 'blue' }}>
                                            Log out
                                        </a>
                                    </li>
                                    <li>
                                        <a style={{ cursor: 'pointer', color: 'blue' }}>
                                            Log out
                                        </a>
                                    </li>
                                    <li>
                                        <a style={{ cursor: 'pointer', color: 'blue' }}>
                                            Log out
                                        </a>
                                    </li>
                                    </>
                                ) : (
                                    <li>
                                        <a onClick={handleSignup} style={{ cursor: 'pointer' }}>
                                            Sign Up
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
