import { Link, useNavigate } from 'react-router-dom'
import './Dashboard.css'

/* =========================
   ÍCONES SVG
   ========================= */

const FileTextIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)

const ClockIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const BellIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const PlusIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const LogOutIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

/* =========================
   COMPONENTE
   ========================= */

export default function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  const usuario = {
    nome: 'Lucas Pereira de Souza',
    matricula: '202610800XX',
  }

  const iniciais = usuario.nome
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const cards = [
    {
      label: 'Abertos',
      valor: '02',
      icone: <FileTextIcon />,
      cor: '#008c1f',
    },
    {
      label: 'Em Análise',
      valor: '01',
      icone: <ClockIcon />,
      cor: '#f59e0b',
    },
    {
      label: 'Finalizados',
      valor: '14',
      icone: <CheckCircleIcon />,
      cor: '#17c950',
    },
  ]

  const notificacoes = [
    {
      id: 1,
      titulo: 'Requerimento #2024-08 Deferido',
      descricao:
        'Sua solicitação de "Segunda Chamada" foi aprovada pelo servidor.',
      horario: 'Hoje, 14:20',
    },
    {
      id: 2,
      titulo: 'Ajuste Necessário #2024-12',
      descricao:
        'O documento anexo está ilegível. Por favor, reenvie o PDF.',
      horario: 'Ontem, 09:15',
    },
    {
      id: 3,
      titulo: 'Trancamento de Matrícula',
      descricao:
        'O documento anexo está ilegível. Por favor, reenvie o PDF.',
      horario: '12 Abr, 16:40',
    },
  ]

  return (
    <div className="dashboard">
      {/* HEADER */}
      <header className="top-bar">
        <div className="top-bar-content">
          <div className="user-details">
            <div className="user-avatar">{iniciais}</div>

            <div className="user-text">
              <h1 className="top-bar-name">{usuario.nome}</h1>

              <p className="top-bar-matricula">
                Matrícula: {usuario.matricula}
              </p>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOutIcon />
            Sair
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="dashboard-body">
        {/* BOAS-VINDAS */}
        <div className="welcome-row">
          <div className="welcome-title-wrapper">
            <h2 className="welcome-title">
              Bem-vindo ao SisReq.
            </h2>
          </div>

          <Link
            to="/NovoRequerimento"
            className="btn-novo"
          >
            <PlusIcon />
            Novo Requerimento
          </Link>
        </div>

        {/* CARDS */}
        <section className="status-grid">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="status-card"
              style={{ '--accent': card.cor }}
            >
              <div className="status-icon">
                {card.icone}
              </div>

              <div className="status-text">
                <span className="status-label">
                  {card.label}
                </span>

                <span className="status-number">
                  {card.valor}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* NOTIFICAÇÕES */}
        <section className="notifications">
          <h3 className="notifications-header">
            <BellIcon />
            Notificações Recentes
          </h3>

          <ul className="notifications-list">
            {notificacoes.map((item) => (
              <li
                key={item.id}
                className="notification-item"
              >
                <strong className="notification-title">
                  {item.titulo}
                </strong>

                <p className="notification-body">
                  {item.descricao}
                </p>

                <time className="notification-time">
                  {item.horario}
                </time>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}