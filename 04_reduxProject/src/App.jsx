// ===== APP COMPONENT - Main layout + Routing =====
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Search page (default page)
import CollectionsTab from "./pages/CollectionsTab"; // Saved items page
import Navbar from "./components/Navbar"; // Top navigation bar
import { ToastContainer } from "react-toastify"; // Popup notification messages

const App = () => {
  return (
    // Full screen dark background + white text
    <div className="min-h-screen w-full bg-gray-950 text-white">
      {/* Navbar har page pe dikhega (Routes ke bahar hai isliye) */}
      <Navbar />
      {/* URL ke hisaab se sahi page render hoga */}
      <Routes>
        {/* "/" = Home page (search page) */}
        <Route path="/" element={<HomePage />} />
        {/* "/collection" = saved items wala page */}
        <Route path="/collection" element={<CollectionsTab />} />
      </Routes>

      {/* Toast popups yahan render hote hain */}
      <ToastContainer />
    </div>
  );
};

export default App;