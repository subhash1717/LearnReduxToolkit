// ===== ENTRY POINT - App yahan se start hoti hai =====
import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // React 18+ way to render app
import "./index.css"; // Tailwind CSS import
import App from "./App.jsx"; // Main App component
import { BrowserRouter } from "react-router-dom"; // URL based page navigation ke liye
import { Provider } from "react-redux"; // Redux store ko poori app mein available karega
import { store } from "./redux/store.js"; // Humara Redux store (central data storage)

// index.html mein "root" div ke andar poori app render ho rahi hai
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Provider = Redux store saari components ko de raha hai */}
    <Provider store={store}>
      {/* BrowserRouter = URL change hone pe sahi page dikhayega */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);