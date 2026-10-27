// ===== REDUX STORE - Poori app ka central data storage =====
// Koi bhi component yahan se data le sakta hai ya update kar sakta hai
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './features/searchSlice' // Search ka state (query, results, loading)
import collectionReducer from "./features/collectionSlice"; // Collection ka state (saved items)

export const store = configureStore({
  reducer: {
    // state.search se access hoga (query, results, loading, error)
    search: searchReducer,
    // state.collection se access hoga (items array)
    collection: collectionReducer
  },
});
