import { useState } from "react";
import "./Turmas.css";
import Layout from "../../components/Layout/Layout";
import { useAluno } from "../../context/AlunoContext";
import { useTurma } from "../../context/TurmaContext";

const TURNOS = ["Manhã", "Tarde", "Noite"];

function Turmas() {
  const { cursos, alunos } = useAluno();
  const { turmas, criarTurma, removerTurma, editarTurma, turmasPorCurso } = useTurma();

  const [cursoSelecionado, setCursoSelecionado] = useState(cursos[0]?.id || "");
  const [nomeTurma, setNomeTurma] = useState("");
  const [turno, setTurno] = useState(TURNOS[0]);
  const [erro, setErro] = useState("");

  const [turmaEditandoId, setTurmaEditandoId] = useState(null);
  const [nomeEdicao, setNomeEdicao] = useState("");
  const [turnoEdicao, setTurnoEdicao] = useState(TURNOS[0]);

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

  function iniciarEdicao(turma) {
    setTurmaEditandoId(turma.id);
    setNomeEdicao(turma.nome);
    setTurnoEdicao(turma.turno);
  }

  function cancelarEdicao() {
    setTurmaEditandoId(null);
  }

  function salvarEdicao(event) {
    event.preventDefault();

    if (!nomeEdicao.trim()) {
      return;
    }

    editarTurma(turmaEditandoId, {
      nome: nomeEdicao.trim(),
      turno: turnoEdicao,
    });

    setTurmaEditandoId(null);
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
          turmasDoCurso.map((turma) => {
            const editando = turmaEditandoId === turma.id;

            return (
              <div className="turma-card" key={turma.id}>
                {editando ? (
                  <form className="turma-card-edicao" onSubmit={salvarEdicao}>
                    <div className="campo">
                      <label htmlFor={`nome-${turma.id}`}>Nome</label>
                      <input
                        id={`nome-${turma.id}`}
                        type="text"
                        value={nomeEdicao}
                        onChange={(event) => setNomeEdicao(event.target.value)}
                        autoFocus
                      />
                    </div>

                    <div className="campo">
                      <label htmlFor={`turno-${turma.id}`}>Turno</label>
                      <select
                        id={`turno-${turma.id}`}
                        value={turnoEdicao}
                        onChange={(event) => setTurnoEdicao(event.target.value)}
                      >
                        {TURNOS.map((opcao) => (
                          <option key={opcao} value={opcao}>
                            {opcao}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="turma-card-acoes">
                      <button type="submit">Salvar</button>
                      <button type="button" onClick={cancelarEdicao}>
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="turma-card-cabecalho">
                      <div>
                        <h2>{turma.nome}</h2>
                        <span className="turma-card-turno">{turma.turno}</span>
                      </div>

                      <div className="turma-card-acoes">
                        <button type="button" onClick={() => iniciarEdicao(turma)}>
                          Editar
                        </button>
                        <button
                          type="button"
                          className="botao-excluir"
                          onClick={() => removerTurma(turma.id)}
                        >
                          Excluir
                        </button>
                      </div>
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
                  </>
                )}
              </div>
            );
          })
        )}
      </section>
    </Layout>
  );
}

export default Turmas;