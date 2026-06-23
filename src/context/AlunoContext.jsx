import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { cursos } from "../data/cursos";
import { useAuth } from "./AuthContext";

const AlunoContext = createContext();
const CHAVE_STORAGE = "alunos";

function carregarTodosAlunos() {
  try {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

export function AlunoProvider({ children }) {
  const { usuarioAtual } = useAuth();
  const [todosAlunos, setTodosAlunos] = useState(carregarTodosAlunos);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(todosAlunos));
    } catch (error) {
      console.error("Não foi possível salvar os alunos no localStorage:", error);
    }
  }, [todosAlunos]);

  // Cada conta só vê os alunos que ela mesma cadastrou
  const alunos = useMemo(() => {
    if (!usuarioAtual) {
      return [];
    }
    return todosAlunos.filter((aluno) => aluno.usuarioId === usuarioAtual.id);
  }, [todosAlunos, usuarioAtual]);

  function adicionarAluno(dadosAluno) {
    if (!usuarioAtual) {
      return;
    }

    const novoAluno = {
      id: Date.now(),
      usuarioId: usuarioAtual.id,
      status: "ativo",
      ...dadosAluno,
    };

    setTodosAlunos((alunosAnteriores) => [
      ...alunosAnteriores,
      novoAluno,
    ]);
  }

  function removerAluno(id) {
    setTodosAlunos((alunosAnteriores) =>
      alunosAnteriores.filter((aluno) => aluno.id !== id)
    );
  }

  function editarAluno(id, dadosAtualizados) {
    setTodosAlunos((alunosAnteriores) =>
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