import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./NovoRequerimento.css";

const UploadIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export default function NovoRequerimento() {

  const navigate = useNavigate();

  const [semestre,setSemestre] = useState("");
  const [curso,setCurso] = useState("");
  const [tipo,setTipo] = useState("");
  const [descricao,setDescricao] = useState("");
  const [anexo,setAnexo] = useState(null);
  const [loading,setLoading] = useState(false);

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );


  const cancelar = () => {
    navigate("/dashboardaluno");
  };


  async function enviar(e){

    e.preventDefault();

    try{

      setLoading(true);

      const formData = new FormData();

      formData.append("tipo",tipo);
      formData.append("descricao",descricao);
      formData.append("semestreAtual",semestre);
      formData.append("cursoAtual",curso);

      if(anexo){
        formData.append("anexos",anexo);
      }


      await api.post(
        "/requerimentos",
        formData,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );


      alert("Requerimento enviado com sucesso!");

      navigate("/dashboardaluno");


    }catch(error){

      alert(
        error.response?.data?.erro ||
        "Erro ao enviar requerimento"
      );

    }finally{

      setLoading(false);

    }

  }


  return (

    <div className="requerimento-page">

      <div className="back-link">

        <Link to="/dashboardaluno">
          ← Voltar ao Painel
        </Link>

      </div>


      <div className="requerimento-card">

        <div className="form-header">

          <h1 className="form-title">
            Novo Requerimento
          </h1>

          <p className="form-subtitle">
            Confirme seus dados e preencha a solicitação acadêmica.
          </p>

        </div>


        <form onSubmit={enviar}>


          <div className="form-grid">


            <div className="input-group">

              <label>
                Matrícula
              </label>

              <input
                className="input"
                disabled
                value={
                  usuario?.matricula || ""
                }
              />

            </div>



            <div className="input-group">

              <label>
                Semestre Atual
              </label>

              <input
                className="input"
                placeholder="Ex: 2026.1"
                value={semestre}
                onChange={
                  e=>setSemestre(e.target.value)
                }
                required
              />

            </div>



            <div className="input-group full">

              <label>
                Curso Atual
              </label>


              <select
                className="select"
                value={curso}
                onChange={
                  e=>setCurso(e.target.value)
                }
                required
              >

                <option value="">
                  Selecione
                </option>

                <option>
                  Bacharelado em Sistemas de Informação
                </option>

                <option>
                  Engenharia Elétrica
                </option>

                <option>
                  Engenharia Mecânica
                </option>

              </select>

            </div>



            <div className="input-group full">

              <label>
                Tipo de solicitação
              </label>

              <select
                className="select"
                value={tipo}
                onChange={
                  e=>setTipo(e.target.value)
                }
                required
              >

                <option value="">
                  Selecione
                </option>

                <option>
                  Trancamento de Disciplina
                </option>

                <option>
                  Atestado
                </option>

                <option>
                  Aproveitamento
                </option>

                <option>
                  Segunda Chamada
                </option>

              </select>

            </div>



            <div className="input-group full">

              <label>
                Descrição
              </label>

              <textarea
                className="textarea"
                value={descricao}
                onChange={
                  e=>setDescricao(e.target.value)
                }
                required
              />

            </div>



            <div className="input-group full">

              <label>
                Anexo
              </label>

              <label className="upload-area">

                <UploadIcon/>

                <input
                  hidden
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={
                    e=>setAnexo(e.target.files[0])
                  }
                />

                {anexo
                  ? anexo.name
                  : "Clique para anexar"}

              </label>

            </div>


          </div>



          <div className="form-actions">

            <button
              type="button"
              className="btn-cancelar"
              onClick={cancelar}
            >
              Cancelar
            </button>


            <button
              className="btn-enviar"
              disabled={loading}
            >

              {loading
                ? "Enviando..."
                : "Enviar Solicitação"}

            </button>


          </div>


        </form>


      </div>


    </div>

  );

}