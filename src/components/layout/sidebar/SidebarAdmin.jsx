import { Link, useNavigate } from 'react-router-dom'
import './SidebarAdmin.css'

export default function SidebarAdmin({ itemAtivo }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>Sis<span>Req.</span></h1>
      </div>

      <nav className="sidebar-nav">
        <Link 
          to="/dashboard-admin" 
          className={`nav-item ${itemAtivo === 'visao-geral' ? 'active' : ''}`}
        >
          Visão Geral
        </Link>
        
        <Link 
          to="/gerenciar-usuarios" 
          className={`nav-item ${itemAtivo === 'gerenciar-usuarios' ? 'active' : ''}`}
        >
          Gerenciar Usuários
        </Link>
        
        <Link 
          to="#" 
          className={`nav-item ${itemAtivo === 'configuracoes' ? 'active' : ''}`}
        >
          Configurações
        </Link>
        
        <Link 
          to="/solicitacoes" 
          className={`nav-item ${itemAtivo === 'solicitacoes' ? 'active' : ''}`}
        >
          Solicitações
        </Link>
        
        <button className="nav-item logout" onClick={handleLogout}>
          Sair do Sistema
        </button>
      </nav>
    </aside>
  )
}