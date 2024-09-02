import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Body from "../components/body";
import "../css/homepage.css";


function Home() {

    return (
        <>
            <Navbar />
            <div className="container">
                <Body />
                <Footer />
            </div>
        </>
    );
}

export default Home;
