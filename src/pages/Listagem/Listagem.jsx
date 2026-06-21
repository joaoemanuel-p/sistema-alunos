import { useEffect, useState } from "react";
import "./Listagem.css";
import Layout from "../../components/Layout/Layout";
import { useAluno } from "../../context/AlunoContext";
import { buscarUsuarios } from "../../services/usuarioService";

function Listagem() {
  const { alunos } = useAluno();

  const [usuariosApi, setUsuariosApi] = useState([]);

  useEffect(() => {
    async function carregarUsuarios() {
      const usuarios = await buscarUsuarios();
      setUsuariosApi(usuarios);
    }

    carregarUsuarios();
  }, []);

  return (
    <Layout>
      <h1>Listagem de Alunos</h1>

      <section>
        <h2>Alunos cadastrados</h2>

        {alunos.length === 0 ? (
          <p>Nenhum aluno cadastrado.</p>
        ) : (
          <div className="alunos-lista">
            {alunos.map((aluno) => (
              <div className="aluno-card" key={aluno.id}>
                <h3>{aluno.nome}</h3>

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
      </section>

      <section>
        <h2>Usuários da API</h2>

        <div className="alunos-lista">
          {usuariosApi.map((usuario) => (
            <div className="aluno-card" key={usuario.id}>
              <h3>{usuario.name}</h3>

              <p>
                <strong>E-mail:</strong> {usuario.email}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Listagem;