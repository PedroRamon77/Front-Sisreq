import { Link, useNavigate } from 'react-router-dom'
import './DashboardAdmin.css'

export default function DashboardAdmin() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/')
  }

  // Dados simulados baseados no protótipo
  const pendencias = [
    {
      id: 1,
      nome: 'Prof. Carlos Silva',
      requerimento: 'Ajustar matricula do aluno (Lucas Pereira)',
      tempoFila: '1 dia',
      status: 'Aprovado',
    },
    {
      id: 2,
      nome: 'Prof. jeremias Souza',
      requerimento: 'Trancamento de curso',
      tempoFila: '15 dias',
      status: 'Atrasado',
    },
  ]

  const acessos = [
    {
      id: 1,
      nome: 'Lucas Pereira',
      vinculo: 'Aluno',
      permissao: 'Ativo',
    },
    {
      id: 2,
      nome: 'Neide Costa',
      vinculo: 'Secretaria',
      permissao: 'Matriculas parcial',
    },
  ]

  return (
    <div className="dashboard-container">
      {/* ================= BARRA LATERAL ================= */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h1>Sis<span>Req.</span></h1>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard-admin" className="nav-item active">
            Visão Geral
          </Link>
          <Link to="#" className="nav-item">
            Gerenciar Usuários
          </Link>
          <Link to="#" className="nav-item">
            Configurações
          </Link>
          <Link to="#" className="nav-item">
            Solicitações
          </Link>
          <button className="nav-item logout" onClick={handleLogout}>
            Sair do Sistema
          </button>
        </nav>
      </aside>

      {/* ================= CONTEÚDO PRINCIPAL ================= */}
      <main className="main-content admin-content">
        
        {/* CABEÇALHO */}
        <header className="admin-header">
          <div className="admin-title-group">
            <h2>Painel Administrativo</h2>
            <p>Visão geral de acessos e requerimentos</p>
          </div>

          <div className="admin-profile">
            <div className="admin-info">
              <strong>Admin Principal</strong>
              <span>Super Usuário</span>
            </div>
            <div className="admin-avatar-glow"></div>
          </div>
        </header>

        {/* CARDS DE RESUMO */}
        <section className="admin-cards-grid">
          <div className="admin-card outline-green">
            <span className="admin-card-label">TOTAL DE ALUNOS</span>
            <span className="admin-card-value text-green">1.621</span>
          </div>
          <div className="admin-card outline-gray">
            <span className="admin-card-label">SERVIDORES CADASTRADOS</span>
            <span className="admin-card-value text-green">40</span>
          </div>
          <div className="admin-card outline-red">
            <span className="admin-card-label text-red">PENDENCIAS</span>
            <span className="admin-card-value text-red">13</span>
          </div>
        </section>

        {/* TABELA DE PENDÊNCIAS */}
        <section className="admin-table-section">
          <div className="table-header">
            <h3>Pendências de Servidores/Professores</h3>
          </div>
          
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nome:</th>
                  <th>Requerimento solicitado:</th>
                  <th>Tempo na Fila</th>
                  <th>Status</th>
                  <th>Ação adm</th>
                </tr>
              </thead>
              <tbody>
                {pendencias.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.nome}</strong></td>
                    <td>{item.requerimento}</td>
                    <td><strong>{item.tempoFila}</strong></td>
                    <td>
                      <span className={`status-pill ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-action btn-gray">Notificar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* TABELA DE ACESSOS */}
        <section className="admin-table-section">
          <div className="table-header flex-between">
            <h3>Controle de Acessos e Permissões</h3>
            <button className="btn-gerenciar">Gerenciar usuarios +</button>
          </div>
          
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nome:</th>
                  <th>Vinculo</th>
                  <th>Nivel de permissão</th>
                  <th>Ação adm</th>
                </tr>
              </thead>
              <tbody>
                {acessos.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.nome}</strong></td>
                    <td><strong>{item.vinculo}</strong></td>
                    <td><strong>{item.permissao}</strong></td>
                    <td>
                      <button className="btn-action btn-light-green">Salvar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  )
}