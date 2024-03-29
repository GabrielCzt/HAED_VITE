import React, {  useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "../estilos/Pages.css";
import "../estilos/Retroalimentacion.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Titulo from "../components/BarraDeTitulo";
import { decryptToken } from "../funciones/Cifrado";
import Cargando from "../components/Cargando";

const cookie = new Cookies();

function Retroalimentacion() {
  const navigate = new useNavigate();

  const [toPrintR, setToPrintR] = useState(null);

  useEffect(() => {
    // ^Validamos que el usuario esté registrado =======================================================
    if (!cookie.get("token")) {
      navigate("/Iniciar-sesion");
    }
    // ^Obtenemos las retroalimentaciones al cargar el componente ==========================================
    const fetchData = async () => {
      try {
        console.log(cookie.get("intento"));
        let intento = parseInt(cookie.get("intento"));
        const url =
          "http://api-haed.danielreyesepitacio.cloud/api/users/evaluaciones/respuestas/" +
          intento;
        const token = decryptToken(cookie.get("token"));
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const jsonData = await response.json();
          console.log(jsonData);
          if (!toPrintR) {
            setToPrintR(jsonData);
          }
        } else {
          console.error("Error en la solicitud:", response.status);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (toPrintR) {
      console.log(toPrintR);
    }
  });

  return (
    <>
      <Titulo titulo="Retroalimentacion" />
      {/* Etiqueta separadora de estilos ================================================================*/}
      <div className="retrA">
        <div className="container">
          <h5>Estas son algunas recomendaciones a tomar en cuenta</h5>
          {/* Validacion para el mensaje de carga ========================================================= */}
          {!toPrintR ? (
            <>
              <Cargando/>
            </>
          ) : (
            toPrintR.preguntas.map((num, index) => {
              return (
                <div key={index}>
                  {!num.respuestas[0] ? "" : <div className="row">
                    <div className="col-1 hand">
                      <FontAwesomeIcon icon={faHandPointRight} />
                    </div>
                    <div className="col">

                      <li>
                        {num.respuestas[0] ? num.respuestas[0].feedback : ""}
                        {!num.respuestas[0]
                          ? ""
                          : num.respuestas[0].links.map((numb, indx) => {
                            return (
                              <>
                                <div className="row">
                                  <Link
                                    to={
                                      "../Material-de-apoyo/retroalimentacion/" +
                                      index +
                                      "/" +
                                      indx
                                    }
                                  >
                                    <button id="goTo">
                                      Material de apoyo {indx + 1}
                                    </button>
                                  </Link>
                                </div>
                              </>
                            );
                          })}
                      </li>
                    </div>
                  </div>}

                </div>
              );
            })
          )}
          {/* Botones de redirección al final ========================================================== */}
          <Link to="/Seleccionar-cuestionario">
            <button id="end">Volver al menú de selección</button>
          </Link>
          <Link to="/Comparativa-de-retroalimentaciones">
            <button id="end">Ir a comparar retroalimentaciones</button>
          </Link>
          <Link to="/">
            <button id="end">Ir al Inicio</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Retroalimentacion;
