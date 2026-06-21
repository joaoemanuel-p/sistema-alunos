import { useState } from "react";
import "./Cursos.css";
import Layout from "../../components/Layout/Layout";
import AccordionCurso from "../../components/AccordionCurso/AccordionCurso";
import { useAluno } from "../../context/AlunoContext";

function Cursos() {
  const { cursos, alunosPorCurso } = useAluno();
  const [cursoAbertoId, setCursoAbertoId] = useState(null);

  function handleToggle(cursoId) {
    setCursoAbertoId((idAtual) => (idAtual === cursoId ? null : cursoId));
  }

  return (
    <Layout>
      <h1>Cursos</h1>

      <div className="cursos-lista">
        {cursos.map((curso) => (
          <AccordionCurso
            key={curso.id}
            curso={curso}
            alunosDoCurso={alunosPorCurso(curso.id)}
            aberto={cursoAbertoId === curso.id}
            onToggle={() => handleToggle(curso.id)}
          />
        ))}
      </div>
    </Layout>
  );
}

export default Cursos;