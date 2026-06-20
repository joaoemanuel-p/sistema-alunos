import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Cadastro from "./pages/Cadastro/Cadastro";
import Listagem from "./pages/Listagem/Listagem";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/listagem" element={<Listagem />} />
    </Routes>
  );
}

export default App;