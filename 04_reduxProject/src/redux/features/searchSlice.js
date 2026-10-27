// ===== SEARCH SLICE - Search feature ka saara state yahan manage hota hai =====
// Slice = ek feature ka state + uske actions (functions jo state change karte hain)
import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search", // Slice ka naam - Redux DevTools mein dikhega
  // Initial State - App pehli baar load hone pe ye values hongi
  initialState: {
    query: "",          // User ne kya search kiya (e.g., "nature", "cars")
    activeTab: "photos", // Konsa tab active hai - "photos" ya "videos"
    results: [],         // API se aaye hue results ka array
    loading: false,      // true = data load ho raha hai (spinner dikhao)
    error: null,         // Koi error aaya toh uska message yahan hoga
  },
  // Reducers = Functions jo state update karte hain
  // dispatch(setQuery("cats")) => setQuery function chalega
  reducers: {
    // User ne kuch search kiya toh query update hogi
    setQuery(state, action) {
      state.query = action.payload; // payload = jo value bheji, e.g., "cats"
    },
    // Tab change kiya (photos/videos/gif)
    setActiveTabs(state, action) {
      state.activeTab = action.payload; // payload = "photos" ya "videos"
    },
    // API se results aa gaye toh yahan save karo + loading band karo
    setResults(state, action) {
      state.results = action.payload; // payload = array of items from API
      state.loading = false;          // Loading khatam
    },
    // API call start hone pe loading on karo
    setLoading(state) {
      state.loading = true;  // Loading on
      state.error = null;    // Purani error clear karo
    },
    // API call fail ho gayi toh error save karo
    setError(state, action) {
      state.error = action.payload; // payload = error message string
      state.loading = false;        // Loading band karo
    },
    // Saare results clear karo
    clearResults(state) {
      state.results = [];
    },
  },
});

// Actions export - Components mein dispatch() ke saath use honge
// Example: dispatch(setQuery("nature"))
export const { setQuery, setActiveTabs, setLoading, setResults, setError } =
  searchSlice.actions;

// Reducer export - store.js mein import hoga
export default searchSlice.reducer;
