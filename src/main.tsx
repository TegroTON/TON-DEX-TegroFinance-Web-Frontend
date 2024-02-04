import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "typeface-inter";
import "../public/static/assets/css/app.min.css";
import "../public/static/assets/libs/fontawesome/css/all.min.css";
import App from "./App";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <TonConnectUIProvider manifestUrl="https://tegro.finance/static/tonconnect-manifest.json">
        <App />
      </TonConnectUIProvider>
    </Provider>
  </React.StrictMode>
);
