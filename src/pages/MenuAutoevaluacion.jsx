import { React, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import "../estilos/Menu.css";
import "../estilos/Pages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";
import Titulo from "../components/BarraDeTitulo";
import { decryptToken } from "../funciones/Cifrado";
import Cargando from "../components/Cargando";

const cookie = new Cookies();

function Menu() {
  //^ Obteniendo las autoevaluaciones disponibles ========================================================
  const url = "http://api-haed.danielreyesepitacio.cloud/api/evaluaciones";
  const [name, setName] = useState();
  const fetchApi = async () => {
    if (cookie.get("token")) {
      const token = decryptToken(cookie.get("token"));
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const apiResponse = await response.json();
      setName(apiResponse);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
  //^ Estableciendo la visibilidad del menú según la sesión ===============================================
  useEffect(() => {
    document.getElementById("visible").style.visibility = "visible";
    document.getElementById("visible").style.display = "unset";
    document.getElementById("redirect").style.visibility = "hidden";
    document.getElementById("redirect").style.display = "none";
    if (!cookie.get("token")) {
      document.getElementById("visible").style.visibility = "hidden";
      document.getElementById("visible").style.display = "none";
      document.getElementById("redirect").style.visibility = "visible";
      document.getElementById("redirect").style.display = "unset";
    }
  }, []);
  const navigate = new useNavigate();
  //^ Funcion para recargar la página=====================================================================
  const reload = () => {
    window.location.reload();
  };
  return (
    <>
      <Titulo titulo="Seleccionar cuestionario" />
      {/**Etiqueta separadora de estilos ===============================================================*/}
      <div id="visible">
        <div className="menuEvaluacion">
          <div className="container">
            <h4>Seleccione un cuestionario para continuar</h4>
            <hr />
            {/* Se mapea la cantidad de cuestionarios para generar tantos botones como sea neceario */}
            {!name ? (
              <>
                <Cargando />
                <button id="toLogIn" onClick={reload}>
                  Clic aquí para reintentar
                </button>
              </>
            ) : (
              name.map((num, index) => {
                return (
                  //^ No se usa la etiqueta Link para evitar conflictos al usar onCLick, en cambio
                  //^ se agrega una etiqueta h5 con funcionalidad onClick y useNavigate
                  <h5
                    className="_button"
                    onClick={() => {
                      cookie.set("cuest", num.id, { path: "/" });
                      navigate("/Autoevaluacion");
                    }}
                  >
                    Contestar {num.titulo}{" "}
                    <FontAwesomeIcon id="pen" icon={faPenToSquare} />{" "}
                  </h5>
                );
              })
            )}
            <br />
            <br />
          </div>
        </div>
      </div>
      {/* Por si el usuario no está logueado ============================================================ */}
      <div className="nonSession">
        <div id="redirect">
          <div className="container">
            <p className="display-6">
              Debe iniciar sesión para contestar la autoevaluación
            </p>
            <Link to="/Iniciar-sesion">
              <button id="toLogIn">Haga clic aquí para iniciar sesión</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
