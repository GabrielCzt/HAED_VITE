import React,{useState} from "react";
import "../../estilos/Pages.css";
import "../../estilos/CanalYoutube.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Titulo from "../../components/BarraDeTitulo";
import videos from "../../funciones/ContenidoYoutube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


function CanalYT_Start() {
  const [search,setSearch]=useState("");
  const navigate = useNavigate();
  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };
  const params = useParams();
  const pagina = params.numero - 1;
  const contenido = videos;
  return (
    <>
      <Titulo titulo="Canal de YouTube" />
      {/**Etiqueta separadora de estilos */}
      <div className="yt">
        <div className="container content">
          {/**IMPORTANTE
           * Cada video está en un renglón diferente, el video y su descripción se separan por columnas
           */}
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

          </div>

          {!contenido[pagina]
            ? "Esta página no existe"
            : contenido[pagina].map((num, index) => {
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
          <div>
            <br />
            {contenido[pagina] ? (
              pagina === 0 ? (
                <Link
                  id="siguiente"
                  to={"/CanalYoutube/" + (parseInt(params.numero) + 1)}
                >
                  Siguiente
                </Link>
              ) : contenido[pagina + 1] ? (
                <>
                  <Link
                    id="anterior"
                    to={"/CanalYoutube/" + (parseInt(params.numero) - 1)}
                  >
                    Anterior
                  </Link>
                  <Link
                    id="siguiente"
                    to={"/CanalYoutube/" + (parseInt(params.numero) + 1)}
                  >
                    Siguiente
                  </Link>
                </>
              ) : (
                <Link
                  id="anterior"
                  to={"/CanalYoutube/" + (parseInt(params.numero) - 1)}
                >
                  Anterior
                </Link>
              )
            ) : (
              <>
                <h2>Esta página no existe</h2>
                <br />
                <Link id="anterior" to="/CanalYoutube/1">
                  Ir a la primera página de Recomendaciones
                </Link>
              </>
            )}

            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
export default CanalYT_Start;
