import "../css/footer.css";

// import { fbID, instaID, xID, linkID } from "../cdns/social_id";


function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo-section">
                    <img
                        src="logo_2.jfif"
                        alt="brand icon"
                        className="footer-logo"
                    />
                    <h1 className="footer-title">Fruitzz</h1>
                </div>
                <div className="footer-social-icons">
                    <a href="" className="social-icon" aria-label="Facebook">
                        <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="" className="social-icon" aria-label="Instagram">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="" className="social-icon" aria-label="Twitter">
                        <i className="fa-brands fa-x-twitter"></i>
                    </a>
                    <a href="" className="social-icon" aria-label="LinkedIn">
                        <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                </div>
                <div className="footer-links">
                    <div className="footer-help">
                        Help <i className="fa-solid fa-angles-right"></i>
                    </div>
                    <ul className="footer-nav">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom-text">
                &copy; 2024 Fruitzz........ All rights Verified not Reserved.
            </div>
        </footer>
    );
}

export default Footer;
