import "./Navbar.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-badge">To-Do Club</span>
        </div>

        {/* Menu Desktop */}
        <ul className="navbar-menu">
          <li>
            <Link to="/home">Tarefas</Link>
          </li>
          <li>
            <Link to="/tasks/new">Criar tarefa</Link>
          </li>
        </ul>

        {/* User Profile & Logout */}
        <div className="navbar-end">
          <button className="profile-btn" title="Perfil do usuário">
            <div className="avatar">D</div>
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Sair
          </button>
        </div>

        {/* Hamburger Menu Mobile */}
        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <Link
              to="/home"
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              Tarefas
            </Link>
            <Link
              to="/tasks/new"
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              Criar tarefa
            </Link>
            <button className="logout-btn-mobile" onClick={handleLogout}>
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
