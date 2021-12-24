import "../index.css";
import Navbar from "./Navbar";
import Login from "./Login";
import HeroSection from "./HeroSection";
import Register from "./Register";
import ListPage from "./ListPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HeroSection />} />
        {/* if the user is logged in then this page should be rendered */}
        {/* userAuth ? <ListPage> : <NotLoggedInPage> */}
        <Route path="/listpage" element={<ListPage />} />
      </Routes>
    </>
  );
}

export default App;
