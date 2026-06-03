import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import EsqueciSenha from "./components/esquecisenha/EsqueciSenha";
import Login from "./components/login/Login";
import Cadastro from "./components/cadastro/Cadastro";
import Dashboard from "./components/dashboard/Dashboard";
import NovoRequerimento from "./components/novorequerimento/NovoRequerimento";
import DashboardAdmin from "./components/dashboardAdmin/DashboardAdmin";
import AnaliseRequerimento from "./components/analiseRequerimento/AnaliseRequerimento";
import GerenciarUsuarios from "./components/gerenciar-usuarios/GerenciarUsuarios";
import Solicitacoes from "./components/solicitacoes/Solicitacoes";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        <Route
          path="/esqueci-senha"
          element={<EsqueciSenha />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              tiposPermitidos={[
                "ALUNO",
                "SERVIDOR",
                "ADMIN",
              ]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/novorequerimento"
          element={
            <ProtectedRoute
              tiposPermitidos={[
                "ALUNO",
              ]}
            >
              <NovoRequerimento />
            </ProtectedRoute>
          }
        />

        <Route
          path="/solicitacoes"
          element={
            <ProtectedRoute
              tiposPermitidos={[
                "ALUNO",
                "SERVIDOR",
                "ADMIN",
              ]}
            >
              <Solicitacoes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard-admin"
          element={
            <ProtectedRoute
              tiposPermitidos={[
                "ADMIN",
              ]}
            >
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gerenciar-usuarios"
          element={
            <ProtectedRoute
              tiposPermitidos={[
                "ADMIN",
              ]}
            >
              <GerenciarUsuarios />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analise-requerimento/:id"
          element={
            <ProtectedRoute
              tiposPermitidos={[
                "ADMIN",
                "SERVIDOR",
              ]}
            >
              <AnaliseRequerimento />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <h1>
              404 - Página Não Encontrada
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}