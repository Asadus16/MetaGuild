import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ThirdwebProvider } from "thirdweb/react";
import "./styles/globals.css";

// This is the chain your dApp will work on.
const activeChain = "ethereum";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThirdwebProvider>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);

reportWebVitals();
