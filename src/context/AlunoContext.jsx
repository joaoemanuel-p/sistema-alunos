import { createContext, useContext, useState, useEffect } from "react";
import { cursos } from "../data/cursos";

const AlunoContext = createContext();
const CHAVE_STORAGE = "alunos";

function carregarAlunosSalvos() {
  try {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

export function AlunoProvider({ children }) {
  const [alunos, setAlunos] = useState(carregarAlunosSalvos);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(alunos));
  }, [alunos]);

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

  function removerAluno(id) {
    setAlunos((alunosAnteriores) =>
      alunosAnteriores.filter((aluno) => aluno.id !== id)
    );
  }

  function editarAluno(id, dadosAtualizados) {
    setAlunos((alunosAnteriores) =>
      alunosAnteriores.map((aluno) =>
        aluno.id === id ? { ...aluno, ...dadosAtualizados } : aluno
      )
    );
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
        removerAluno,
        editarAluno,
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