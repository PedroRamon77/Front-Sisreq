import { Link, useNavigate } from "react-router-dom";
import "./SidebarAdmin.css";

export default function SidebarAdmin({
  itemAtivo,
}) {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const tipo = usuario?.tipo;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>
          Sis<span>Req.</span>
        </h1>
      </div>

      <nav className="sidebar-nav">

        {tipo === "SERVIDOR" && (
          <>
            <Link
              to="/dashboardservidor"
              className={`nav-item ${
                itemAtivo === "visao-geral"
                  ? "active"
                  : ""
              }`}
            >
              Visão Geral
            </Link>

            <Link
              to="/solicitacoes"
              className={`nav-item ${
                itemAtivo === "solicitacoes"
                  ? "active"
                  : ""
              }`}
            >
              Solicitações
            </Link>
          </>
        )}

        {tipo === "ADMIN" && (
          <>
            <Link
              to="/dashboardadmin"
              className={`nav-item ${
                itemAtivo === "visao-geral"
                  ? "active"
                  : ""
              }`}
            >
              Dashboard Admin
            </Link>

            <Link
              to="/gerenciarusuarios"
              className={`nav-item ${
                itemAtivo ===
                "gerenciar-usuarios"
                  ? "active"
                  : ""
              }`}
            >
              Gerenciar Usuários
            </Link>
          </>
        )}

        <button
          className="nav-item logout"
          onClick={handleLogout}
        >
          Sair do Sistema
        </button>
      </nav>
    </aside>
  );
}