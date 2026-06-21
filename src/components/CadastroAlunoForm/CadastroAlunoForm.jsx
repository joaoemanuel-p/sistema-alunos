import { useState } from "react";
import { useAluno } from "../../context/AlunoContext";
import "./CadastroAlunoForm.css";

function CadastroAlunoForm({ onSucesso }) {
  const { cursos, alunos, adicionarAluno } = useAluno();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);

  function validarEmail(valor) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(valor);
  }

  function validar() {
    const novosErros = {};

    if (!nome.trim()) {
      novosErros.nome = "Informe o nome.";
    } else if (nome.trim().length < 3) {
      novosErros.nome = "O nome deve ter pelo menos 3 caracteres.";
    }

    if (!email.trim()) {
      novosErros.email = "Informe o e-mail.";
    } else if (!validarEmail(email.trim())) {
      novosErros.email = "Informe um e-mail válido (ex: nome@dominio.com).";
    }

    if (!matricula.trim()) {
      novosErros.matricula = "Informe a matrícula.";
    } else if (
      alunos.some((aluno) => aluno.matricula === matricula.trim())
    ) {
      novosErros.matricula = "Já existe um aluno com essa matrícula.";
    }

    if (!curso) {
      novosErros.curso = "Selecione um curso.";
    }

    if (!dataNascimento) {
      novosErros.dataNascimento = "Informe a data de nascimento.";
    } else {
      const dataSelecionada = new Date(dataNascimento);
      const hoje = new Date();

      if (dataSelecionada > hoje) {
        novosErros.dataNascimento =
          "A data de nascimento não pode estar no futuro.";
      }
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
      nome: nome.trim(),
      email: email.trim(),
      matricula: matricula.trim(),
      curso,
      dataNascimento,
    });

    setSucesso(true);
    limparFormulario();

    setTimeout(() => {
      setSucesso(false);

      if (onSucesso) {
        onSucesso();
      }
    }, 1200);
  }

  if (sucesso) {
    return (
      <div className="form-sucesso">
        <span className="form-sucesso-icone">✓</span>
        <p>Aluno cadastrado com sucesso!</p>
      </div>
    );
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
          className={erros.nome ? "campo-invalido" : ""}
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
          className={erros.email ? "campo-invalido" : ""}
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
          className={erros.matricula ? "campo-invalido" : ""}
        />
        {erros.matricula && <p className="erro">{erros.matricula}</p>}
      </div>

      <div className="campo">
        <label htmlFor="curso">Curso</label>
        <select
          id="curso"
          value={curso}
          onChange={(event) => setCurso(event.target.value)}
          className={erros.curso ? "campo-invalido" : ""}
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
          className={erros.dataNascimento ? "campo-invalido" : ""}
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