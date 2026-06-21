import "./Layout.css";
import Navbar from "../Navbar/Navbar";
import Modal from "../Modal/Modal";
import CadastroAlunoForm from "../CadastroAlunoForm/CadastroAlunoForm";
import { useAluno } from "../../context/AlunoContext";

function Layout({ children }) {
  const { modalAberto, fecharModal } = useAluno();

  return (
    <>
      <Navbar />
      <main>{children}</main>

      <Modal
        aberto={modalAberto}
        onFechar={fecharModal}
        titulo="Novo Aluno"
      >
        <CadastroAlunoForm onSucesso={fecharModal} />
      </Modal>
    </>
  );
}

export default Layout;