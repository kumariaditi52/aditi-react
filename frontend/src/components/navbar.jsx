import "../css/navbar.css";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
// import Profile from "../pages/Profile";
import { refreshPage } from "./reloadPage";


function Navbar() {
    const [isDropdown, setDropdown] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const dropdownRef = useRef(null); // Reference for dropdown
    const navigate = useNavigate(); // Initialize navigate


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
                    1
                    console.error("Error fetching cart count: ", error);
                }
            }
        };
        fetchCartCount(); // Call the function to fetch cart count
    }, []); // Empty dependency array to ensure this runs only once on mount

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
        };

        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const toggleDropdown = () => {
        setDropdown((prevDropdown) => !prevDropdown);
    }

    const handleSignup = () => {
        navigate("/signup"); // Redirect to the signup page
    }

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        refreshPage();   // navigate to the home page
    }

    const handleProfile = () => {
        navigate("/userprofile");
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
                <div className="seller"><i className="fa-solid fa-shop"></i>Become Seller</div>
                <div className="cart">
                    <Link to="/cart" className="cart-link">
                        {cartCount > -1 && (
                            <span className="add-value-cart">{cartCount}</span>
                        )}
                        <i className="fa-solid fa-cart-shopping" color="#68736c"></i>
                    </Link>
                </div>
                {!isCartPage && (
                    <div className="dropdown" ref={dropdownRef}>
                        <button onClick={toggleDropdown} className="dropdown-button">
                            <i className="fa-regular fa-circle-user"></i>
                        </button>
                        <div className={`dropdown-menu ${isDropdown ? 'show' : ''}`}>
                            <ul>
                                {isAuthenticated ? (
                                    <>
                                        <li>
                                            <a onClick={handleLogout} className="dropdown-item">
                                                <span className="dropdown-text">Log out</span> <i className="fa-solid fa-right-from-bracket"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" onClick={handleProfile}>
                                                <span className="dropdown-text">Profile</span><i className="fa-regular fa-user"></i>
                                            </a>
                                        </li>
                                        <li>
                                            {/* <a className="dropdown-item"> */}
                                                <Link to={'/cart'} className="dropdown-item"> <span className="dropdown-text">Cart</span><i className="fa-solid fa-cart-shopping"></i></Link>
                                            {/* </a> */}
                                        </li>
                                        <li>
                                            <a className="dropdown-item">
                                                <span className="dropdown-text">My Orders</span><i className="fa-solid fa-sort"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item">
                                                <span className="dropdown-text">Privacy & policy</span><i className="fa-solid fa-shield-halved"></i>
                                            </a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <div className="dropdown" ref={dropdownRef}>
                                            <li>
                                                <a onClick={handleSignup} className="dropdown-item" style={{ cursor: 'pointer' }}>
                                                    Sign Up
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={handleSignup} className="dropdown-item" style={{ cursor: 'pointer' }}>
                                                    Sign In
                                                </a>
                                            </li>
                                        </div>
                                    </>
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
