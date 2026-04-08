import "./NotFoundPage.css";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="not-found-page">
      <div
        className="not-found-glow not-found-glow-left"
        aria-hidden="true"
      ></div>
      <div
        className="not-found-glow not-found-glow-right"
        aria-hidden="true"
      ></div>

      <section className="not-found-card" aria-labelledby="not-found-title">
        <p className="not-found-code">Erro 404</p>
        <h1 id="not-found-title">Essa rota saiu da lista</h1>
        <p className="not-found-description">
          A URL que voce tentou acessar nao existe. Volte para a pagina inicial
          ou retorne para a tela anterior.
        </p>

        <div className="not-found-actions">
          <button
            type="button"
            className="not-found-btn not-found-btn-primary"
            onClick={() => navigate("/")}
          >
            Ir para inicio
          </button>

          <button
            type="button"
            className="not-found-btn not-found-btn-secondary"
            onClick={() => navigate(-1)}
          >
            Voltar
          </button>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
