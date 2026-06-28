import { useState } from "react";
import "./Turmas.css";
import Layout from "../../components/Layout/Layout";
import { useAluno } from "../../context/AlunoContext";
import { useTurma } from "../../context/TurmaContext";

const TURNOS = ["Manhã", "Tarde", "Noite"];

function Turmas() {
  const { cursos, alunos } = useAluno();
  const { turmas, criarTurma, removerTurma, turmasPorCurso } = useTurma();

  const [cursoSelecionado, setCursoSelecionado] = useState(cursos[0]?.id || "");
  const [nomeTurma, setNomeTurma] = useState("");
  const [turno, setTurno] = useState(TURNOS[0]);
  const [erro, setErro] = useState("");

  const turmasDoCurso = turmasPorCurso(cursoSelecionado);

  function alunosDaTurma(turmaId) {
    return alunos.filter((aluno) => aluno.turmaId === turmaId);
  }

  function handleCriarTurma(event) {
    event.preventDefault();
    setErro("");

    if (!nomeTurma.trim()) {
      setErro("Informe um nome para a turma.");
      return;
    }

    criarTurma({
      nome: nomeTurma.trim(),
      turno,
      cursoId: cursoSelecionado,
    });

    setNomeTurma("");
  }

  return (
    <Layout>
      <h1>Turmas</h1>

      <section className="turmas-filtro-curso">
        <label htmlFor="cursoSelecionado">Curso</label>
        <select
          id="cursoSelecionado"
          value={cursoSelecionado}
          onChange={(event) => setCursoSelecionado(event.target.value)}
        >
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nome}
            </option>
          ))}
        </select>
      </section>

      <form className="turmas-form" onSubmit={handleCriarTurma}>
        <div className="campo">
          <label htmlFor="nomeTurma">Nova turma</label>
          <input
            id="nomeTurma"
            type="text"
            placeholder="Ex: Turma A"
            value={nomeTurma}
            onChange={(event) => setNomeTurma(event.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="turno">Turno</label>
          <select
            id="turno"
            value={turno}
            onChange={(event) => setTurno(event.target.value)}
          >
            {TURNOS.map((opcao) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Criar turma</button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      <section className="turmas-lista">
        {turmasDoCurso.length === 0 ? (
          <p>Nenhuma turma cadastrada para este curso ainda.</p>
        ) : (
          turmasDoCurso.map((turma) => (
            <div className="turma-card" key={turma.id}>
              <div className="turma-card-cabecalho">
                <div>
                  <h2>{turma.nome}</h2>
                  <span className="turma-card-turno">{turma.turno}</span>
                </div>

                <button
                  type="button"
                  className="botao-excluir"
                  onClick={() => removerTurma(turma.id)}
                >
                  Excluir
                </button>
              </div>

              <p className="turma-card-contagem">
                {alunosDaTurma(turma.id).length} aluno(s) nessa turma
              </p>

              {alunosDaTurma(turma.id).length > 0 && (
                <ul className="turma-card-alunos">
                  {alunosDaTurma(turma.id).map((aluno) => (
                    <li key={aluno.id}>{aluno.nome}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </section>
    </Layout>
  );
}

export default Turmas;