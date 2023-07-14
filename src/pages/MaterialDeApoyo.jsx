import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Titulo from "../components/BarraDeTitulo";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "../estilos/MaterialDeApoyo.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
const cookie = new Cookies();
function MaterialDeApoyo() {
  let parametros = useParams();
  let origen = parametros.origen;
  let retro = parametros.retro;
  let link = parametros.link;
  const navigate = new useNavigate();

  const [toPrintR, setToPrintR] = useState({ url: null, video: false });
  const [pageBack, setPageBack] = useState("");
  useEffect(() => {
    let origen = parametros.origen;
    if (origen === "retroalimentacion") {
      setPageBack("../Retroalimentacion");
    } else {
      setPageBack("../Comparativa-de-retroalimentaciones");
    }
    if (!cookie.get("token")) {
      navigate("/Iniciar-sesion");
    }
    const fetchData = async () => {
      try {
        console.log(cookie.get("intento"));
        let intento = parseInt(cookie.get("intento"));
        const url =
          "http://api-haed.danielreyesepitacio.cloud/api/users/evaluaciones/respuestas/" +
          intento;
        const token = cookie.get("token");
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
          if (!toPrintR.url) {
            const regex = /(youtube\.com|youtu\.be)/;
            setToPrintR({
              url: jsonData.preguntas[retro].respuestas[0].links[link],
              video: regex.test(
                jsonData.preguntas[retro].respuestas[0].links[link]
              ),
            });
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
      <Titulo titulo="Material de Apoyo" />
      <div className="apoyo">
        <div className="container">
          <Link to={pageBack}>
            <button id="volver">
              Regresar a {origen} &nbsp;
              <FontAwesomeIcon icon={faCircleArrowLeft} />
            </button>
          </Link>
          <div className="row">
            <div id="advertencia">
              <h5>
                ¡Importante! El siguiente contenido no pertenece a HAED, por
                favor, ten precaución al interactuar con él. ¡Gracias!
              </h5>
            </div>
          </div>
          <div className="pagina">
            {toPrintR.video === true ? (
              <iframe
              id="video"
              allowfullscreen="true"
              src={"https://"+toPrintR.url+"?rel=0&modestbranding=1&showinfo=0"}
              title="Material de apoyo"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
            ) : (
              <iframe
                sandbox="allow-scripts allow-same-origin"
                id="cuerpo"
                title="Iframe Example"
                src={toPrintR.url}
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default MaterialDeApoyo;
