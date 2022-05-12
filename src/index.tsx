import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
