import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import QueryProvider from "./tanstack-query/query_provider";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryProvider>
        <App />
        <Toaster />
      </QueryProvider>
    </PersistGate>
  </Provider>
);
