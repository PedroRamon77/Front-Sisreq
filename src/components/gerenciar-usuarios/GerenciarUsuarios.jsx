import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './GerenciarUsuarios.css'
import SidebarAdmin from '../layout/sidebar/SidebarAdmin'

export default function GerenciarUsuarios() {
  const navigate = useNavigate()

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
    } catch {
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
        tipo: novoTipo.toUpperCase()
      })

      alert('Perfil atualizado com sucesso')
      carregarUsuarios()
    } catch {
      alert('Erro ao atualizar usuário')
    }
  }

  const usuariosFiltrados = usuarios.filter(user => {
    const correspondeBusca =
      user.nome.toLowerCase().includes(busca.toLowerCase()) ||
      user.email.toLowerCase().includes(busca.toLowerCase())

    const correspondeTipo =
      filtroTipo === '' || user.tipo === filtroTipo

    return correspondeBusca && correspondeTipo
  })

  return (
    <div className="dashboard-container">

      <SidebarAdmin itemAtivo="gerenciar-usuarios"/>

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

          <button
            className="btn-gerenciar"
            onClick={() => navigate('/novousuario')}
          >
            Novo Usuário +
          </button>

        </header>

        <section className="users-toolbar">

          <input
            className="search-box"
            placeholder="Buscar por nome ou e-mail..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />

          <select
            className="filter-select"
            value={filtroTipo}
            onChange={e => setFiltroTipo(e.target.value)}
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

                {usuariosFiltrados.map(user => (

                  <tr key={user.id}>

                    <td>
                      <strong>
                        {user.nome}
                      </strong>

                      <br />

                      {user.email}
                    </td>

                    <td>
                      {user.tipo}
                    </td>

                    <td>
                      {user.matricula || '-'}
                    </td>

                    <td>
                      {user.ativo
                        ? 'Ativo'
                        : 'Bloqueado'}
                    </td>

                    <td>

                      <button
                        className="btn-action btn-gray"
                        onClick={() =>
                          alterarTipo(
                            user.id,
                            user.tipo
                          )
                        }
                      >
                        Editar
                      </button>

                      <button
                        className="btn-action btn-gray"
                        onClick={() =>
                          alterarStatus(
                            user.id,
                            user.ativo
                          )
                        }
                      >
                        {user.ativo
                          ? 'Bloquear'
                          : 'Desbloquear'}
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