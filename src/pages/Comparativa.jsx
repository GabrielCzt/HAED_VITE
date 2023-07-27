import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "../estilos/Comparativa.css";
import "../estilos/Pages.css";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Titulo from "../components/BarraDeTitulo";
const cookie = new Cookies();
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { decryptToken } from "../funciones/Cifrado";

function Intentos() {
  const navigate = new useNavigate();
  if (!cookie.get("token")) navigate("./Iniciar-sesion");
  // funcion para obtener las retroalimentaciones seleccionadas
  const fetchRetro = async () => {
    let select = document.getElementById("leftRetro");
    let intento = select.value;
    console.log(intento);

    try {
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
        setRetro(jsonData);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const [retro, setRetro] = useState("");
  const [data, setData] = useState(null);
  const [lastRetro, setLastRetro] = useState(null);

  useEffect(() => {
    // Obteniendo el listado de resultados y fechas
    const fetchData = async () => {
      try {
        const url =
          "http://api-haed.danielreyesepitacio.cloud/api/users/intentos";
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
          setData(jsonData);
          const numeroMayor = jsonData.reduce((max, elemento) => {
            return Math.max(max, elemento.id);
          }, -Infinity);
          const lastUrl =
            "http://api-haed.danielreyesepitacio.cloud/api/users/evaluaciones/respuestas/" +
            numeroMayor;
          const lastResponse = await fetch(lastUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (lastResponse.ok) {
            const lastJsonData = await lastResponse.json();
            console.log(lastJsonData);
            setLastRetro(lastJsonData);
          } else {
            console.error("Error en la solicitud:", lastResponse.status);
          }
        } else {
          console.log("Error en la solicitud:", response.status);
        }
      } catch (error) {
        console.log("Error en la solicitud:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Titulo titulo="Comparar Retroalimentaciones" />
      {/* Etiqueta separadora de estilos */}
      <div className="compara">
        <div className="container">
          <Link to="../Perfil"><button id="volver">Regresar al menú &nbsp;<FontAwesomeIcon icon={faCircleArrowLeft} /></button></Link>
          <h3>
            Seleccione una fecha para ver sus retroalimentaciones
          </h3>
          <br />
          <div className="row">
            {/* Primera columna */}
            <div className="row selection">
              <select name="fecha" id="leftRetro" onChange={fetchRetro}>
                <option value="">Seleccione una fecha</option>
                {!data ? (
                  <p>Algo salió mal</p>
                ) : (
                  data.slice(0, -1).map((num, index) => {
                    const fecha = num.fecha;
                    const fechaFormateada =
                      moment(fecha).format("DD-MM-YYYY");
                    return (
                      <>
                        <option value={num.id}>{fechaFormateada}</option>
                      </>
                    );
                  })
                )}
              </select>
            </div>
            <div className="col-sm-12 col-md-6" id="leftColumn">
              <div className="row">
                <h5>{!retro ? "" : retro.titulo}</h5>
                {!retro ? (
                  <>
                    <p>Seleccione una fecha de la lista desplegable</p>
                    <br />
                  </>
                ) : (
                  retro.preguntas.map((num, index) => {
                    return (
                      <>
                        {!num.respuestas[0] ? "" : <li>
                          {num.respuestas[0].feedback}
                          {!num.respuestas[0].links
                            ? ""
                            : num.respuestas[0].links.map((numb, indx) => {
                              return (
                                <>
                                  <div className="row">
                                    <Link
                                      to={
                                        "../Material-de-apoyo/comparativa/" +
                                        index +
                                        "/" +
                                        indx
                                      }
                                    >
                                      <button onClick={cookie.set("intento", num.respuestas[0].intento_id, { path: "" })} id="goTo">
                                        Material de apoyo {indx + 1}
                                      </button>
                                    </Link>
                                  </div>
                                </>
                              );
                            })}
                        </li>
                        }

                      </>
                    );
                  })
                )}
              </div>
            </div>
            {/* segunda columna, intentar mostrar la ultima respuesta */}
            <div className="col-sm-12 col-md-6" id="rightColumn">
              <div className="row selection">
                <h5>
                  Retroalimentación más reciente:{" "}
                  {!lastRetro ? "" : lastRetro.titulo}
                </h5>
              </div>
              <div className="row">
                {!lastRetro ? (
                  <>
                    <p>No se encontró ninguna retroalimentación</p>
                    <br />
                  </>
                ) : (
                  lastRetro.preguntas.map((num, index) => {
                    return (
                      <>
                      {!num.respuestas[0]?"": <li>
                          {num.respuestas[0].feedback}
                          {!num.respuestas[0].links
                            ? ""
                            : num.respuestas[0].links.map((numb, indx) => {
                              return (
                                <>
                                  <div className="row">
                                    <Link
                                      to={
                                        "../Material-de-apoyo/comparativa/" +
                                        index +
                                        "/" +
                                        indx
                                      }
                                    >
                                      <button onClick={cookie.set("intento", num.respuestas[0].intento_id, { path: "" })} id="goTo">
                                        Material de apoyo {indx + 1}
                                      </button>
                                    </Link>
                                  </div>
                                </>
                              );
                            })}
                        </li>}
                        
                      </>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Intentos;
