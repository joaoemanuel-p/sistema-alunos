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

      <section className="home-como-funciona">
        <h2 className="home-secao-titulo">Como funciona</h2>

        <div className="home-passos">
          <div className="home-passo">
            <span className="home-passo-numero">1</span>
            <h3>Cadastre um aluno</h3>
            <p>
              Clique em "Novo Aluno" em qualquer página e preencha nome,
              e-mail, matrícula, curso e data de nascimento.
            </p>
          </div>

          <div className="home-passo">
            <span className="home-passo-numero">2</span>
            <h3>Consulte os alunos</h3>
            <p>
              Acesse a página Alunos para ver todos os cadastros, com
              dados completos de cada um.
            </p>
          </div>

          <div className="home-passo">
            <span className="home-passo-numero">3</span>
            <h3>Explore os cursos</h3>
            <p>
              Na página Cursos, veja descrições, áreas de atuação e quais
              alunos estão matriculados em cada curso.
            </p>
          </div>

          <div className="home-passo">
            <span className="home-passo-numero">4</span>
            <h3>Acompanhe o Dashboard</h3>
            <p>
              Visualize estatísticas gerais, como o curso mais popular e
              a distribuição de alunos por curso.
            </p>
          </div>
        </div>
      </section>

      <section className="home-sobre">
        <h2 className="home-secao-titulo">Sobre o projeto</h2>
        <p>
          Este sistema foi desenvolvido como parte de um projeto acadêmico
          com o objetivo de aplicar conceitos de desenvolvimento frontend
          com React, incluindo roteamento entre páginas, formulários
          controlados com validação, gerenciamento de estado compartilhado
          e integração com uma API REST externa.
        </p>
        <p>
          A aplicação simula um cenário real de gestão escolar, permitindo
          cadastrar alunos, vinculá-los a cursos e acompanhar informações
          consolidadas de forma simples e organizada.
        </p>
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