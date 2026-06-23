import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Alunos from "./pages/Alunos/Alunos";
import Cursos from "./pages/Cursos/Cursos";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import RotaProtegida from "./components/RotaProtegida/RotaProtegida";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      <Route
        path="/"
        element={
          <RotaProtegida>
            <Home />
          </RotaProtegida>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RotaProtegida>
            <Dashboard />
          </RotaProtegida>
        }
      />
      <Route
        path="/alunos"
        element={
          <RotaProtegida>
            <Alunos />
          </RotaProtegida>
        }
      />
      <Route
        path="/cursos"
        element={
          <RotaProtegida>
            <Cursos />
          </RotaProtegida>
        }
      />
    </Routes>
  );
}

export default App;