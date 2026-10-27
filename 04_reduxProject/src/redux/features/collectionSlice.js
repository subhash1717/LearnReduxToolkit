// ===== COLLECTION SLICE - Saved items (favorites) ka state manage karta hai =====
// User jo photos/videos "Save" karega, wo yahan store honge
// LocalStorage mein bhi save hota hai toh page refresh ke baad bhi data rehta hai
import { createSlice } from "@reduxjs/toolkit";
import { toast, Zoom } from "react-toastify"; // Toast = popup notification

// Initial State - Pehle localStorage check karo, data hai toh le lo, warna empty array
const initialState = {
  items: JSON.parse(localStorage.getItem("collection")) || [],
  // JSON.parse = string ko array mein convert karta hai
  // localStorage.getItem = browser ki storage se data le raha hai
};

const collectionSlice = createSlice({
  name: "collection", // Slice ka naam
  initialState,
  reducers: {
    // ---- Item ko collection mein add karo ----
    addCollection: (state, action) => {
      // Pehle check karo ki ye item already saved toh nahi hai
      const alreadyExists = state.items.find(
        (item) => item.id === action.payload.id, // payload = naya item jo save karna hai
      );
      // Agar nahi hai toh add karo
      if (!alreadyExists) {
        state.items.push(action.payload); // Array mein add karo
        // LocalStorage mein bhi save karo (refresh ke baad bhi rahe)
        localStorage.setItem("collection", JSON.stringify(state.items));
      }
    },
    // ---- Item ko collection se hatao ----
    removeCollection: (state, action) => {
      console.log("removed");

      // Filter = sirf wahi items rakho jinki id match NAHI karti
      // payload = item ki id jo remove karni hai
      state.items = state.items.filter((item) => item.id !== action.payload);
      console.log(state.items);

      // LocalStorage bhi update karo
      localStorage.setItem("collection", JSON.stringify(state.items));
    },
    // ---- Poori collection clear karo (sab delete) ----
    clearCollection: (state) => {
      state.items = []; // Array khali kar do
      localStorage.removeItem("collection"); // LocalStorage se bhi delete karo
    },

    // ---- Toast: "Added!" ka success popup dikhao ----
    addedToast: () => {
      toast.success(" added to collection!", {
        position: "top-center",  // Screen ke top center mein dikhega
        autoClose: 2000,         // 2 second baad band ho jayega
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",           // Dark theme ka toast
        transition: Zoom,        // Zoom animation se aayega
      });
    },

    // ---- Toast: "Removed!" ka error popup dikhao ----
    removeToast: () => {
      toast.error("Removed from collection!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    },
  },
});

// Actions export - Components mein dispatch() ke saath use honge
// dispatch(addCollection(item))  => item save hoga
// dispatch(removeCollection(id)) => us id wala item delete hoga
// dispatch(clearCollection())    => sab delete ho jayenge
// dispatch(addedToast())         => "Added!" popup
// dispatch(removeToast())        => "Removed!" popup
export const {
  addCollection,
  removeCollection,
  clearCollection,
  addedToast,
  removeToast,
} = collectionSlice.actions;

// Reducer export for store.js
export default collectionSlice.reducer;
