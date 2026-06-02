import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Solicitacoes.css'
import SidebarAdmin from '../layout/sidebar/SidebarAdmin' // <- O seu menu importado aqui!

export default function Solicitacoes() {
  const navigate = useNavigate()
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')

  // Dados simulados de todo o histórico de requerimentos
  const solicitacoes = [
    {
      id: '#2024-156',
      aluno: 'Lucas Pereira Silva',
      curso: 'Sistemas de Informação',
      tipo: 'Ajuste de Matrícula',
      data: '15/05/2024',
      status: 'Em Análise',
    },
    {
      id: '#2024-155',
      aluno: 'Maria Oliveira',
      curso: 'Matemática',
      tipo: 'Segunda Chamada',
      data: '14/05/2024',
      status: 'Aprovado',
    },
    {
      id: '#2024-150',
      aluno: 'João Pedro Souza',
      curso: 'Mecatrônica',
      tipo: 'Trancamento de Curso',
      data: '10/05/2024',
      status: 'Recusado',
    },
    {
      id: '#2024-148',
      aluno: 'Ana Beatriz',
      curso: 'Sistemas de Informação',
      tipo: 'Aproveitamento de Disciplina',
      data: '08/05/2024',
      status: 'Atrasado',
    },
  ]

  return (
    <div className="dashboard-container">
      
      {/* ================= BARRA LATERAL ================= */}
      {/* Olhe que maravilha: 30 linhas de código viraram apenas UMA! */}
      <SidebarAdmin itemAtivo="solicitacoes" />

      {/* ================= CONTEÚDO PRINCIPAL ================= */}
      <main className="admin-content solicitacoes-content">
        
        <header className="solicitacoes-header">
          <div className="solicitacoes-title-group">
            <h2>Todas as <span>Solicitações</span></h2>
            <p>Acompanhe e filtre todo o histórico de requerimentos acadêmicos.</p>
          </div>
        </header>

        {/* BARRA DE FILTROS */}
        <section className="users-toolbar">
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Buscar por protocolo, aluno ou curso..." 
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className="filters-group">
            <input 
              type="date" 
              className="filter-select"
              title="Filtrar por data"
            />
            
            <select 
              className="filter-select"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="">Todos os Status</option>
              <option value="Em Análise">Em Análise</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Recusado">Recusado</option>
              <option value="Atrasado">Atrasado</option>
            </select>
          </div>
        </section>

        {/* TABELA GERAL DE REQUERIMENTOS */}
        <section className="admin-table-section">
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Protocolo</th>
                  <th>Aluno / Curso</th>
                  <th>Tipo de Solicitação</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {solicitacoes.map((req, index) => (
                  <tr key={index}>
                    <td><strong>{req.id}</strong></td>
                    <td>
                      <div className="user-info-cell">
                        <strong>{req.aluno}</strong>
                        <span>{req.curso}</span>
                      </div>
                    </td>
                    <td>{req.tipo}</td>
                    <td>{req.data}</td>
                    <td>
                      <span className={`status-badge ${req.status.replace(/\s+/g, '').toLowerCase()}`}>
                        {req.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn-ver-detalhes"
                        onClick={() => navigate('/analise-requerimento')}
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
  )
}