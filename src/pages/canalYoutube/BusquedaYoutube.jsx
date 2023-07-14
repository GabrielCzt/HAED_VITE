import React from "react";
import Titulo from "../../components/BarraDeTitulo";
import videos from "../../funciones/ContenidoYoutube";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../../estilos/Pages.css";
import "../../estilos/CanalYoutube.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

function BusquedaYoutube() {
  const navigate = useNavigate();
  const params = useParams();
  const contenido = videos;
  const [search, setSearch] = useState("");
  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };
  const [resultadosB, setResultadosB] = useState();
  const Busqueda = (buscar) => {
    if (buscar) {
      buscar = buscar.toLowerCase();
      buscar = buscar
        .normalize("NFD")
        .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
        .normalize();

      let regex = new RegExp(buscar);

      let resultados = [];
      for (let count = 0; count < contenido.length; count++) {
        let contenido_ = contenido[count];
        for (let countb = 0; countb < contenido_.length; countb++) {
          let titulo = contenido_[countb].titulo.toLowerCase();
          titulo = titulo
            .normalize("NFD")
            .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
            .normalize();
          if (regex.test(titulo)) {
            resultados.push({
              titulo: contenido_[countb].titulo,
              url: contenido_[countb].url,
              subtitulo: contenido_[countb].subtitulo,
              descripcion: contenido_[countb].descripcion,
            });
          }
        }
      }
      console.log(resultados);
      return resultados;
    }
  };

  useEffect(() => {
    setResultadosB(Busqueda(params.palabra));
    console.log(resultadosB);
  }, []);
  return (
    <>
      <Titulo titulo="Resultados de busqueda" />
      <div className="yt">
        <div className="container content">
          <div className="row searchBox">
            <div className="row boxInput">
              <input
                required
                value={search}
                onChange={handleChangeSearch}
                name="busqueda"
                type={"text"}
                id="mySearch"
                placeholder="Buscar video"
              ></input>
              <button
                id="buttonSearch"
                onClick={() => {
                  if (search !== "") {
                    navigate("/Busqueda/" + search);
                    window.location.reload();
                  }
                }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
            <br />
            <br />
            <div className="row boxBack">
              <button id="back" onClick={()=>{navigate("/CanalYoutube/1")}}>
                <FontAwesomeIcon icon={faXmarkCircle} />
                &nbsp;Cerrar busqueda
              </button>
            </div>
          </div>

          {!resultadosB
            ? ""
            : resultadosB.map((num, index) => {
                return (
                  <>
                    <div className="row">
                      {/**Las clases de order, establecen que elemento quedará arriba cuando se adapte la
                       * pantalla a vista de celular
                       */}
                      <div className="col-sm-12 col-md-4 order-2 order-sm-2 order-md-1">
                        <div className="Ratio Ratio-16x9">
                          <iframe
                            allowfullscreen="true"
                            src={num.url}
                            title={num.titulo}
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          ></iframe>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-4 order-3 order-sm-3 order-md-2">
                        <h5>{num.titulo}</h5>
                        <h6>{num.subtitulo}</h6>
                        <p>{num.descripcion}</p>
                      </div>
                      <hr />
                    </div>
                  </>
                );
              })}
        </div>
      </div>
    </>
  );
}
export default BusquedaYoutube;
