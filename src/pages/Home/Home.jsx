import { Link } from "react-router-dom";
import "./Home.css";
import Layout from "../../components/Layout/Layout";
import { useAluno } from "../../context/AlunoContext";

function Home() {
  const { alunos, cursos } = useAluno();

  return (
    <Layout>
      <section className="home-hero">
        <h1>Sistema de Gestão de Alunos</h1>
        <p>
          Gerencie alunos e cursos de forma simples, com cadastro rápido
          e visualização organizada.
        </p>
      </section>

      <section className="home-cards">
        <Link to="/alunos" className="home-card">
          <h2>Alunos</h2>
          <p>{alunos.length} aluno(s) cadastrado(s)</p>
          <span className="home-card-link">Ver alunos →</span>
        </Link>

        <Link to="/cursos" className="home-card">
          <h2>Cursos</h2>
          <p>{cursos.length} curso(s) disponível(is)</p>
          <span className="home-card-link">Ver cursos →</span>
        </Link>

        <Link to="/dashboard" className="home-card">
          <h2>Dashboard</h2>
          <p>Veja estatísticas gerais do sistema</p>
          <span className="home-card-link">Ver dashboard →</span>
        </Link>
      </section>

      <footer className="home-footer">
        <div className="home-footer-bloco">
          <h3>Integrantes</h3>
          <ul className="home-footer-lista-horizontal">
            <li>João Emanuel Pinheiro</li>
            <li>Gabriel Santana</li>
            <li>Iago Rodrigues</li>
          </ul>
        </div>

        <div className="home-footer-bloco">
          <h3>Tecnologias utilizadas</h3>
          <ul className="home-footer-lista-horizontal">
            <li>React</li>
            <li>React Router</li>
            <li>Vite</li>
            <li>Docker</li>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>ESLint</li>
            <li>Node.js</li>
            <li>REST API</li>
          </ul>
        </div>
      </footer>
    </Layout>
  );
}

export default Home;