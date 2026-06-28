import "./AccordionCurso.css";
import { useTurma } from "../../context/TurmaContext";

function AccordionCurso({ curso, alunosDoCurso, aberto, onToggle }) {
  const { turmas } = useTurma();

  function nomeDaTurma(turmaId) {
    const turma = turmas.find((t) => t.id === turmaId);
    return turma ? `${turma.nome} (${turma.turno})` : "Sem turma";
  }

  return (
    <div className="accordion-item">
      <button
        type="button"
        className="accordion-cabecalho"
        onClick={onToggle}
      >
        <div className="accordion-titulo">
          <h2>{curso.nome}</h2>
          <span className="accordion-subtitulo">
            {curso.duracaoAnos} anos · {alunosDoCurso.length} aluno(s)
          </span>
        </div>

        <span className={`accordion-seta ${aberto ? "aberta" : ""}`}>
          ▾
        </span>
      </button>

      {aberto && (
        <div className="accordion-corpo">
          <p className="accordion-descricao">{curso.descricao}</p>

          <div className="accordion-areas">
            <strong>Áreas de atuação:</strong>
            <ul>
              {curso.areasAtuacao.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>

          <p className="accordion-curiosidade">
            <strong>Curiosidade:</strong> {curso.curiosidade}
          </p>

          <hr className="accordion-divisor" />

          <h3 className="accordion-subtitulo-alunos">Alunos matriculados</h3>

          {alunosDoCurso.length === 0 ? (
            <p>Nenhum aluno matriculado neste curso ainda.</p>
          ) : (
            <ul className="accordion-lista-alunos">
              {alunosDoCurso.map((aluno) => (
                <li key={aluno.id}>
                  <strong>{aluno.nome}</strong> — Matrícula: {aluno.matricula}
                  {" — "}
                  {nomeDaTurma(aluno.turmaId)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default AccordionCurso;