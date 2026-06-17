import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'

export default function RedefinirSenha() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  async function alterarSenha(e) {
    e.preventDefault()

    try {
      setLoading(true)

      await api.post(
        `/auth/redefinir-senha/${token}`,
        {
          senha,
        }
      )

      alert('Senha alterada com sucesso')

      navigate('/')

    } catch (error) {
      alert(
        error.response?.data?.erro ||
        'Erro'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        width: '400px',
        margin: '100px auto'
      }}
    >
      <h2>Nova senha</h2>

      <form onSubmit={alterarSenha}>

        <input
          type="password"
          placeholder="Digite nova senha"
          value={senha}
          onChange={(e) =>
            setSenha(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          {
            loading
              ? 'Salvando...'
              : 'Alterar senha'
          }
        </button>

      </form>
    </div>
  )
}