import { Link, useNavigate } from 'react-router-dom'
import './Dashboard.css'

// Ícones das Notificações
const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00b300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const WarningIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const CrossIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
)

export default function Dashboard() {
  const navigate = useNavigate()

  const usuario = JSON.parse(localStorage.getItem('usuario'))
  const tipo = usuario?.tipo
  const nome = usuario?.nome || 'Usuário'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/')
  }

  const cards = [
    { label: 'ABERTOS', valor: '02' },
    { label: 'EM ANÁLISE', valor: '01' },
    { label: 'FINALIZADOS', valor: '14' },
  ]

  const notificacoes = [
    {
      id: 1,
      titulo: 'Requerimento #2024-08 Deferido',
      descricao: 'Sua solicitação de "Segunda Chamada" foi aprovada pelo servidor.',
      horario: 'Hoje, 14:20',
      status: 'sucesso',
    },
    {
      id: 2,
      titulo: 'Ajuste Necessário #2024-12',
      descricao: 'O documento anexo está ilegível. Por favor, reenvie o PDF.',
      horario: 'Ontem, 09:15',
      status: 'alerta',
    },
    {
      id: 3,
      titulo: 'Requerimento #2025-07 Indeferido',
      descricao: 'Novo Requerimento Aberto',
      horario: '12 Abr, 16:40',
      status: 'erro',
    },
  ]

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h1>Sis<span>Req.</span></h1>
        </div>

        <nav className="sidebar-nav">

          {tipo === 'ALUNO' && (
            <>
              <Link to="/dashboard" className="nav-item active">
                Visão Geral
              </Link>

              <Link to="/novorequerimento" className="nav-item">
                Novo Requerimento
              </Link>

              <Link to="/solicitacoes" className="nav-item">
                Solicitações
              </Link>
            </>
          )}

          {tipo === 'SERVIDOR' && (
            <>
              <Link to="/dashboard" className="nav-item active">
                Visão Geral
              </Link>

              <Link to="/analise-requerimento" className="nav-item">
                Análise de Requerimentos
              </Link>
            </>
          )}

          {tipo === 'ADMIN' && (
            <>
              <Link to="/dashboard-admin" className="nav-item active">
                Dashboard Admin
              </Link>

              <Link to="/gerenciar-usuarios" className="nav-item">
                Gerenciar Usuários
              </Link>

              <Link to="/analise-requerimento" className="nav-item">
                Análise de Requerimentos
              </Link>
            </>
          )}

          <button className="nav-item logout" onClick={handleLogout}>
            Sair do Sistema
          </button>

        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="main-content">

        <div className="welcome-row">
          <div>
            <h2 className="welcome-title">
              Bem-vindo ao <span>SisReq.</span>
            </h2>

            <p>
              Usuário logado: <strong>{nome}</strong>
            </p>

            <p>
              Perfil: <strong>{tipo}</strong>
            </p>
          </div>

          {tipo === 'ALUNO' && (
            <Link to="/novorequerimento" className="btn-novo">
              + NOVO REQUERIMENTO
            </Link>
          )}
        </div>

        <section className="status-grid">
          {cards.map((card, idx) => (
            <div key={idx} className="status-card">
              <span className="status-label">{card.label}</span>
              <span className="status-number">{card.valor}</span>
            </div>
          ))}
        </section>

        <section className="notifications-section">
          <h3 className="notifications-header">
            Notificações Recentes
          </h3>

          <div className="notifications-container">
            <ul className="notifications-list">

              {notificacoes.map((item) => (
                <li
                  key={item.id}
                  className={`notification-item ${item.status}`}
                >
                  <div className="notification-content">
                    <div className="notification-item-header">
                      <strong className="notification-title">
                        {item.titulo}
                      </strong>

                      <span className="notification-time">
                        {item.horario}
                      </span>
                    </div>

                    <p className="notification-body">
                      {item.descricao}
                    </p>
                  </div>

                  <div className="notification-icon">
                    {item.status === 'sucesso' && <CheckIcon />}
                    {item.status === 'alerta' && <WarningIcon />}
                    {item.status === 'erro' && <CrossIcon />}
                  </div>
                </li>
              ))}

            </ul>
          </div>
        </section>

      </main>
    </div>
  )
}