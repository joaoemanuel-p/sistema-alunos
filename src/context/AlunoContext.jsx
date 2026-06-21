import { createContext, useContext, useState } from "react";
import { cursos } from "../data/cursos";

const AlunoContext = createContext();

export function AlunoProvider({ children }) {
  const [alunos, setAlunos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);

  function adicionarAluno(dadosAluno) {
    const novoAluno = {
      id: Date.now(),
      ...dadosAluno,
    };

    setAlunos((alunosAnteriores) => [
      ...alunosAnteriores,
      novoAluno,
    ]);
  }

  function abrirModal() {
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function alunosPorCurso(cursoId) {
    return alunos.filter((aluno) => aluno.curso === cursoId);
  }

  return (
    <AlunoContext.Provider
      value={{
        alunos,
        cursos,
        adicionarAluno,
        modalAberto,
        abrirModal,
        fecharModal,
        alunosPorCurso,
      }}
    >
      {children}
    </AlunoContext.Provider>
  );
}

export function useAluno() {
  return useContext(AlunoContext);
}