import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Cadastro.css'

const UserPlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </svg>
)

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

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [tipoPerfil, setTipoPerfil] = useState('aluno')
  const [matricula, setMatricula] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('Solicitação de registro enviada (simulação)')
    }, 1500)
  }

  return (
    <main className="container">
      <section className="left-side" aria-label="Marca e descrição">
        <div className="grid-decoration" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-line" aria-hidden="true" />
          <h1>Sis<span>Req.</span></h1>
          <p>
            A nova era da gestão acadêmica no IFCE Cedro.
            Eficiência, transparência e tecnologia em um único ecossistema.
          </p>
        </div>

        <div className="floating-shapes" aria-hidden="true">
          <div />
          <div />
        </div>
      </section>

      <section className="right-side" aria-label="Formulário de cadastro">
        <div className="overlay" aria-hidden="true" />

        <div className="cadastro-card">
          <div className="cadastro-icon" aria-hidden="true">
            <UserPlusIcon />
          </div>

          <h2>Criar Conta</h2>
          <p className="subtitle">Preencha os dados para ingressar no SisReq.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="nome">Nome completo</label>
              <div className="input-wrapper">
                <input
                  id="nome"
                  type="text"
                  placeholder="Ex: Lucas Pereira de Souza"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  aria-required="true"
                  autoComplete="name"
                />
              </div>
            </div>

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
                  aria-required="true"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="senha">Senha</label>
              <div className="input-wrapper">
                <input
                  id="senha"
                  type={showSenha ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  aria-required="true"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowSenha((prev) => !prev)}
                  aria-label={showSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showSenha ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirmar-senha">Confirmar senha</label>
              <div className="input-wrapper">
                <input
                  id="confirmar-senha"
                  type={showConfirmarSenha ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                  aria-required="true"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowConfirmarSenha((prev) => !prev)}
                  aria-label={showConfirmarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showConfirmarSenha ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <fieldset className="input-group perfil-group">
              <legend>Tipo de perfil</legend>
              <div className="perfil-options">
                {['aluno', 'administrativo', 'servidor'].map((perfil) => (
                  <label
                    key={perfil}
                    className={`perfil-option ${tipoPerfil === perfil ? 'selecionado' : ''}`}
                  >
                    <input
                      type="radio"
                      name="tipoPerfil"
                      value={perfil}
                      checked={tipoPerfil === perfil}
                      onChange={() => setTipoPerfil(perfil)}
                    />
                    <span>
                      {perfil === 'aluno' ? 'Aluno' :
                       perfil === 'administrativo' ? 'Administrativo' : 'Servidor'}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="input-group">
              <label htmlFor="matricula">Matrícula</label>
              <div className="input-wrapper">
                <input
                  id="matricula"
                  type="text"
                  placeholder="Ex: 2023XXXXXXX"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <button
              className="cadastro-button"
              type="submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Enviando...' : 'Solicitar Registro'}
            </button>
          </form>

        <p className="login-text">
            Já possui acesso?
            <Link to="/"> Fazer Login</Link>
        </p>
        </div>
      </section>
    </main>
  )
}