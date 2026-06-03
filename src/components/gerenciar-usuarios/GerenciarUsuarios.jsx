import { useEffect, useState } from 'react'
import api from '../../services/api'
import './GerenciarUsuarios.css'
import SidebarAdmin from '../layout/sidebar/SidebarAdmin'

export default function GerenciarUsuarios() {
  const [busca, setBusca] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    carregarUsuarios()
  }, [])

  async function carregarUsuarios() {
    try {
      const response = await api.get('/usuarios')
      setUsuarios(response.data)
    } catch (error) {
      console.error(error)
      alert('Erro ao carregar usuários')
    }
  }

  async function alterarStatus(id, ativo) {
  const confirmar = window.confirm(
    ativo
      ? 'Deseja bloquear este usuário?'
      : 'Deseja desbloquear este usuário?'
  )

  if (!confirmar) return

  try {
    await api.put(`/usuarios/${id}/bloquear`)

    alert(
      ativo
        ? 'Usuário bloqueado com sucesso'
        : 'Usuário desbloqueado com sucesso'
    )

    carregarUsuarios()
  } catch (error) {
    alert('Erro ao alterar status')
  }
}
    

  async function alterarTipo(id, tipoAtual) {
    const novoTipo = prompt(
      'Digite o novo perfil (ALUNO, SERVIDOR ou ADMIN):',
      tipoAtual
    )

    if (!novoTipo) return

    try {
      await api.put(`/usuarios/${id}`, {
        tipo: novoTipo.toUpperCase(),
      })

      alert('Perfil atualizado com sucesso')

      carregarUsuarios()
    } catch (error) {
      alert('Erro ao atualizar usuário')
    }
  }

  const usuariosFiltrados = usuarios.filter((user) => {
    const correspondeBusca =
      user.nome.toLowerCase().includes(busca.toLowerCase()) ||
      user.email.toLowerCase().includes(busca.toLowerCase())

    const correspondeTipo =
      filtroTipo === '' || user.tipo === filtroTipo

    return correspondeBusca && correspondeTipo
  })

  return (
    <div className="dashboard-container">

      <SidebarAdmin itemAtivo="gerenciar-usuarios" />

      <main className="admin-content users-content">

        <header className="users-header">
          <div className="users-title-group">
            <h2>
              Gerenciar <span>Usuários</span>
            </h2>

            <p>
              Controle os acessos e permissões dos usuários cadastrados.
            </p>
          </div>

          <button className="btn-novo-usuario">
            + Adicionar Usuário
          </button>
        </header>

        <section className="users-toolbar">

          <div className="search-box">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
              ></line>
            </svg>

            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className="filters-group">

            <select
              className="filter-select"
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="">
                Todos os Perfis
              </option>

              <option value="ALUNO">
                Aluno
              </option>

              <option value="SERVIDOR">
                Servidor
              </option>

              <option value="ADMIN">
                Admin
              </option>
            </select>

          </div>

        </section>

        <section className="admin-table-section">
          <div className="table-container">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Matrícula</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>

                {usuariosFiltrados.map((user) => (
                  <tr key={user.id}>

                    <td>
                      <div className="user-info-cell">
                        <strong>{user.nome}</strong>
                        <span>{user.email}</span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`role-pill ${user.tipo.toLowerCase()}`}
                      >
                        {user.tipo}
                      </span>
                    </td>

                    <td>
                      <strong>
                        {user.matricula || '-'}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`status-dot ${
                          user.ativo
                            ? 'ativo'
                            : 'inativo'
                        }`}
                      >
                        {user.ativo
                          ? 'Ativo'
                          : 'Bloqueado'}
                      </span>
                    </td>

                    <td>
                      <div className="action-icons">

                        <button
                          className="btn-icon edit"
                          title="Editar Usuário"
                          onClick={() =>
                            alterarTipo(
                              user.id,
                              user.tipo
                            )
                          }
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>

                        <button
                          className={`btn-icon ${
                            user.ativo ? 'delete' : 'edit'
                          }`}
                          title={
                            user.ativo
                              ? 'Bloquear Usuário'
                              : 'Desbloquear Usuário'
                          }
                          onClick={() =>
                            alterarStatus(user.id, user.ativo)
                          }
                        >
                          {user.ativo ? (
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                              />
                              <line x1="9" y1="9" x2="15" y2="15" />
                              <line x1="15" y1="9" x2="9" y2="15" />
                            </svg>
                          ) : (
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
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