import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../../services/api";
import "./DashboardServidor.css";
import SidebarServidor from "../layout/sidebar/SidebarServidor";

export default function DashboardServidor() {

  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const nome = usuario?.nome || "Servidor";
  const tipo = usuario?.tipo || "SERVIDOR";

  const [loading, setLoading] = useState(true);

  const [dados, setDados] = useState({
    totalPendentes: 0,
    totalAnalise: 0,
    totalFinalizados: 0,
    requerimentos: []
  });

  useEffect(() => {
    carregarDashboard();
  }, []);

  async function carregarDashboard() {
    try {
      const response = await api.get(
        "/dashboard/servidor"
      );

      setDados(response.data);

    } catch (error) {
      console.error(error);
      alert("Erro ao carregar dashboard");

    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="dashboard-container">

        <SidebarServidor itemAtivo="visao-geral"/>

        <main className="main-content">
          <h2>Carregando...</h2>
        </main>

      </div>
    );
  }

  return (
    <div className="dashboard-container">

      <SidebarServidor itemAtivo="visao-geral"/>

      <main className="main-content admin-content">

        <header className="welcome-row">

          <div>

            <h2 className="welcome-title">
              Bem-vindo ao <span>SisReq.</span>
            </h2>

            <p>
              Servidor logado:
              <strong> {nome}</strong>
            </p>

            <p>
              Perfil:
              <strong> {tipo}</strong>
            </p>

            <p>
              Gerencie solicitações acadêmicas.
            </p>

          </div>

          <Link
            to="/solicitacoes"
            className="btn-novo"
          >
            VER SOLICITAÇÕES
          </Link>

        </header>

        <section className="admin-cards-grid">

          <div className="admin-card outline-green">

            <span className="admin-card-label">
              PENDENTES
            </span>

            <span className="admin-card-value text-green">
              {dados.totalPendentes}
            </span>

          </div>

          <div className="admin-card outline-gray">

            <span className="admin-card-label">
              EM ANÁLISE
            </span>

            <span className="admin-card-value text-green">
              {dados.totalAnalise}
            </span>

          </div>

          <div className="admin-card outline-green">

            <span className="admin-card-label">
              FINALIZADOS
            </span>

            <span className="admin-card-value text-green">
              {dados.totalFinalizados}
            </span>

          </div>

        </section>

        <section className="admin-table-section">

          <div className="table-header">
            <h3>Requerimentos Recentes</h3>
          </div>

          <div className="table-container">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Aluno</th>
                  <th>Tipo</th>
                  <th>Protocolo</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>

              <tbody>

                {dados.requerimentos.length === 0 ? (

                  <tr>
                    <td colSpan="5">
                      Nenhum requerimento encontrado
                    </td>
                  </tr>

                ) : (

                  dados.requerimentos.map(item => (

                    <tr key={item.id}>

                      <td>
                        {item.usuario?.nome}
                      </td>

                      <td>
                        {item.tipo}
                      </td>

                      <td>
                        {item.protocolo}
                      </td>

                      <td>

                        <span
                          className={
                            `status-pill ${item.status.toLowerCase()}`
                          }
                        >
                          {item.status}
                        </span>

                      </td>

                      <td>

                        <button
                          className="btn-action btn-gray"
                          onClick={() =>
                            navigate(
                              `/analise-requerimento/${item.id}`
                            )
                          }
                        >
                          Analisar
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}