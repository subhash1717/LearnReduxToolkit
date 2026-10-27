// ===== SEARCH BAR - User yahan type karke search karega =====
import { useState } from "react"; // Local state ke liye (input field ka text)
import { useDispatch } from "react-redux"; // Redux mein data bhejne ke liye
import { setQuery } from "../redux/features/searchSlice"; // Search query update karne ka action

const SearchBar = () => {
  // text = input field mein kya likha hai (sirf is component ka local state)
  const [text, setText] = useState("");
  // dispatch = Redux store mein action bhejne ka function
  const dispatch = useDispatch();

  // Jab user Search button dabaye ya Enter press kare
  const submithandler = (e) => {
    e.preventDefault(); // Page reload mat karo (form ka default behavior rokna hai)
    const trimmed = text.trim(); // Extra spaces hatao
    if (!trimmed) return; // Khali hai toh kuch mat karo
    dispatch(setQuery(trimmed)); // Redux store mein query set karo -> API call trigger hogi
    setText(""); // Input field khali kar do
  };

  return (
    <div>
      {/* Form submit hone pe submithandler chalega */}
      <form
        onSubmit={(e) => {
          submithandler(e);
        }}
        className="flex bg-gray-900 gap-5 p-10 "
      >
        {/* Search input - controlled component (value React state se aati hai) */}
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value); // Har keystroke pe text update hota hai
          }}
          required
          className="w-full border-2 px-4 py-2 text-xl rounded outline-none"
          type="text"
          placeholder="Search Anything..."
        />
        {/* Search button */}
        <button className="active:scale-95 border-2 px-4 py-2 text-xl rounded outline-none">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
