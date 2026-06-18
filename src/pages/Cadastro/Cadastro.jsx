import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./Cadastro.css";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log("FORMULÁRIO ENVIADO");

    console.log({
      nome,
      email,
      curso,
    });

    setNome("");
    setEmail("");
    setCurso("");
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
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="curso">Curso</label>
          <input
            id="curso"
            type="text"
            value={curso}
            onChange={(event) => setCurso(event.target.value)}
          />
        </div>

        <button type="submit">
          Cadastrar Aluno
        </button>
      </form>
    </Layout>
  );
}

export default Cadastro;