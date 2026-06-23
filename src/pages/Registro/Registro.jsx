import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../Login/Login.css";

function Registro() {
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setErro("");

    if (!nome.trim() || nome.trim().length < 3) {
      setErro("Informe seu nome completo.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErro("Informe um e-mail válido.");
      return;
    }

    if (!senha || senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    const resultado = registrar({ nome: nome.trim(), email: email.trim(), senha });

    if (!resultado.sucesso) {
      setErro(resultado.erro);
      return;
    }

    navigate("/");
  }

  return (
    <div className="auth-pagina">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Criar conta</h1>
        <p className="auth-subtitulo">Cadastre-se para acessar o sistema</p>

        {erro && <p className="auth-erro">{erro}</p>}

        <div className="campo">
          <label htmlFor="nome">Nome completo</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            autoFocus
          />
        </div>

        <div className="campo">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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

        <div className="campo">
          <label htmlFor="confirmarSenha">Confirmar senha</label>
          <input
            id="confirmarSenha"
            type="password"
            value={confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}
          />
        </div>

        <button type="submit">Criar conta</button>

        <p className="auth-rodape">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </form>
    </div>
  );
}

export default Registro;