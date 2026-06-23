import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setErro("");

    if (!email.trim() || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }

    const resultado = login({ email: email.trim(), senha });

    if (!resultado.sucesso) {
      setErro(resultado.erro);
      return;
    }

    navigate("/");
  }

  return (
    <div className="auth-pagina">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Entrar</h1>
        <p className="auth-subtitulo">Acesse o Sistema de Gestão de Alunos</p>

        {erro && <p className="auth-erro">{erro}</p>}

        <div className="campo">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoFocus
          />
        </div>

        <div className="campo">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />
        </div>

        <button type="submit">Entrar</button>

        <p className="auth-rodape">
          Não tem conta? <Link to="/registro">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;