import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './GerenciarUsuarios.css'

export default function GerenciarUsuarios() {
  const navigate = useNavigate()
  const [busca, setBusca] = useState('')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/')
  }

  // Dados simulados de servidores, professores e coordenadores
  const usuarios = [
    {
      id: 1,
      nome: 'Prof. Roberto Almeida',
      email: 'roberto.almeida@ifce.edu.br',
      papel: 'Coordenador',
      vinculo: 'Sistemas de Informação',
      status: 'Ativo',
    },
    {
      id: 2,
      nome: 'Profª. Ana Costa',
      email: 'ana.costa@ifce.edu.br',
      papel: 'Professor',
      vinculo: 'Matemática',
      status: 'Ativo',
    },
    {
      id: 3,
      nome: 'Carlos Eduardo',
      email: 'carlos.edu@ifce.edu.br',
      papel: 'Secretaria',
      vinculo: 'Todos os Cursos (Geral)',
      status: 'Ativo',
    },
    {
      id: 4,
      nome: 'Prof. Marcos Lima',
      email: 'marcos.lima@ifce.edu.br',
      papel: 'Professor',
      vinculo: 'Turma 2024.1 - Mecatrônica',
      status: 'Inativo',
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
          <Link to="/dashboard-admin" className="nav-item">
            Visão Geral
          </Link>
          <Link to="/gerenciar-usuarios" className="nav-item active">
            Gerenciar Usuários
          </Link>
          <Link to="#" className="nav-item">
            Configurações
          </Link>
          <Link to="/analise-requerimento" className="nav-item">
            Solicitações
          </Link>
          <button className="nav-item logout" onClick={handleLogout}>
            Sair do Sistema
          </button>
        </nav>
      </aside>

      {/* ================= CONTEÚDO PRINCIPAL ================= */}
      <main className="admin-content users-content">
        
        <header className="users-header">
          <div className="users-title-group">
            <h2>Gerenciar <span>Usuários</span></h2>
            <p>Controle os acessos, papéis e vínculos de cursos/turmas dos servidores.</p>
          </div>
          <button className="btn-novo-usuario">
            + Adicionar Servidor
          </button>
        </header>

        {/* BARRA DE FILTROS E PESQUISA */}
        <section className="users-toolbar">
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Buscar por nome ou e-mail..." 
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className="filters-group">
            <select className="filter-select">
              <option value="">Todos os Papéis</option>
              <option value="coordenador">Coordenador</option>
              <option value="professor">Professor</option>
              <option value="secretaria">Secretaria</option>
            </select>
            
            <select className="filter-select">
              <option value="">Todos os Vínculos</option>
              <option value="sistemas">Sistemas de Informação</option>
              <option value="matematica">Matemática</option>
              <option value="mecatronica">Mecatrônica</option>
            </select>
          </div>
        </section>

        {/* TABELA DE USUÁRIOS */}
        <section className="admin-table-section">
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Servidor</th>
                  <th>Papel de Acesso</th>
                  <th>Vínculo (Curso/Turma)</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info-cell">
                        <strong>{user.nome}</strong>
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`role-pill ${user.papel.toLowerCase()}`}>
                        {user.papel}
                      </span>
                    </td>
                    <td><strong>{user.vinculo}</strong></td>
                    <td>
                      <span className={`status-dot ${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-icons">
                        <button className="btn-icon edit" title="Editar Permissões">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button className="btn-icon delete" title="Bloquear Usuário">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                          </svg>
                        </button>
                      </div>
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