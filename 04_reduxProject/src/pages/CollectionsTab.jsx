// ===== COLLECTIONS TAB PAGE - Saved items dikhata hai =====
// User ne jo photos/videos save ki hain wo yahan dikhti hain
import { useDispatch, useSelector } from "react-redux";
import CollectionCard from "../components/CollectionCard"; // Har saved item ka card
import { clearCollection } from "../redux/features/collectionSlice"; // Sab delete karne ka action

const CollectionsTab = () => {
  // Redux store se saved items ki array le rahe hain
  const collection = useSelector((state) => state.collection.items);

  const dispatch = useDispatch();

  // "Clear collection" button click pe sab delete ho jayenge
  const clearAll = () => {
    dispatch(clearCollection()); // Redux + localStorage dono se delete hoga
  };

  return (
    <>
      <div className="overflow-auto px-10 py-6">
        {/* Agar collection mein items hain toh heading + clear button dikhao */}
        {collection.length > 0 ? (
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-medium">Your Collection</h2>
            {/* Clear All button - Poori collection ek click mein delete */}
            <button
              className="active:scale-95 transition cursor-pointer bg-red-600 px-5 py-2 text-base  font-medium rounded"
              onClick={() => {
                clearAll();
              }}
            >
              Clear collection
            </button>
          </div>
        ) : (
          // Collection khali hai toh ye message dikhao
          <h1 className="text-center text-2xl font-bold">Collection is empty</h1>
        )}
      </div>

      {/* Saved items ki grid */}
      <div className="flex justify-start w-full flex-wrap gap-6 overflow-auto px-10 py-6">
        {/* Har saved item ke liye CollectionCard render karo */}
        {collection.map((item, idx) => {
          return (
            <div key={idx}>
              <CollectionCard item={item} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CollectionsTab;
