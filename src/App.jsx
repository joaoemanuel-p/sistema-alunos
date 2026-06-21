import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Alunos from "./pages/Alunos/Alunos";
import Cursos from "./pages/Cursos/Cursos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/alunos" element={<Alunos />} />
      <Route path="/cursos" element={<Cursos />} />
    </Routes>
  );
}

export default App;