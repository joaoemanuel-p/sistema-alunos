import { useState } from "react";
import { useAluno } from "../../context/AlunoContext";
import "./CadastroAlunoForm.css";

function CadastroAlunoForm({ onSucesso }) {
  const { cursos, adicionarAluno } = useAluno();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [erros, setErros] = useState({});

  function validar() {
    const novosErros = {};

    if (!nome.trim()) {
      novosErros.nome = "Informe o nome.";
    }

    if (!email.trim()) {
      novosErros.email = "Informe o e-mail.";
    } else if (!email.includes("@")) {
      novosErros.email = "Informe um e-mail válido.";
    }

    if (!matricula.trim()) {
      novosErros.matricula = "Informe a matrícula.";
    }

    if (!curso) {
      novosErros.curso = "Selecione um curso.";
    }

    if (!dataNascimento) {
      novosErros.dataNascimento = "Informe a data de nascimento.";
    }

    return novosErros;
  }

  function limparFormulario() {
    setNome("");
    setEmail("");
    setMatricula("");
    setCurso("");
    setDataNascimento("");
    setErros({});
  }

  function handleSubmit(event) {
    event.preventDefault();

    const novosErros = validar();

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    adicionarAluno({
      nome,
      email,
      matricula,
      curso,
      dataNascimento,
    });

    limparFormulario();

    if (onSucesso) {
      onSucesso();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-aluno">
      <div className="campo">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
        {erros.nome && <p className="erro">{erros.nome}</p>}
      </div>

      <div className="campo">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {erros.email && <p className="erro">{erros.email}</p>}
      </div>

      <div className="campo">
        <label htmlFor="matricula">Matrícula</label>
        <input
          id="matricula"
          type="text"
          value={matricula}
          onChange={(event) => setMatricula(event.target.value)}
        />
        {erros.matricula && <p className="erro">{erros.matricula}</p>}
      </div>

      <div className="campo">
        <label htmlFor="curso">Curso</label>
        <select
          id="curso"
          value={curso}
          onChange={(event) => setCurso(event.target.value)}
        >
          <option value="">Selecione um curso</option>
          {cursos.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
        {erros.curso && <p className="erro">{erros.curso}</p>}
      </div>

      <div className="campo">
        <label htmlFor="dataNascimento">Data de nascimento</label>
        <input
          id="dataNascimento"
          type="date"
          value={dataNascimento}
          onChange={(event) => setDataNascimento(event.target.value)}
        />
        {erros.dataNascimento && (
          <p className="erro">{erros.dataNascimento}</p>
        )}
      </div>

      <button type="submit">Cadastrar Aluno</button>
    </form>
  );
}

export default CadastroAlunoForm;