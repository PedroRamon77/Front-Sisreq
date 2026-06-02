import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EsqueciSenha from './components/esquecisenha/EsqueciSenha'
import Login from './components/login/Login'
import Cadastro from './components/cadastro/Cadastro'
import Dashboard from './components/dashboard/Dashboard'
import NovoRequerimento from './components/novorequerimento/NovoRequerimento'
import DashboardAdmin from './components/dashboardAdmin/DashboardAdmin'
import AnaliseRequerimento from './components/analiseRequerimento/AnaliseRequerimento'
import GerenciarUsuarios from './components/gerenciar-usuarios/GerenciarUsuarios'
import Solicitacoes from './components/solicitacoes/Solicitacoes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/solicitacoes" element={<Solicitacoes />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/novorequerimento" element={<NovoRequerimento />} />
        <Route path="/analise-requerimento" element={<AnaliseRequerimento />} />
        <Route path="/gerenciar-usuarios" element={<GerenciarUsuarios />} />
        <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  )
}