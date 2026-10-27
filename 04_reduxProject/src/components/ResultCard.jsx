// ===== RESULT CARD - Ek single photo/video card =====
// Search results mein har item ke liye ye card render hota hai
import { useDispatch } from "react-redux";
import {
  addCollection, // Item ko collection mein save karne ka action
  addedToast,     // "Added!" popup dikhane ka action
} from "../redux/features/collectionSlice";

// { item } = props se item nikal rahe hain (destructuring)
// item mein hai: id, type, title, thumbnail, src, url
const ResultCard = ({ item }) => {
  const dispatch = useDispatch();

  // Save button click pe ye chalega
  const addToCollection = (item) => {
    dispatch(addCollection(item)); // Redux store mein item save karo
    dispatch(addedToast());        // "Added to collection!" popup dikhao
  };

  return (
    // Card container - fixed width aur height
    <div className="w-[18vw] relative h-80 bg-white rounded">
      {/* Click pe original photo/video link new tab mein khulega */}
      <a className="h-full" target="_blank" href={item.url}>
        {/* Agar type "photo" hai toh image dikhao */}
        {item.type === "photo" && (
          <img
            src={item.thumbnail}
            className="w-full h-full object-cover object-center"
          />
        )}
        {/* Agar type "video" hai toh video player dikhao */}
        {item.type === "video" && (
          <video
            src={item.src}           // Video file URL
            poster={item.thubnail}   // Video load hone se pehle ye image dikhegi
            loop                     // Video loop mein chalegi
            muted                    // Muted - autoplay ke liye zaroori hai
            autoPlay                 // Automatically play hogi
            className="w-full h-full object-cover object-center"
          />
        )}
      </a>
      {/* Bottom overlay - Title + Save button (gradient background CSS se aa raha hai) */}
      <div
        id="bottom"
        className="flex justify-between gap-5 w-full px-6 py-10 text-white absolute bottom-0"
      >
        {/* Item ka title */}
        <h2 className="text-[60%] font-semibold capitalize overflow-hidden">
          {item.title}
        </h2>
        {/* Save button - Fixed size (w-20 h-8) toh text se size nahi badlega */}
        <button
          className="w-20 h-8 shrink-0 flex items-center justify-center bg-indigo-600 active:scale-95 text-white rounded cursor-pointer font-medium text-xs"
          onClick={() => {
            addToCollection(item); // Click pe collection mein save karo
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
