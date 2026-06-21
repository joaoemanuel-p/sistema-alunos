import { useEffect, useState } from "react";
import "./Alunos.css";
import Layout from "../../components/Layout/Layout";
import { useAluno } from "../../context/AlunoContext";
import { buscarUsuarios } from "../../services/usuarioService";

function Alunos() {
  const { alunos, cursos } = useAluno();

  const [usuariosApi, setUsuariosApi] = useState([]);
  const [carregandoApi, setCarregandoApi] = useState(true);
  const [erroApi, setErroApi] = useState(false);

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const usuarios = await buscarUsuarios();
        setUsuariosApi(usuarios);
      } catch (error) {
        setErroApi(true);
      } finally {
        setCarregandoApi(false);
      }
    }

    carregarUsuarios();
  }, []);

  function nomeDoCurso(cursoId) {
    const curso = cursos.find((c) => c.id === cursoId);
    return curso ? curso.nome : "Curso não encontrado";
  }

  function formatarData(data) {
    if (!data) {
      return "Não informado";
    }

    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <Layout>
      <h1>Alunos</h1>

      <section>
        {alunos.length === 0 ? (
          <p>Nenhum aluno cadastrado ainda.</p>
        ) : (
          <div className="alunos-lista">
            {alunos.map((aluno) => (
              <div className="aluno-card" key={aluno.id}>
                <h2>{aluno.nome}</h2>

                <p>
                  <strong>E-mail:</strong> {aluno.email}
                </p>

                <p>
                  <strong>Matrícula:</strong> {aluno.matricula}
                </p>

                <p>
                  <strong>Curso:</strong> {nomeDoCurso(aluno.curso)}
                </p>

                <p>
                  <strong>Nascimento:</strong>{" "}
                  {formatarData(aluno.dataNascimento)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="alunos-api-section">
        <h2>Usuários da API (JSONPlaceholder)</h2>

        {carregandoApi && <p>Carregando usuários...</p>}

        {erroApi && (
          <p>Não foi possível carregar os usuários da API agora.</p>
        )}

        {!carregandoApi && !erroApi && (
          <div className="alunos-lista">
            {usuariosApi.map((usuario) => (
              <div className="aluno-card" key={usuario.id}>
                <h2>{usuario.name}</h2>

                <p>
                  <strong>E-mail:</strong> {usuario.email}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Alunos;