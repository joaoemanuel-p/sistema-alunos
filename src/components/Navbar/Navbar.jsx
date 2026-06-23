import { Link, useNavigate } from "react-router-dom";
import { useAluno } from "../../context/AlunoContext";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { abrirModal } = useAluno();
  const { usuarioAtual, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/alunos">Alunos</Link>
        <Link to="/cursos">Cursos</Link>
      </div>

      <div className="navbar-acoes">
        {usuarioAtual && (
          <span className="navbar-usuario">Olá, {usuarioAtual.nome.split(" ")[0]}</span>
        )}

        <button
          type="button"
          className="navbar-botao-novo-aluno"
          onClick={abrirModal}
        >
          + Novo Aluno
        </button>

        <button
          type="button"
          className="navbar-botao-sair"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;