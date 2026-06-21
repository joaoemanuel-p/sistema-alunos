import { Link } from "react-router-dom";
import { useAluno } from "../../context/AlunoContext";
import "./Navbar.css";

function Navbar() {
  const { abrirModal } = useAluno();

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/alunos">Alunos</Link>
        <Link to="/cursos">Cursos</Link>
      </div>

      <button
        type="button"
        className="navbar-botao-novo-aluno"
        onClick={abrirModal}
      >
        + Novo Aluno
      </button>
    </nav>
  );
}

export default Navbar;