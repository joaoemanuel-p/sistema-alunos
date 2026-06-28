import { useState } from "react";
import { useAluno } from "../../context/AlunoContext";
import { useTurma } from "../../context/TurmaContext";
import "./CadastroAlunoForm.css";

const OPCOES_STATUS = [
  { valor: "ativo", label: "Ativo" },
  { valor: "inativo", label: "Inativo" },
  { valor: "trancado", label: "Trancado" },
  { valor: "transferido", label: "Transferido" },
];

function CadastroAlunoForm({ aluno, onSucesso }) {
  const { cursos, alunos, adicionarAluno, editarAluno } = useAluno();
  const { turmasPorCurso } = useTurma();
  const editando = Boolean(aluno);

  const [nome, setNome] = useState(aluno?.nome || "");
  const [email, setEmail] = useState(aluno?.email || "");
  const [matricula, setMatricula] = useState(aluno?.matricula || "");
  const [curso, setCurso] = useState(aluno?.curso || "");
  const [turmaId, setTurmaId] = useState(aluno?.turmaId || "");
  const [dataNascimento, setDataNascimento] = useState(
    aluno?.dataNascimento || ""
  );
  const [status, setStatus] = useState(aluno?.status || "ativo");
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);

  const turmasDisponiveis = curso ? turmasPorCurso(curso) : [];

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
    } else {
      const duplicada = alunos.some(
        (a) => a.matricula === matricula.trim() && a.id !== aluno?.id
      );
      if (duplicada) {
        novosErros.matricula = "Já existe um aluno com essa matrícula.";
      }
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
    setTurmaId("");
    setDataNascimento("");
    setStatus("ativo");
    setErros({});
  }

  function handleSubmit(event) {
    event.preventDefault();

    const novosErros = validar();

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    const dados = {
      nome: nome.trim(),
      email: email.trim(),
      matricula: matricula.trim(),
      curso,
      turmaId: turmaId || null,
      dataNascimento,
      status,
    };

    if (editando) {
      editarAluno(aluno.id, dados);
    } else {
      adicionarAluno(dados);
      limparFormulario();
    }

    setSucesso(true);

    setTimeout(() => {
      setSucesso(false);

      if (onSucesso) {
        onSucesso();
      }
    }, 1200);
  }

  function handleMudarCurso(novoCursoId) {
    setCurso(novoCursoId);
    setTurmaId("");
  }

  if (sucesso) {
    return (
      <div className="form-sucesso">
        <span className="form-sucesso-icone">✓</span>
        <p>{editando ? "Aluno atualizado com sucesso!" : "Aluno cadastrado com sucesso!"}</p>
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
          onChange={(event) => handleMudarCurso(event.target.value)}
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
        <label htmlFor="turma">Turma</label>
        <select
          id="turma"
          value={turmaId}
          onChange={(event) =>
            setTurmaId(event.target.value ? Number(event.target.value) : "")
          }
          disabled={!curso}
        >
          <option value="">
            {curso ? "Sem turma" : "Selecione um curso primeiro"}
          </option>
          {turmasDisponiveis.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {turma.nome} ({turma.turno})
            </option>
          ))}
        </select>
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

      <div className="campo">
        <label htmlFor="status">Status da matrícula</label>
        <select
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          {OPCOES_STATUS.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.label}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">
        {editando ? "Salvar Alterações" : "Cadastrar Aluno"}
      </button>
    </form>
  );
}

export default CadastroAlunoForm;