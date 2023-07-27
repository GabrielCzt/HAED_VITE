import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/Perfil.css";
import "../estilos/Pages.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SessionContext from "../context/SessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileText,
  faUser,
  faTable,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import fetchData from "../funciones/ObtenerInformación";
import Titulo from "../components/BarraDeTitulo";
import { decrypt } from "../funciones/Cifrado";

const cookie = new Cookies();

function Perfil() {
  const navigate = new useNavigate();
  const [info, setInfo] = useState([]);

  useEffect(() => {
    if (!cookie.get("token")) {
      navigate("/Iniciar-sesion");
    }
    const fetchDataAsync = async () => {
      const data = await fetchData();
      console.log(data);
      setInfo(data);

    };
    fetchDataAsync();
  }, []);

  let nombres = cookie.get("nombres");
  return (
    <>
      <Titulo titulo="Perfil de usuario"/>
      {/* Etiqueta separadora de estilos */}
      <div className="profile">
        <div className="container">
          <div className="row">
            <h3>Bienvenido {info.nombres}</h3> <hr />
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 btnContainer">
              <Link to="/Seleccionar-cuestionario">
                <button id="opcion">
                  Contestar Autoevaluación &nbsp;
                  <FontAwesomeIcon icon={faFileText} />
                </button>
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 btnContainer">
              <Link to="/Informacion-perfil">
                <button id="opcion">
                  Ver información del perfil &nbsp;{" "}
                  <FontAwesomeIcon icon={faUser} />{" "}
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 btnContainer">
              <Link to="/Comparativa-de-retroalimentaciones">
                <button id="opcion">
                  Comparar retroalimentaciones &nbsp;{" "}
                  <FontAwesomeIcon icon={faTable} />{" "}
                </button>
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 btnContainer">
              <Link to="/Seleccionar-cuestionario">
                <button id="opcion">
                  Editar Información &nbsp; <FontAwesomeIcon icon={faPencil} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;
