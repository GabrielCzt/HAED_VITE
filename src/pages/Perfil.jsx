import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/Perfil.css";
import "../estilos/Pages.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileText,  
  faTable,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import fetchData from "../funciones/ObtenerInformación";
import Titulo from "../components/BarraDeTitulo";
import Cargando from "../components/Cargando";

const cookie = new Cookies();

function Perfil() {

  const navigate = new useNavigate();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!cookie.get("token")) {
      navigate("/Iniciar-sesion");
    }
    // ^Obtenemos los datos del usuario ====================================================================
    const fetchDataAsync = async () => {
      const data = await fetchData();
      console.log(data);
      setInfo(data);
    };
    fetchDataAsync();
  }, []);

  
  return (
    <>
      <Titulo titulo="Perfil de usuario" />
      {/* Etiqueta separadora de estilos ============================================================== */}
      <div className="profile">
        <div className="container">
          {!info ? (
            <Cargando />
          ) : (
            <>
              {" "}
              <div className="row">
                <h3>Bienvenido </h3> <hr />
              </div>
              {/* targeta de información ============================================================= */}
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div>
                    <div className="profile-card-4 z-depth-3">
                      <div className="card">
                        {/* Imagen de tarjeta =========================================================*/}
                        <div className="card-body text-center bg-success rounded-top">
                          <div className="user-box">
                            <button className="btn " onClick={() => navigate("/")}>
                              <img
                                classNameName="img"
                                src="https://pbs.twimg.com/profile_images/1609948030865743872/FXN0HLMz_400x400.jpg"
                                height="100"
                                width="100"
                              />
                            </button>
                          </div>
                          <h5 className="mb-1 text-white">
                            Universidad Tecnologica de Puebla
                          </h5>
                        </div>
                        {/* Cuerpo de la tarjeta  ====================================================*/}
                        <div className="card-body">
                          {/* Lista de elementos ===================================================== */}
                          <ul className="list-group shadow-none">
                            {/* Elemento =============================================================*/}
                            <li className="list-group-item">
                              <div className="list-icon">
                                <i className="fa fa-globe"></i>
                              </div>
                              <div className="list-details">
                                <span>{info.matricula}</span>
                                <small>ID</small>
                              </div>
                            </li>
                            {/* Elemento ================================================================ */}
                            <li className="list-group-item">
                              <div className="list-icon">
                                <i className="fa fa-envelope"></i>
                              </div>
                              <div className="list-details">
                                <span>
                                  {info.nombres} {info.apellidos}{" "}
                                </span>
                                <small>Nombre</small>
                              </div>
                            </li>
                            {/* Elemento ==============================================================*/}
                            <li className="list-group-item">
                              <div className="list-icon">
                                <i className="fa fa-globe"></i>
                              </div>
                              <div className="list-details">
                                <span>{info.email}</span>
                                <small>Correo</small>
                              </div>
                            </li>
                            {/**Elemento ============================================================== */}
                            <li className="list-group-item">
                              <div className="list-icon">
                                <i className="fa fa-globe"></i>
                              </div>
                              <div className="list-details">
                                {info.edad? <span>{info.edad}</span> : <span>Sin definir</span>}
                                <small>Edad</small>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="list-icon">
                                <i className="fa fa-globe"></i>
                              </div>
                              <div className="list-details">
                               {info.sexo? <span>{info.sexo}</span> : <span>Sin definir</span>} 
                                <small>Género</small>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Opciones del menu ================================================================== */}

                <div className="col-sm-12 col-md-6">
                  <div className="row opcionesMenu">
                    <div className="row opcionRow">
                      <Link to="/Seleccionar-cuestionario">
                        <button id="opcion">
                          Contestar Autoevaluación &nbsp;
                          <FontAwesomeIcon icon={faFileText} />
                        </button>
                      </Link>
                    </div>
                    <div className="row opcionRow">
                      <Link to="/Comparativa-de-retroalimentaciones">
                        <button id="opcion">
                          Comparar retroalimentaciones &nbsp;{" "}
                          <FontAwesomeIcon icon={faTable} />{" "}
                        </button>
                      </Link>
                    </div>
                    <div className="row opcionRow">
                      <Link to="../Actualizar-información">
                        <button id="opcion">
                          Editar Información &nbsp;{" "}
                          <FontAwesomeIcon icon={faPencil} />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Perfil;
