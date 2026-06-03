import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Solicitacoes.css";
import SidebarAdmin from "../layout/sidebar/SidebarAdmin";

export default function Solicitacoes() {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] =
    useState("");
  const [solicitacoes, setSolicitacoes] =
    useState([]);

  async function carregarSolicitacoes() {
    try {
      const token =
        localStorage.getItem("token");

      const endpoint =
        usuario?.tipo === "ALUNO"
          ? "http://localhost:3000/requerimentos/meus"
          : "http://localhost:3000/requerimentos";

      const response = await axios.get(
        endpoint,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params:
            usuario?.tipo === "ALUNO"
              ? {}
              : {
                  busca,
                  status:
                    filtroStatus || undefined,
                },
        }
      );

      setSolicitacoes(response.data);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.erro ||
          "Erro ao carregar solicitações"
      );
    }
  }

  useEffect(() => {
    carregarSolicitacoes();
  }, [busca, filtroStatus]);

  return (
    <div className="dashboard-container">
      <SidebarAdmin itemAtivo="solicitacoes" />

      <main className="admin-content solicitacoes-content">
        <header className="solicitacoes-header">
          <div className="solicitacoes-title-group">
            <h2>
              {usuario?.tipo === "ALUNO"
                ? "Minhas "
                : "Todas as "}
              <span>Solicitações</span>
            </h2>

            <p>
              {usuario?.tipo === "ALUNO"
                ? "Acompanhe seus requerimentos acadêmicos."
                : "Acompanhe e filtre todo o histórico de requerimentos acadêmicos."}
            </p>
          </div>
        </header>

        {usuario?.tipo !== "ALUNO" && (
          <section className="users-toolbar">
            <div className="search-box">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                ></circle>

                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                ></line>
              </svg>

              <input
                type="text"
                placeholder="Buscar por protocolo, aluno ou curso..."
                value={busca}
                onChange={(e) =>
                  setBusca(e.target.value)
                }
              />
            </div>

            <div className="filters-group">
              <select
                className="filter-select"
                value={filtroStatus}
                onChange={(e) =>
                  setFiltroStatus(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Todos os Status
                </option>

                <option value="ABERTO">
                  Aberto
                </option>

                <option value="EM_ANALISE">
                  Em Análise
                </option>

                <option value="AGUARDANDO_AJUSTE">
                  Aguardando Ajuste
                </option>

                <option value="DEFERIDO">
                  Deferido
                </option>

                <option value="INDEFERIDO">
                  Indeferido
                </option>

                <option value="CANCELADO">
                  Cancelado
                </option>
              </select>
            </div>
          </section>
        )}

        <section className="admin-table-section">
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Protocolo</th>

                  {usuario?.tipo !==
                    "ALUNO" && (
                    <th>
                      Aluno / Curso
                    </th>
                  )}

                  <th>
                    Tipo de Solicitação
                  </th>

                  <th>Data</th>

                  <th>Status</th>

                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {solicitacoes.map((req) => (
                  <tr key={req.id}>
                    <td>
                      <strong>
                        {req.protocolo}
                      </strong>
                    </td>

                    {usuario?.tipo !==
                      "ALUNO" && (
                      <td>
                        <div className="user-info-cell">
                          <strong>
                            {
                              req.usuario
                                ?.nome
                            }
                          </strong>

                          <span>
                            {
                              req.cursoAtual
                            }
                          </span>
                        </div>
                      </td>
                    )}

                    <td>{req.tipo}</td>

                    <td>
                      {new Date(
                        req.criadoEm
                      ).toLocaleDateString(
                        "pt-BR"
                      )}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${req.status.toLowerCase()}`}
                      >
                        {req.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn-ver-detalhes"
                        onClick={() =>
                          navigate(
                            `/analise-requerimento/${req.id}`
                          )
                        }
                      >
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}