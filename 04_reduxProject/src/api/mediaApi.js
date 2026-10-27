// ===== MEDIA API - Photos aur Videos fetch karne ke functions =====
// Ye file sirf API calls karti hai, koi UI nahi hai yahan
import axios from "axios"; // HTTP requests ke liye (fetch ka easy version)

// API Keys - .env file se aa rahi hain (VITE_ prefix Vite mein zaroori hai)
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY;

// ---- Photos fetch karo Unsplash API se ----
// query = kya search karna hai (e.g., "nature")
// page = konsa page (pagination), per_page = kitne results ek page mein
export const fetchPhotos = async (query, page = 1, per_page = 20) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query, page, per_page }, // URL mein ?query=nature&page=1 lagega
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }, // Unsplash ko API key header mein chahiye
  });
  return response.data; // Returns: { results: [...photos], total: 1000, ... }
};

// ---- Videos fetch karo Pixabay API se ----
// query = kya search karna hai, per_page = kitne results
export const fetchVideos = async (query, per_page = 20) => {
  const response = await axios.get("https://pixabay.com/api/videos/", {
    params: {
      q: query,        // Pixabay mein "q" use hota hai "query" ki jagah
      key: PIXABAY_KEY, // Pixabay ko API key params mein chahiye (header mein nahi)
      per_page,
    },
  });
  return response.data; // Returns: { hits: [...videos], total: 500, ... }
};
