import "./Modal.css";

function Modal({ aberto, onFechar, titulo, children }) {
  if (!aberto) {
    return null;
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onFechar();
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-conteudo">
        <div className="modal-cabecalho">
          <h2>{titulo}</h2>
          <button
            type="button"
            className="modal-fechar"
            onClick={onFechar}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="modal-corpo">{children}</div>
      </div>
    </div>
  );
}

export default Modal;   
