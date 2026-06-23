import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RotaPublica({ children }) {
  const { estaLogado } = useAuth();

  if (estaLogado) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RotaPublica;