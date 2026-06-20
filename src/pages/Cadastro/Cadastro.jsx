import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useAluno } from "../../context/AlunoContext";
import "./Cadastro.css";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const [erros, setErros] = useState({});

  const { adicionarAluno } = useAluno();

  function handleSubmit(event) {
    event.preventDefault();

    const novosErros = {};

    if (!nome.trim()) {
      novosErros.nome = "Informe o nome.";
    }

    if (!email.trim()) {
      novosErros.email = "Informe o e-mail.";
    } else if (!email.includes("@")) {
      novosErros.email = "Informe um e-mail válido.";
    }

    if (!curso.trim()) {
      novosErros.curso = "Informe o curso.";
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    adicionarAluno(nome, email, curso);

    setNome("");
    setEmail("");
    setCurso("");
    setErros({});
  }

  return (
    <Layout>
      <h1>Cadastro de Alunos</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
          {erros.nome && (
            <p className="erro">{erros.nome}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {erros.email && (
            <p className="erro">{erros.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="curso">Curso</label>
          <input
            id="curso"
            type="text"
            value={curso}
            onChange={(event) => setCurso(event.target.value)}
          />
          {erros.curso && (
            <p className="erro">{erros.curso}</p>
          )}
        </div>

        <button type="submit">
          Cadastrar Aluno
        </button>
      </form>
    </Layout>
  );
}

export default Cadastro;