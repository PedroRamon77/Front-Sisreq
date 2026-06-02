import { Link, useNavigate } from 'react-router-dom'
import './AnaliseRequerimento.css'

export default function AnaliseRequerimento() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/')
  }

  // Dados simulados do requerimento que está sendo analisado
  const requerimento = {
    id: '#2024-156',
    aluno: 'Lucas Pereira Silva',
    matricula: '20211054321',
    curso: 'Sistemas de Informação',
    tipo: 'Ajuste de Matrícula',
    dataSolicitacao: '15/05/2024',
    justificativa: 'Gostaria de solicitar a inclusão da disciplina de Banco de Dados II, pois houve um erro no sistema durante o meu período de matrícula e eu preciso desta matéria para não atrasar a minha formatura.',
    anexo: 'historico_lucas.pdf'
  }

  return (
    <div className="dashboard-container">
      {/* ================= BARRA LATERAL (ADMIN) ================= */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h1>Sis<span>Req.</span></h1>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard-admin" className="nav-item">
            Visão Geral
          </Link>
          <Link to="/gerenciar-usuarios" className="nav-item">
            Gerenciar Usuários
          </Link>
          <Link to="#" className="nav-item">
            Configurações
          </Link>
          <Link to="/analise-requerimento" className="nav-item active">
            Solicitações
          </Link>
          <button className="nav-item logout" onClick={handleLogout}>
            Sair do Sistema
          </button>
        </nav>
      </aside>

      {/* ================= CONTEÚDO PRINCIPAL ================= */}
      <main className="admin-content analise-content">
        
        <header className="analise-header">
          <button className="btn-voltar" onClick={() => navigate('/dashboard-admin')}>
            &larr; Voltar ao Painel
          </button>
          
          <div className="analise-title-group">
            <h2>Analisar Requerimento <span>{requerimento.id}</span></h2>
            <p>Revise as informações abaixo antes de tomar uma decisão.</p>
          </div>
        </header>

        <div className="analise-grid">
          {/* COLUNA ESQUERDA: Informações do Aluno e Pedido */}
          <div className="analise-main-info">
            <section className="info-section">
              <h3>Dados do Aluno</h3>
              <div className="info-grid">
                <div className="info-box">
                  <label>Nome Completo:</label>
                  <p>{requerimento.aluno}</p>
                </div>
                <div className="info-box">
                  <label>Matrícula:</label>
                  <p>{requerimento.matricula}</p>
                </div>
                <div className="info-box">
                  <label>Curso:</label>
                  <p>{requerimento.curso}</p>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h3>Detalhes do Requerimento</h3>
              <div className="info-grid">
                <div className="info-box">
                  <label>Tipo de Solicitação:</label>
                  <p className="highlight-text">{requerimento.tipo}</p>
                </div>
                <div className="info-box">
                  <label>Data da Solicitação:</label>
                  <p>{requerimento.dataSolicitacao}</p>
                </div>
              </div>
              
              <div className="info-box full-width mt-3">
                <label>Justificativa do Aluno:</label>
                <div className="justificativa-box">
                  <p>{requerimento.justificativa}</p>
                </div>
              </div>
            </section>
          </div>

          {/* COLUNA DIREITA: Anexos e Ações */}
          <div className="analise-side-panel">
            <section className="anexo-section">
              <h3>Documentos Anexos</h3>
              <div className="document-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span className="document-name">{requerimento.anexo}</span>
                <button className="btn-download">Baixar</button>
              </div>
            </section>

            <section className="actions-section">
              <h3>Decisão</h3>
              <p className="actions-hint">Selecione o parecer final para este requerimento.</p>
              
              <div className="action-buttons">
                <button className="btn-decisao btn-deferir">
                  Deferir (Aprovar)
                </button>
                <button className="btn-decisao btn-ajuste">
                  Solicitar Ajuste
                </button>
                <button className="btn-decisao btn-indeferir">
                  Indeferir (Recusar)
                </button>
              </div>
            </section>
          </div>
        </div>

      </main>
    </div>
  )
}