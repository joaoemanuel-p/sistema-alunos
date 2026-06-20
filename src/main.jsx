import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AlunoProvider } from "./context/AlunoContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AlunoProvider>
        <App />
      </AlunoProvider>
    </BrowserRouter>
  </React.StrictMode>
);