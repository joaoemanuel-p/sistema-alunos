import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useAuth } from "./AuthContext";

const TurmaContext = createContext();
const CHAVE_STORAGE = "turmas";

function carregarTodasTurmas() {
  try {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

export function TurmaProvider({ children }) {
  const { usuarioAtual } = useAuth();
  const [todasTurmas, setTodasTurmas] = useState(carregarTodasTurmas);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(todasTurmas));
    } catch (error) {
      console.error("Não foi possível salvar as turmas no localStorage:", error);
    }
  }, [todasTurmas]);

  const turmas = useMemo(() => {
    if (!usuarioAtual) {
      return [];
    }
    return todasTurmas.filter((turma) => turma.usuarioId === usuarioAtual.id);
  }, [todasTurmas, usuarioAtual]);

  function criarTurma({ nome, turno, cursoId }) {
    if (!usuarioAtual) {
      return;
    }

    const novaTurma = {
      id: Date.now(),
      usuarioId: usuarioAtual.id,
      nome,
      turno,
      cursoId,
    };

    setTodasTurmas((turmasAnteriores) => [...turmasAnteriores, novaTurma]);
  }

  function removerTurma(id) {
    setTodasTurmas((turmasAnteriores) =>
      turmasAnteriores.filter((turma) => turma.id !== id)
    );
  }

  function turmasPorCurso(cursoId) {
    return turmas.filter((turma) => turma.cursoId === cursoId);
  }

  return (
    <TurmaContext.Provider
      value={{
        turmas,
        criarTurma,
        removerTurma,
        turmasPorCurso,
      }}
    >
      {children}
    </TurmaContext.Provider>
  );
}

export function useTurma() {
  return useContext(TurmaContext);
}