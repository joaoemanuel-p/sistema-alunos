import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AlunoProvider } from "./context/AlunoContext";
import { AuthProvider } from "./context/AuthContext";
import { TurmaProvider } from "./context/TurmaContext";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TurmaProvider>
          <AlunoProvider>
            <App />
          </AlunoProvider>
        </TurmaProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);