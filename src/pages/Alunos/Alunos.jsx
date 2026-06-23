import { useEffect, useState } from "react";
import "./Alunos.css";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/Modal/Modal";
import CadastroAlunoForm from "../../components/CadastroAlunoForm/CadastroAlunoForm";
import { useAluno } from "../../context/AlunoContext";
import { buscarUsuarios } from "../../services/usuarioService";

function Alunos() {
  const { alunos, cursos, removerAluno } = useAluno();

  const [usuariosApi, setUsuariosApi] = useState([]);
  const [carregandoApi, setCarregandoApi] = useState(true);
  const [erroApi, setErroApi] = useState(false);
  const [alunoEditando, setAlunoEditando] = useState(null);
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(null);

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

  function confirmarExclusao() {
    removerAluno(confirmandoExclusao);
    setConfirmandoExclusao(null);
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

                <div className="aluno-card-acoes">
                  <button
                    type="button"
                    onClick={() => setAlunoEditando(aluno)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="botao-excluir"
                    onClick={() => setConfirmandoExclusao(aluno.id)}
                  >
                    Excluir
                  </button>
                </div>
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

      <Modal
        aberto={Boolean(alunoEditando)}
        onFechar={() => setAlunoEditando(null)}
        titulo="Editar Aluno"
      >
        {alunoEditando && (
          <CadastroAlunoForm
            aluno={alunoEditando}
            onSucesso={() => setAlunoEditando(null)}
          />
        )}
      </Modal>

      <Modal
        aberto={Boolean(confirmandoExclusao)}
        onFechar={() => setConfirmandoExclusao(null)}
        titulo="Excluir Aluno"
      >
        <p>Tem certeza que deseja excluir este aluno?</p>
        <div className="aluno-card-acoes">
          <button type="button" onClick={() => setConfirmandoExclusao(null)}>
            Cancelar
          </button>
          <button type="button" className="botao-excluir" onClick={confirmarExclusao}>
            Confirmar
          </button>
        </div>
      </Modal>
    </Layout>
  );
}

export default Alunos;