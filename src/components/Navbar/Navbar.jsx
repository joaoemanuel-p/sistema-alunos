import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/cadastro">Cadastro</Link> |{" "}
      <Link to="/listagem">Listagem</Link>
    </nav>
  );
}

export default Navbar;