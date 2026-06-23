import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RotaProtegida({ children }) {
  const { estaLogado } = useAuth();

  if (!estaLogado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RotaProtegida;