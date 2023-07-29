import React, { useEffect } from "react";
import "../estilos/Pages.css";
import "../estilos/PerfilAdministrador.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import fetchData from "../funciones/ObtenerInformación";
import Titulo from "../components/BarraDeTitulo";
import MenuAdmin from "../components/MenuAdmin";
import Cargando from "../components/Cargando";



function PerfilAdministrador() {
  const navigate = new useNavigate();
  const [info, setInfo] = useState(null);
  useEffect(() => {
    // ^ Obtenemos los datos del administrador ===============================================================
    const fetchDataAsync = async () => {
      const data = await fetchData();
      console.log(data);
      setInfo(data);
      if (data.rol_id !== 3) {
        navigate("../Perfil");
      }
    };
    fetchDataAsync();
  }, []);
  return (
    <>
      <Titulo titulo="Opciones de administrador" />

      {/* Etiqueta separadora de estilos ========================================================== */}
      <div className="adminProfile">
        <div className="row">
          <MenuAdmin />
          <div className="col adminProfileContainer">
            <div className="container">
              {!info ? (
                <Cargando />
              ) : (
                <div className="row">
                  {/* Tarjeta de datos del usuario ==================================================== */}
                  <div className="col-lg-4">
                    <div className="profile-card-4 z-depth-3">
                      <div className="card">
                        {/* Imagen de tarjeta ========================================================= */}
                        <div className="card-body text-center bg-success rounded-top">
                          <div className="user-box">
                            <button
                              className="btn "
                              onClick={() => navigate("/")}
                            >
                              <img
                                className="img"
                                src="https://pbs.twimg.com/profile_images/1609948030865743872/FXN0HLMz_400x400.jpg"
                                height="100"
                                width="100"
                              />
                            </button>
                          </div>
                          <h5 className="mb-1 text-white">
                            Universidad Tecnológica de Puebla
                          </h5>
                        </div>
                        {/* Cuerpo de la tarjeta ======================================================  */}
                        <div className="card-body">
                          {/* Lista de elementos ======================================================  */}
                          <ul className="list-group shadow-none">
                            {/* Elemento ===============================================================*/}
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
                            {/* Elemento =============================================================== */}
                            <li className="list-group-item">
                              <div className="list-icon">
                                <i className="fa fa-globe"></i>
                              </div>
                              <div className="list-details">
                                <span>{info.matricula}</span>
                                <small>ID</small>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8">
                    <div className="card z-depth-3">
                      {/* Contenido de la tarjeta ==================================================== */}
                      <div className="card-body">

                        <div className="tab-content p-3">
                          {/* Panel de datos =========================================================*/}
                          <div className="tab-pane active  show" id="edita">
        
                          
                              {/* Separador de datos ================================================  */}
                              <div className="form-group row">
                                <label className="col-lg-3 ">
                                  <b>Correo Electronico</b>
                                </label>
                                <div className="col-lg-9">
                                  <p>{info.email}</p>
                                </div>
                              </div>
                              {/* Separador de datos=================================================  */}
                              <div className="form-group row">
                                <label className="col-lg-3 ">
                                  <b>Centro de trabajo</b>
                                </label>
                                <div className="col-lg-9">
                                  <p>{info.centro_trabajo}</p>
                                </div>
                              </div>
                              {/* Separador de datos =================================================  */}
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label">
                                  <b>Edad</b>
                                </label>
                                <div className="col-lg-9">
                                  <p>{info.edad}</p>
                                </div>
                              </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PerfilAdministrador;
