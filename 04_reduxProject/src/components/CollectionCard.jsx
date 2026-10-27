// ===== COLLECTION CARD - Saved item ka card (Remove button ke saath) =====
// ResultCard jaisa hi hai, but "Save" ki jagah "Remove" button hai
import { useDispatch } from "react-redux";
import {
  removeCollection, // Item delete karne ka action
  removeToast,       // "Removed!" popup dikhane ka action
} from "../redux/features/collectionSlice";

// { item } = saved photo/video ka object (id, type, title, thumbnail, src, url)
const CollectionCard = ({ item }) => {
  const dispatch = useDispatch();

  // Remove button click pe ye chalega
  const removeFromCollection = (item) => {
    dispatch(removeCollection(item.id)); // Item ki id bhejo -> us id wala item delete hoga
    dispatch(removeToast());              // "Removed from collection!" popup dikhao
  };

  return (
    <div>
      {/* Card container - same design as ResultCard */}
      <div className="w-[18vw] relative h-80 bg-white rounded">
        {/* Click pe original link khulega */}
        <a className="h-full" target="_blank" href={item.url}>
          {/* Photo dikhao agar type "photo" hai */}
          {item.type === "photo" && (
            <img
              src={item.thumbnail}
              className="w-full h-full object-cover object-center"
            />
          )}
          {/* Video dikhao agar type "video" hai */}
          {item.type === "video" && (
            <video
              src={item.src}
              poster={item.thubnail} // Thumbnail image
              loop
              muted
              autoPlay
              className="w-full h-full object-cover object-center"
            />
          )}
        </a>
        {/* Bottom section - Title + Remove button */}
        <div
          id="bottom"
          className="flex justify-between gap-5 w-full px-6 py-10 text-white absolute bottom-0"
        >
          <h2 className="text-[60%] font-semibold capitalize overflow-hidden">
            {item.title}
          </h2>
          {/* Remove button - Collection se item hatayega */}
          <button
            className="w-20 h-8 shrink-0 flex items-center justify-center bg-indigo-600 active:scale-95 text-white rounded cursor-pointer font-medium text-xs"
            onClick={() => {
              removeFromCollection(item);
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
