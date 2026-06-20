import "./Listagem.css";
import Layout from "../../components/Layout/Layout";
import { useAluno } from "../../context/AlunoContext";

function Listagem() {
  const { alunos } = useAluno();

  return (
    <Layout>
      <h1>Listagem de Alunos</h1>

      <pre>
        {JSON.stringify(alunos, null, 2)}
      </pre>
    </Layout>
  );
}

export default Listagem;