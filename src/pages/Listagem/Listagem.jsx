import "./Listagem.css";
import Layout from "../../components/Layout/Layout";
import { useAluno } from "../../context/AlunoContext";

function Listagem() {
  const { alunos } = useAluno();

  return (
    <Layout>
      <h1>Listagem de Alunos</h1>

      {alunos.length === 0 ? (
        <p>Nenhum aluno cadastrado.</p>
      ) : (
        <div className="alunos-lista">
          {alunos.map((aluno) => (
            <div className="aluno-card" key={aluno.id}>
              <h2>{aluno.nome}</h2>

              <p>
                <strong>E-mail:</strong> {aluno.email}
              </p>

              <p>
                <strong>Curso:</strong> {aluno.curso}
              </p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Listagem;