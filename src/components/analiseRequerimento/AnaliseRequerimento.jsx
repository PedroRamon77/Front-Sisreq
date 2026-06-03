import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./AnaliseRequerimento.css";

export default function AnaliseRequerimento() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [requerimento, setRequerimento] =
    useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  async function carregarRequerimento() {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:3000/requerimentos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequerimento(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar requerimento");
    }
  }

  async function atualizarStatus(status) {
  try {
    const token =
      localStorage.getItem("token");

    const response = await axios.patch(
      `http://localhost:3000/requerimentos/${id}/status`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.mensagem);

    await carregarRequerimento();

    navigate("/solicitacoes");
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.erro ||
        "Erro ao atualizar status"
    );
  }
}

  useEffect(() => {
    carregarRequerimento();
  }, [id]);

  if (!requerimento) {
    return (
      <div className="dashboard-container">
        <main className="admin-content">
          <h2>Carregando...</h2>
        </main>
      </div>
    );
  }

  const finalizado = [
    "DEFERIDO",
    "INDEFERIDO",
    "CANCELADO",
  ].includes(requerimento.status);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h1>
            Sis<span>Req.</span>
          </h1>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/dashboard-admin"
            className="nav-item"
          >
            Visão Geral
          </Link>

          <Link
            to="/gerenciar-usuarios"
            className="nav-item"
          >
            Gerenciar Usuários
          </Link>

          <Link
            to="#"
            className="nav-item"
          >
            Configurações
          </Link>

          <Link
            to="/solicitacoes"
            className="nav-item active"
          >
            Solicitações
          </Link>

          <button
            className="nav-item logout"
            onClick={handleLogout}
          >
            Sair do Sistema
          </button>
        </nav>
      </aside>

      <main className="admin-content analise-content">
        <header className="analise-header">
          <button
            className="btn-voltar"
            onClick={() =>
              navigate("/solicitacoes")
            }
          >
            &larr; Voltar
          </button>

          <div className="analise-title-group">
            <h2>
              Analisar Requerimento{" "}
              <span>
                {requerimento.protocolo}
              </span>
            </h2>

            <p>
              Revise as informações abaixo
              antes de tomar uma decisão.
            </p>
          </div>
        </header>

        <div className="analise-grid">
          <div className="analise-main-info">
            <section className="info-section">
              <h3>Dados do Aluno</h3>

              <div className="info-grid">
                <div className="info-box">
                  <label>
                    Nome Completo:
                  </label>

                  <p>
                    {
                      requerimento.usuario
                        ?.nome
                    }
                  </p>
                </div>

                <div className="info-box">
                  <label>
                    Matrícula:
                  </label>

                  <p>
                    {
                      requerimento.usuario
                        ?.matricula
                    }
                  </p>
                </div>

                <div className="info-box">
                  <label>Curso:</label>

                  <p>
                    {
                      requerimento.cursoAtual
                    }
                  </p>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h3>
                Detalhes do Requerimento
              </h3>

              <div className="info-grid">
                <div className="info-box">
                  <label>
                    Tipo de Solicitação:
                  </label>

                  <p className="highlight-text">
                    {requerimento.tipo}
                  </p>
                </div>

                <div className="info-box">
                  <label>
                    Data da Solicitação:
                  </label>

                  <p>
                    {new Date(
                      requerimento.criadoEm
                    ).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>

                <div className="info-box">
                  <label>Status:</label>

                  <p>
                    {requerimento.status}
                  </p>
                </div>
              </div>

              <div className="info-box full-width mt-3">
                <label>
                  Justificativa do Aluno:
                </label>

                <div className="justificativa-box">
                  <p>
                    {
                      requerimento.descricao
                    }
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="analise-side-panel">
            <section className="anexo-section">
              <h3>
                Documentos Anexos
              </h3>

              {requerimento.anexos
                ?.length === 0 && (
                <p>
                  Nenhum documento
                  anexado.
                </p>
              )}

              {requerimento.anexos?.map(
                (anexo) => (
                  <div
                    key={anexo.id}
                    className="document-card"
                  >
                    <span className="document-name">
                      {
                        anexo.nomeArquivo
                      }
                    </span>

                    <a
                      href={`http://localhost:3000/uploads/${anexo.caminho}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className="btn-download">
                        Baixar
                      </button>
                    </a>
                  </div>
                )
              )}
            </section>

            <section className="actions-section">
              <h3>Decisão</h3>

              <p className="actions-hint">
                Selecione o parecer
                final para este
                requerimento.
              </p>

 <div className="action-buttons">
  <button
    disabled={finalizado}
    className="btn-decisao btn-deferir"
    onClick={() =>
      atualizarStatus("DEFERIDO")
    }
  >
    Deferir
  </button>

  <button
    disabled={finalizado}
    className="btn-decisao btn-ajuste"
    onClick={() =>
      atualizarStatus(
        "AGUARDANDO_AJUSTE"
      )
    }
  >
    Solicitar Ajuste
  </button>

  <button
    disabled={finalizado}
    className="btn-decisao btn-indeferir"
    onClick={() =>
      atualizarStatus("INDEFERIDO")
    }
  >
    Indeferir
  </button>
</div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}