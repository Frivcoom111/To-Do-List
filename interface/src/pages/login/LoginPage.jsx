import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("auth/login", {
        email: email,
        password: password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      navigate("/signup");
    } catch (error) {
      console.log(error);
      alert("Erro ao tentar logar.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <section className="login-banner">
          <p className="badge">To-Do Club</p>
          <h1>Organize seu dia sem perder o foco.</h1>
          <p>
            Acesse sua conta para acompanhar tarefas, metas semanais e seu
            progresso em tempo real.
          </p>
        </section>

        <section className="login-panel" aria-label="Painel de login">
          <h2>Entrar</h2>
          <p className="subtitle">Bem-vindo de volta</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="seunome@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Entrar</button>

            <p className="register-text">
              Novo por aqui? <Link to="/signup">Criar conta</Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
