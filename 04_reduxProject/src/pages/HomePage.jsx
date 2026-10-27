// ===== HOME PAGE - Search page (default landing page) =====
// User yahan search karega aur results dikhenge
import { useSelector } from "react-redux"; // Redux store se data lene ke liye
import ResultGrid from "../components/ResultGrid"; // Search results ki grid
import SearchBar from "../components/SearchBar"; // Search input bar
import Tabs from "../components/Tabs"; // Photos/Videos/GIF tabs


const HomePage = () => {
  // Redux store se query le rahe hain (user ne kya search kiya)
  const { query } = useSelector((store) => store.search);

  return (
    <div>
      

      {/* SearchBar hamesha dikhega */}
      <SearchBar />

      {/* Tabs + Results sirf tab dikhenge jab query khali na ho */}
      {/* Matlab user ne kuch search kiya ho tabhi results dikhao */}
      {query != "" ? (
        <div>
          {/* Tabs = Photos | Videos | GIF buttons */}
          <Tabs /> {/* ResultGrid = API se data laake cards dikhata hai */}
          <ResultGrid />
        </div>
      ) : (
        // Kuch search nahi kiya toh kuch mat dikhao
        ""
      )}
    </div>
  );
};

export default HomePage;
