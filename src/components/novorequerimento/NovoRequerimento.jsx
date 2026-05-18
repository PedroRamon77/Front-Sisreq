import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './NovoRequerimento.css'

function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

const UploadIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

export default function NovoRequerimento() {
  const navigate = useNavigate()
  const [semestre, setSemestre] = useState('')
  const [curso, setCurso] = useState('')
  const [tipo, setTipo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [anexo, setAnexo] = useState(null)
  const [loading, setLoading] = useState(false)

  const usuarioSalvo = localStorage.getItem('usuario')
  const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null

  const handleCancelar = () => {
    navigate('/dashboard')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const formData = new FormData()

      formData.append('tipo', tipo)
      formData.append('descricao', descricao)
      formData.append('semestreAtual', semestre)
      formData.append('cursoAtual', curso)

      if (anexo) {
        formData.append('anexos', anexo)
      }

      await api.post('/requerimentos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      alert('Requerimento enviado com sucesso!')
      navigate('/dashboard')
    } catch (error) {
      alert(error.response?.data?.erro || 'Erro ao enviar requerimento')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="requerimento-page">
      <div className="back-link">
        <Link to="/dashboard">
          <ArrowLeftIcon />
          Voltar ao Painel
        </Link>
      </div>

      <div className="requerimento-card">
        <div className="form-header">
          <h1 className="form-title">
            Novo Requerimento
          </h1>

          <p className="form-subtitle">
            Confirme seus dados e preencha a
            solicitação acadêmica.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">
                Matrícula (Auto)
              </label>

              <input
                type="text"
                className="input"
                value={usuario?.matricula || ''}
                disabled
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                Semestre Atual
              </label>

              <input
                type="text"
                className="input"
                placeholder="Ex: 2026.1"
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
                required
              />
            </div>

            <div className="input-group full">
              <label className="input-label">
                Curso Atual
              </label>

              <select
                className="select"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecione seu curso
                </option>
                <option value="Bacharelado em Sistemas de Informação">
                  Bacharelado em Sistemas de Informação
                </option>
                <option value="Engenharia Elétrica">
                  Engenharia Elétrica
                </option>
                <option value="Engenharia Mecânica">
                  Engenharia Mecânica
                </option>
                <option value="Licenciatura em Física">
                  Licenciatura em Física
                </option>
                <option value="Licenciatura em Matemática">
                  Licenciatura em Matemática
                </option>
                <option value="Tecnólogo em Mecatrônica Industrial">
                  Tecnólogo em Mecatrônica Industrial
                </option>
              </select>
            </div>

            <div className="input-group full">
              <label className="input-label">
                Tipo de solicitação
              </label>

              <select
                className="select"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecione uma opção...
                </option>
                <option value="Trancamento de Disciplina">
                  Trancamento de Disciplina
                </option>
                <option value="Atestado">
                  Atestado
                </option>
                <option value="Aproveitamento">
                  Aproveitamento
                </option>
                <option value="Segunda Chamada">
                  Segunda Chamada
                </option>
                <option value="Outro">
                  Outro
                </option>
              </select>
            </div>

            <div className="input-group full">
              <label className="input-label">
                Descrição Detalhada
              </label>

              <textarea
                className="textarea"
                placeholder="Explique o motivo da sua solicitação."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>

            <div className="input-group full">
              <label className="input-label">
                Anexos Comprobatórios
                (Se necessário)
              </label>

              <label className="upload-area">
                <input
                  type="file"
                  hidden
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => setAnexo(e.target.files[0])}
                />

                <div className="upload-content">
                  <div className="upload-icon">
                    <UploadIcon />
                  </div>

                  <div>
                    <p className="upload-title">
                      {anexo ? anexo.name : 'Clique para anexar arquivos'}
                    </p>

                    {!anexo && (
                      <span className="upload-subtitle">
                        PDF, PNG ou JPG
                      </span>
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancelar"
              onClick={handleCancelar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-enviar"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Solicitação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}