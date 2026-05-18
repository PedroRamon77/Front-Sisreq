import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './Login.css'

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await api.post('/auth/login', {
        email,
        senha: password,
      })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario))

      navigate('/dashboard')
    } catch (error) {
      alert(error.response?.data?.erro || 'Erro ao fazer login')
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

        <div className="grid-decoration" aria-hidden="true" />
        <div className="floating-shapes" aria-hidden="true" />
      </section>

      <section className="right-side" aria-label="Formulário de login">
        <div className="overlay" aria-hidden="true" />

        <div className="login-card main-card">
          <div className="login-header">
            <h2>Login</h2>

            <p>
              Entre com suas credenciais para acessar o sistema.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>

              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  placeholder="nome@ifce.edu.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Senha</label>

              <div className="input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="options-row">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Lembrar-me</span>
              </label>

              <a href="#">Esqueci minha senha</a>
            </div>

            <button
              className="login-button"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="divider">
            <span />
            <p>ou</p>
            <span />
          </div>

          <p className="register-text">
            Não possui conta?
            <Link to="/cadastro">{' '}Cadastrar-se</Link>
          </p>
        </div>
      </section>
    </main>
  )
}