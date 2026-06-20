import { createContext, useContext, useState } from "react";

const AlunoContext = createContext();

export function AlunoProvider({ children }) {
  const [alunos, setAlunos] = useState([]);

  function adicionarAluno(nome, email, curso) {
    const novoAluno = {
      id: Date.now(),
      nome,
      email,
      curso,
    };

    setAlunos((alunosAnteriores) => [
      ...alunosAnteriores,
      novoAluno,
    ]);
  }

  return (
    <AlunoContext.Provider
      value={{
        alunos,
        adicionarAluno,
      }}
    >
      {children}
    </AlunoContext.Provider>
  );
}

export function useAluno() {
  return useContext(AlunoContext);
}