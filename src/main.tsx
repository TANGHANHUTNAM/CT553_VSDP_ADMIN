import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import { Suspense } from "react";
import LoadingPage from "./pages/LoadingPage.tsx";

createRoot(document.getElementById("root")!).render(
  <Suspense
    fallback={
      <div>
        <LoadingPage />
      </div>
    }
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
);
