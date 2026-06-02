import { useState } from 'react'
import { Link } from 'react-router-dom'
// (Se tiver a importação da api, mantenha-a)
// import api from '../../services/api' 
import './EsqueciSenha.css'

export default function EsqueciSenha() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) return

    try {
      setLoading(true)
      // Simulação da requisição
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSucesso(true)
    } catch (error) {
      alert(error.response?.data?.erro || 'Erro ao solicitar recuperação de senha.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <section className="left-side" aria-label="Marca e descrição do sistema">
        <div className="hero-content">
          <div className="hero-line" aria-hidden="true" />
          <h1>
            Sis<span>Req.</span>
          </h1>
          <p>
            A nova era da gestão acadêmica do IFCE Cedro.
            Eficiência, transparência e tecnologia
            em um único ecossistema.
          </p>
        </div>
      </section>

      <section className="right-side" aria-label="Formulário de recuperação">
        <div className="overlay" aria-hidden="true" />
        <div className="login-card main-card">
          <div className="login-header">
            <h2>Recuperar Senha</h2>
            <p>
              Digite o e-mail associado à sua conta e enviaremos um link para redefinir sua senha.
            </p>
          </div>

          {!sucesso ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="input-group">
                <label htmlFor="email">E-mail</label>

                <div className="input-wrapper">
                  {/* ÍCONE REMOVIDO DAQUI */}
                  <input
                    id="email"
                    type="email"
                    placeholder="nome@aluno.ifce.edu.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <button
                className="login-button"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar Link'}
              </button>
            </form>
          ) : (
            <div className="success-message">
              <h3>Link Enviado!</h3>
              <p>Verifique a sua caixa de entrada e a pasta de spam para redefinir a sua senha.</p>
            </div>
          )}

          <div className="divider">
            <span />
          </div>

          <p className="register-text">
            Lembrou a senha?
            <Link to="/">{' '}Voltar ao Login</Link>
          </p>
        </div>
      </section>
    </main>
  )
}