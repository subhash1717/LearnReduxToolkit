// ===== TABS - Photos / Videos / GIF switch karne ke buttons =====
import { useDispatch, useSelector } from "react-redux";
import { setActiveTabs } from "../redux/features/searchSlice"; // Tab change karne ka action

const Tabs = () => {
  // Available tabs ki list
  const tabs = ["photos", "videos", "gif"];

  const dispatch = useDispatch();

  // Redux store se currently active tab le rahe hain
  const activeTab = useSelector((state) => state.search.activeTab);

  return (
    <div className="flex gap-5 p-10">
      {/* Har tab ke liye ek button banao */}
      {tabs.map(function (elem, idx) {
        return (
          <button
            key={idx}
            // Active tab = blue, baaki = gray
            className={`${activeTab === elem ? "bg-blue-700" : "bg-gray-500"} transition cursor-pointer active:scale-95 px-5 py-2 rounded uppercase`}
            onClick={() => {
              // Tab change karo -> ResultGrid mein naye results aayenge
              dispatch(setActiveTabs(elem));
            }}
          >
            {elem}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
