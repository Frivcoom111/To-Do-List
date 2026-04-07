import "./Navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
                    <li><a href="/home">Tarefas</a></li>
                    <li><a href="/tasks/new">Criar tarefa</a></li>
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
                        <a href="#home" className="mobile-link">Tarefas</a>
                        <a href="#stats" className="mobile-link">Estatísticas</a>
                        <a href="#help" className="mobile-link">Ajuda</a>
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