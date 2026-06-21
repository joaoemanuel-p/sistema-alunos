import "./Dashboard.css";
import Layout from "../../components/Layout/Layout";
import { useAluno } from "../../context/AlunoContext";

function Dashboard() {
  const { alunos, cursos, alunosPorCurso } = useAluno();

  const dadosPorCurso = cursos.map((curso) => ({
    ...curso,
    totalAlunos: alunosPorCurso(curso.id).length,
  }));

  const maiorContagem = Math.max(
    1,
    ...dadosPorCurso.map((c) => c.totalAlunos)
  );

  const cursoMaisPopular = dadosPorCurso.reduce((maior, atual) =>
    atual.totalAlunos > maior.totalAlunos ? atual : maior
  );

  const cursoMaiorDuracao = dadosPorCurso.reduce((maior, atual) =>
    atual.duracaoAnos > maior.duracaoAnos ? atual : maior
  );

  const cursoMenorDuracao = dadosPorCurso.reduce((menor, atual) =>
    atual.duracaoAnos < menor.duracaoAnos ? atual : menor
  );

  return (
    <Layout>
      <h1>Dashboard</h1>

      <section className="dashboard-resumo">
        <div className="dashboard-stat-card">
          <span className="dashboard-stat-numero">{alunos.length}</span>
          <span className="dashboard-stat-label">Alunos cadastrados</span>
        </div>

        <div className="dashboard-stat-card">
          <span className="dashboard-stat-numero">{cursos.length}</span>
          <span className="dashboard-stat-label">Cursos disponíveis</span>
        </div>

        <div className="dashboard-stat-card">
          <span className="dashboard-stat-numero">
            {cursoMaisPopular.totalAlunos > 0
              ? cursoMaisPopular.nome
              : "Nenhum ainda"}
          </span>
          <span className="dashboard-stat-label">Curso mais popular</span>
        </div>
      </section>

      <section className="dashboard-destaques">
        <div className="dashboard-destaque-card">
          <h3>Maior duração</h3>
          <p>{cursoMaiorDuracao.nome}</p>
          <span>{cursoMaiorDuracao.duracaoAnos} anos</span>
        </div>

        <div className="dashboard-destaque-card">
          <h3>Menor duração</h3>
          <p>{cursoMenorDuracao.nome}</p>
          <span>{cursoMenorDuracao.duracaoAnos} anos</span>
        </div>
      </section>

      <section className="dashboard-grafico">
        <h2>Alunos por curso</h2>

        {alunos.length === 0 ? (
          <p>Nenhum aluno cadastrado ainda para gerar o gráfico.</p>
        ) : (
          <div className="dashboard-barras">
            {dadosPorCurso.map((curso) => (
              <div className="dashboard-barra-linha" key={curso.id}>
                <span className="dashboard-barra-label">{curso.nome}</span>

                <div className="dashboard-barra-trilha">
                  <div
                    className="dashboard-barra-preenchimento"
                    style={{
                      width: `${(curso.totalAlunos / maiorContagem) * 100}%`,
                    }}
                  />
                </div>

                <span className="dashboard-barra-valor">
                  {curso.totalAlunos}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Dashboard;