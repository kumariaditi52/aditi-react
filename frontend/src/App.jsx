import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/HomePage.jsx";
import SignupForm from "./pages/Signup.jsx";
import ShowCart from "./pages/ShowCart.jsx";
import BuyPage from "./pages/BuyPage.jsx";
import TestPage from "./pages/TestPage.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/cart" element={<ShowCart />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/test" element={<TestPage />} />
        
      </Routes>
    </Router>

  )
}

export default App