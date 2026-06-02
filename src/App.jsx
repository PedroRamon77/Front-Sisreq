import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EsqueciSenha from './components/esquecisenha/EsqueciSenha'
import Login from './components/login/Login'
import Cadastro from './components/cadastro/Cadastro'
import Dashboard from './components/dashboard/Dashboard'
import NovoRequerimento from './components/novorequerimento/NovoRequerimento'
import DashboardAdmin from './components/dashboardAdmin/DashboardAdmin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/novorequerimento" element={<NovoRequerimento />} />
      </Routes>
    </BrowserRouter>
  )
}