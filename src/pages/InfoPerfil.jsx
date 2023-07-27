import axios from "axios";
import React, { useState, useEffect } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Spinner } from "react-bootstrap";
import "../estilos/InfoPerfil.css";
import Titulo from "../components/BarraDeTitulo";
import { decryptToken } from "../funciones/Cifrado";

const cookie = new Cookies();

function InfoPerfil() {
  const navigate = useNavigate();

  //  Estado para mostrar contraseña
  const [ojos, setOjos] = useState(faEye);

  /* Estado de error */
  const [error, setError] = useState("");

  /*Estado indicador en la carga correcta de credenciales*/

  const [loading, setLoading] = useState("");

  /* Objeto con informacion del usuario actual */

  const [info, setInfo] = useState([]);

  const token = decryptToken(cookie.get("token"));

  const fetchData = async () => {
    try {
      const url = "http://api-haed.danielreyesepitacio.cloud/api/users/info";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setInfo(json);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const reload = () => {
    window.location.reload();
  };

  const success = () => {
    let tab = document.getElementById("nav-card");
    if (tab) {
      tab.style.visibility = "hidden";
      tab.style.display = "none";
    }
  };

  useEffect(() => {
    fetchData();
    if (!cookie.get("token")) {
      navigate("/Iniciar-sesion");
    }
  }, []);

  /* Constantes de acceso y actualizacion */

  const nombre = info.nombres;
  const apellido = info.apellidos;
  const mat = info.matricula;
  const correo = info.email;

  /* Peticion de Actualizacion (PUT) */

  /* Estados de formulario, usados en la peticion con axios */

  const [matricula, setMat] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setCorreo] = useState("");
  const [password, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const validarCadenas = (cadena) => {
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return regex.test(cadena);
  };

  /* Manejador de Actualizacion (PUT) */

  const handleUpdate = async () => {
    if (validarCadenas(nombres) || nombres === "") {
      if (validarCadenas(apellidos) || apellidos === "") {
        if (password === confirm) {
          try {
            const updatedParams = {};

            {
              /* Verifica existencia del estado para añadirlo al objeto 'updatedParams' */
            }
            if (matricula) {
              updatedParams.matricula = matricula;
            }
            if (nombres) {
              updatedParams.nombres = nombres;
            }
            if (apellidos) {
              updatedParams.apellidos = apellidos;
            }
            if (email) {
              updatedParams.email = email;
            }
            if (password) {
              updatedParams.password = password;
            }

            await axios
              .put(
                "http://api-haed.danielreyesepitacio.cloud/api/users/update",
                updatedParams,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                setLoading(true);
                setTimeout(() => window.location.reload(), 3000);
                success();
                console.log(response.data);
              });
          } catch (error) {
            console.error(error);
          }
        } else {
          setError("Las contraseñas no coinciden");
          document.getElementById("error").focus();
          setTimeout(() => setError(""), 3000);
        }
      } else {
        setError(
          "Los apellidos no pueden tener números ni caracteres especiales"
        );
        document.getElementById("error").focus();
        setTimeout(() => setError(""), 3000);
      }
    } else {
      setError("Nombre(s) no pueden tener números ni caracteres especiales");
      document.getElementById("error").focus();
      setTimeout(() => setError(""), 3000);
    }
  };

  /*Muestra y oculta contraseña del input 'password' */

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
      {/**Barra de titulo */}
      <Titulo titulo="Información del docente" />
      <div className="infoPerfil">
        <div className="container">
          <div className="row">
            {/* Tarjeta de datos del usuario */}
            <div className="col-lg-4">
              <div className="profile-card-4 z-depth-3">
                <div className="card">
                  {/* Imagen de tarjeta */}
                  <div class="card-body text-center bg-success rounded-top">
                    <div class="user-box">
                      <button class="btn " onClick={() => navigate("/")}>
                        {" "}
                        <img
                          classNameName="img"
                          src="https://pbs.twimg.com/profile_images/1609948030865743872/FXN0HLMz_400x400.jpg"
                          height="100"
                          width="100"
                        />
                      </button>
                    </div>
                    <h5 class="mb-1 text-white">
                      Universidad Tecnologica de Puebla
                    </h5>
                  </div>
                  {/* Cuerpo de la tarjeta  */}
                  <div className="card-body">
                    {/* Lista de elementos  */}
                    <ul className="list-group shadow-none">
                      {/* Elemento */}
                      <li className="list-group-item">
                        <div className="list-icon">
                          <i className="fa fa-globe"></i>
                        </div>
                        <div className="list-details">
                          <span>{mat}</span>
                          <small>ID</small>
                        </div>
                      </li>
                      {/* Elemento */}
                      <li className="list-group-item">
                        <div className="list-icon">
                          <i className="fa fa-envelope"></i>
                        </div>
                        <div className="list-details">
                          <span>
                            {nombre} {apellido}{" "}
                          </span>
                          <small>Nombre</small>
                        </div>
                      </li>
                      {/* Elemento */}
                      <li className="list-group-item">
                        <div className="list-icon">
                          <i className="fa fa-globe"></i>
                        </div>
                        <div className="list-details">
                          <span>{correo}</span>
                          <small>Correo</small>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta de edicion para datos del usuario */}
            <div className="col-lg-8">
              <div className="card z-depth-3">
                {/* Contenido de la tarjeta */}
                <div className="card-body">
                  {/* Indica el apartado de contenido  */}

                  <ul
                    id="nav-card"
                    className="nav nav-pills nav-pills-success nav-justified"
                  >
                    <li className="nav-item">
                      <a
                        data-target="#edit_"
                        data-toggle="pill"
                        className="nav-link active show "
                      >
                        <i className="icon-note"></i>{" "}
                        <span className="hidden-xs">Editar Perfil</span>
                      </a>
                    </li>
                  </ul>

                  {loading ? (
                    <ul
                      id="nav-card"
                      className="nav nav-pills nav-pills-success nav-justified"
                    >
                      <li className="nav-item">
                        <a
                          data-target="#edit"
                          data-toggle="pill"
                          className="nav-link  show "
                        >
                          <i className="icon-note"></i>
                          <span className="hidden-xs">
                            Actualizando credenciales
                          </span>
                          <div>
                            <Spinner animation="border" variant="primary" />
                          </div>
                        </a>
                      </li>
                    </ul>
                  ) : (
                    <ul
                      id="nav-card"
                      className="nav nav-pills nav-pills-success nav-justified"
                    >
                      <li className="nav-item">
                        <a
                          data-target="#edit"
                          data-toggle="pill"
                          className="nav-link  show "
                        >
                          <i className="icon-note"></i>
                          <span id="error" className="hidden-xs">
                            {error}
                          </span>
                        </a>
                      </li>
                    </ul>
                  )}

                  {/* Cuerpo y Formulario de envio */}
                  <div className="tab-content p-3">
                    {/* Panel de datos */}
                    <div className="tab-pane active  show" id="edit_">
                      {/* Input y evento de formulario */}
                      <form onSubmit={handleUpdate}>
                        {/* Separador de input  */}
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Numero ID
                          </label>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => setMat(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* Separador de input  */}
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Nombre(s)
                          </label>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => setNombres(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* Separador de input  */}
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Apellido(s)
                          </label>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => setApellidos(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* Separador de input  */}
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Correo Electronico
                          </label>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="email"
                              onChange={(e) => setCorreo(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* Separador de input  */}
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Contraseña nueva
                          </label>
                          <div className="col-lg-9">
                            <input
                              id="myPassword"
                              className="form-control"
                              type="password"
                              onChange={(e) => setPass(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* Separador de input  */}
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Confirmar contraseña
                          </label>
                          <div className="col-lg-9">
                            <input
                              id="myPassword2"
                              className="form-control"
                              type="password"
                              onChange={(e) => setConfirm(e.target.value)}
                            />
                            <FontAwesomeIcon
                              id="eye"
                              onClick={SeePassword}
                              icon={ojos}
                            />
                          </div>
                        </div>
                        {/* Separador de input  */}
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label"></label>
                          {/* Enviar o cancelar el envio de datos */}
                          <div className="col-lg-9">
                            <input
                              type="reset"
                              className="btn btn-secondary"
                              onClick={reload}
                              value="Cancelar"
                            />
                            <input
                              type="submit"
                              className="btn btn-success"
                              value="Guardar cambios"
                            />
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

      {/* Contenedor principal de contenido */}
    </>
  );
}

export default InfoPerfil;
