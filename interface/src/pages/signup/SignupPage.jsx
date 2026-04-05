import "./SignupPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (password !== confirmPassword)
        return alert("Senhas estão diferentes.");

      const response = await api.post(
        "auth/register",
        {
          name: name,
          email: email,
          password: password,
        },
        { public: true },
      );

      alert(response.data.message);

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar usuário.");
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <section className="signup-banner">
          <p className="signup-badge">To-Do Club</p>
          <h1>Crie sua conta e comece a organizar melhor sua rotina.</h1>
          <p>
            Planeje tarefas, acompanhe seu progresso e mantenha o foco no que
            realmente importa.
          </p>
        </section>

        <section className="signup-panel" aria-label="Painel de cadastro">
          <h2>Criar Conta</h2>
          <p className="signup-subtitle">Leva menos de 1 minuto</p>

          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="confirm-password">Confirmar Senha</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Repita a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Criar conta</button>

            <p className="signin-text">
              Ja tem conta? <Link to="/">Entrar</Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}

export default SignupPage;
