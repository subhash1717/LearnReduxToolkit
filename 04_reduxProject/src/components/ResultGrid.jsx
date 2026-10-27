// ===== RESULT GRID - API se data fetch karke cards ki grid dikhata hai =====
// Ye component search results ka main container hai
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, fetchVideos } from "../api/mediaApi"; // API call functions
import {
  setLoading,
  setError,
  setResults,
} from "../redux/features/searchSlice"; // Redux actions
import { useEffect } from "react"; // Side effect ke liye (API call = side effect)
import ResultCard from "./ResultCard"; // Har ek result ka card

const ResultGrid = () => {
  const dispatch = useDispatch();
  // Redux store se search state ke values le rahe hain
  const { query, activeTab, results, loading, error } = useSelector(
    (store) => store.search,
  );

  // useEffect - Jab bhi query ya activeTab change ho, API call karo
  // [query, activeTab] = dependencies - inme change ho toh function dubara chalega
  useEffect(
    function () {
      // Query khali hai toh API call mat karo
      if (!query) return;
      // Async function kyunki API call mein time lagta hai
      const getData = async () => {
        try {
          dispatch(setLoading()); // Loading start - spinner dikhao
          let data = [];
          // ---- PHOTOS tab selected hai ----
          if (activeTab == "photos") {
            let response = await fetchPhotos(query); // Unsplash API call
            
            // API response ko humari format mein convert karo
            // response.results = Unsplash ki photos array
            data = response.results.map((item) => ({
              id: item.id,                    // Unique ID
              type: "photo",                  // Type = photo
              title: item.alt_description,    // Photo ka description
              thumbnail: item.urls.small,     // Chhoti image (grid ke liye)
              src: item.urls.full,            // Full size image
              url: item.links.html,           // Unsplash pe original link
            }));
          }
          // ---- VIDEOS tab selected hai ----
          if (activeTab == "videos") {
            let response = await fetchVideos(query); // Pixabay API call
          

            // response.hits = Pixabay ki videos array
            data = response.hits.map((item) => ({
              id: item.id,
              type: "video",
              title: item.tags || item.name || "Video", // Tags ya name use karo
              thumbnail:
                item.videos.small.thumbnail || item.videos.tiny.thumbnail, // Video ki thumbnail
              src: item.videos.medium.url || item.videos.large.url, // Video file URL
            }));
          }
          // Results ko Redux store mein save karo (loading bhi off hogi)
          dispatch(setResults(data));
        } catch (err) {
          // Error aaye toh message save karo (AxiosError object nahi, sirf string)
          dispatch(setError(err.message));
        }
      };
      getData(); // Function call karo
    },
    [query, activeTab], // Dependencies
  );

  // ---- Conditional Rendering ----
  // Error hai toh red message dikhao
  if (error) return <h1 className="p-10 text-red-500">Error: {error}</h1>;
  // Loading hai toh "Loading..." dikhao
  if (loading) return <h1>Loading...</h1>;

  // ---- Normal render - Results ki grid ----
  return (
    <div className="flex justify-between w-full flex-wrap gap-6 overflow-auto px-10">
      {/* Har result item ke liye ResultCard render karo */}
      {results.map((item, idx) => {
        return <div key={idx}>
          {/* item prop pass karo - ResultCard ko pata chalega kya dikhana hai */}
          <ResultCard item={item}/>
        </div>;
      })}
    </div>
  );
};

export default ResultGrid;
