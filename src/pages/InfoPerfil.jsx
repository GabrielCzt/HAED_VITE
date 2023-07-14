import React, { useState, useEffect } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "../estilos/InfoPerfil.css";
import fetchData from "../funciones/ObtenerInformación";
import Titulo from "../components/BarraDeTitulo";
import { Link } from "react-router-dom";

import { faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";

const cookie = new Cookies();

function InfoPerfil() {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  {
    /*//Estado para mostrar contraseña*/
  }
  const [ojos, setOjos] = useState(faEye);
  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData();
      console.log(data);
      setInfo(data);
    };
    fetchDataAsync();
    if (!cookie.get("token")) {
      navigate("./Iniciar-sesion");
    }
  }, []);

  {
    /*Muestra y oculta contraseña del input 'password' */
  }
  const SeePassword = () => {
    let pass = document.getElementById("myPassword");
    let pass2 = document.getElementById("myPassword2");
    if (pass.type === "password" || pass2.type === "password") {
      pass.type = "text";
      pass2.type = "text";
      setOjos(faEyeSlash);
    } else if (pass.type === "text" || pass2.type === "text") {
      pass.type = "password";
      pass2.type = "password";
      setOjos(faEye);
    }
  };

  return (
    <>
      <Titulo titulo="Perfil de usuario" />
    <div className="infoPerfil">
{/* Contenedor principal de contenido */}
<div class="container">
<Link to="../Perfil"><button id="volver">Regresar al menú &nbsp;<FontAwesomeIcon icon={faCircleArrowLeft}/></button></Link>
        <div class="row">
          {/* Tarjeta de datos del usuario */}
          <div class="col-lg-4">
            <div class="profile-card-4 z-depth-3">
              <div class="card">
                {/* Imagen de tarjeta */}
                <div class="card-body text-center bg-success rounded-top">
                  <div class="user-box">
                    <button class="btn " onClick={() => navigate("/")}>
                      {" "}
                      <img
                        className="img"
                        src="https://pbs.twimg.com/profile_images/1609948030865743872/FXN0HLMz_400x400.jpg"
                        height="100"
                        width="100"
                      />
                    </button>
                  </div>
                  <h5 class="mb-1 text-white">
                    Universidad Tecnológica de Puebla
                  </h5>
                </div>
                {/* Cuerpo de la tarjeta  */}
                <div class="card-body">
                  {/* Lista de elementos  */}
                  <ul class="list-group shadow-none">
                    {/* Elemento */}
                    <li class="list-group-item">
                      <div class="list-icon">
                        <i class="fa fa-envelope"></i>
                      </div>
                      <div class="list-details">
                        <span>
                          {info.nombres} {info.apellidos}{" "}
                        </span>
                        <small>Nombre</small>
                      </div>
                    </li>
                    {/* Elemento */}
                    <li class="list-group-item">
                      <div class="list-icon">
                        <i class="fa fa-globe"></i>
                      </div>
                      <div class="list-details">
                        <span>{info.matricula}</span>
                        <small>ID</small>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta de edicion para datos del usuario */}
          <div class="col-lg-8">
            <div class="card z-depth-3">
             {/* Contenido de la tarjeta */}
              {/* Contenido de la tarjeta */}
              <div className="card-body">
                {/* Indica el apartado de contenido  */}

                {/* Cuerpo y Formulario de envio */}
                <div className="tab-content p-3">
                  {/* Panel de datos */}
                  <div className="tab-pane active  show" id="edit">
                    {/* Input y evento de formulario */}
                    <form onSubmit={" "}>
                      {/* Separador de input  */}
                      <div className="form-group row">
                        <label className="col-lg-3 ">
                          <b>Correo Electronico</b>
                        </label>
                        <div className="col-lg-9">
                          <p>{info.email}</p>
                        </div>
                      </div>
                      {/* Separador de input  */}
                      <div className="form-group row">
                        <label className="col-lg-3 ">
                          <b>Centro de trabajo</b>
                        </label>
                        <div className="col-lg-9">
                          <p>{info.centro_trabajo}</p>
                        </div>
                      </div>
                      {/* Separador de input  */}
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">
                          <b>Edad</b>
                        </label>
                        <div className="col-lg-9">
                          <p>{info.edad}</p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </>
  );
}

export default InfoPerfil;
