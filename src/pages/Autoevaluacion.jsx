import React, { useContext, useEffect, useState } from "react";
import "../estilos/Autoevaluacion.css";
import "../estilos/Pages.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  faArrowRight,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Titulo from "../components/BarraDeTitulo";
import { decryptToken } from "../funciones/Cifrado";
import Cargando from "../components/Cargando";
import Swal from "sweetalert2";

const cookie = new Cookies();

function Cuestionario() {
  const [espera, setEspera] = useState("Registrar respuestas");
  const [icon, setIcon] = useState(faArrowRight);
  const navigate = new useNavigate();
  {
    /**Obteniendo el formulario de la API */
  }
  const url =
    "http://api-haed.danielreyesepitacio.cloud/api/evaluaciones/" +
    cookie.get("cuest") +
    "/all";
  const [cuest, setCuest] = useState();
  const token = decryptToken(cookie.get("token"));
  const fetchApi = async () => {
    const response = await fetch(url,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const apiResponse = await response.json();
    console.log(apiResponse)
    setCuest(apiResponse);
  };
  useEffect(() => {
    if (!cookie.get("token")) {
      navigate("/Seleccionar-cuestionario");
    }
    fetchApi();
  }, []);

  const [retro, setRetro] = useState([]);

  const Add = () => {
    setEspera("Espere, enviando ");
    setIcon(faArrowsRotate);
    const seleccion = document.querySelectorAll('input[type="radio"]:checked');
    console.log(seleccion)
    const retroalimentacion = Array.from(seleccion).map((elemento) => {
      return { pregunta_id: elemento.name, respuesta: elemento.value };
    });
    console.log(retroalimentacion)
    if(retroalimentacion.length>0){
      try {
      const params = {
        evaluacion_id: cookie.get("cuest"),
        respuestas: retroalimentacion.map((num) => {
          return num;
        }),
      };
  
      console.log(params);
      const token = decryptToken(cookie.get("token"));
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      
      // Usamos axios y pasamos el link y los parametros
      axios.post("http://api-haed.danielreyesepitacio.cloud/api/respuestas/all", params, headers)
        .then((response) => {
          console.log(response.data);
          console.log(response.data[0].intento_id);
          cookie.set("intento", response.data[0].intento_id, { path: "/" });
  
          // Aquí dentro del "then", después de recibir la respuesta exitosa, hacemos el navigate
          setTimeout(() => {
            navigate("/Retroalimentacion");
          }, 4000);
        })
        .catch((error) => {
          console.log(error);
          // Manejar errores de solicitud API si es necesario
        });
    } catch {
      console.log("Error, sin retroalimentacion");
    }
    }
    else{
      Swal.fire({
        text: "Debe contestar al menos una pregunta",
        icon: "error",
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: "Ok",
      }).then(()=>{
        setEspera("Registrar respuestas");
        setIcon(faArrowRight);
      })
    }
    
  };
  
  return (
    <>
      <Titulo titulo="Autoevaluación" />

      {/**Etiqueta separadora de estilos */}
      <div className="questions">
        <div className="container">
          <div className="row">
            {!cuest ? "" : <h3>Está contestando {cuest.titulo}</h3>}
            {/**Separando cada pregunta como un elemento de lista */}
            <ul>
              {/**Se deben mapear las preguntas */}
              {!cuest
                ? <Cargando/>
                : cuest.preguntas.map((num, index) => {
                    const _id = num.id;

                    return (
                      <>
                        <li>
                          <div className="row">
                            <div className="col-1 numero">
                              <h5>{index + 1}</h5>
                            </div>
                            <div className="col">
                              <div className="question">
                                <p id="pregunta">{num.pregunta}</p>
                                {/**Mapeamos las opciones de cada pregunta */}
                                {num.opciones.map((opt, index) => {
                                  let valor;
                                  try {
                                    valor = opt.opcion;
                                  } catch {
                                    valor = "Sin retroalimentacion";
                                  }
                                  return (
                                    <>
                                      <input
                                        type="radio"
                                        name={opt.pregunta_id}
                                        value={valor}
                                        required
                                      />
                                      &nbsp;
                                      <label>{opt.opcion}</label>
                                      <br />
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </li>
                      </>
                    );
                  })}
            </ul>
            {!cuest ? (
              ""
            ) : (
              <button
                id="contestar"
                onClick={(event) => {
                  event.stopPropagation();
                  Add();
                }}
              >
                {espera}&nbsp;&nbsp;
                <FontAwesomeIcon icon={icon} />
              </button>
            )}
          </div>
        </div>

        <br />
        <br />
      </div>
    </>
  );
}

export default Cuestionario;
