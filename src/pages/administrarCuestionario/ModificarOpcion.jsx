import React from "react";
import "../../estilos/AdministrarCuestionarios.css";
import MenuAdmin from "../../components/MenuAdmin";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getOpciones } from "../../funciones/AdministrarCuestionario";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Titulo from "../../components/BarraDeTitulo";
import Swal from "sweetalert2";
import { putOpcion } from "../../funciones/AdministrarCuestionario";
import fetchData from "../../funciones/ObtenerInformación";
import Cargando from "../../components/Cargando";

function ModificarOpcion() {
  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData();
      if (data.rol_id !== 3) {
        navigate("/");
      }
    };
    fetchDataAsync();
  }, []);
  const [antiguaOpt, setAntiguaOpt] = useState("");
  const [opcion, setOpcion] = useState("");
  const [retroalimentacion, setRetroalimentacion] = useState("");

  const handleChangeOpcion = (event) => {
    setOpcion(event.target.value);
  };
  const handleChangeRetroalimentacion = (event) => {
    setRetroalimentacion(event.target.value);
  };
  const [links, setLinks] = useState([]);
  const [opciones_, set_Opciones] = useState(null);
  const params = useParams();
  const addLink = () => {
    Swal.fire({
      title: "Ingrese la URL",
      text: "La URL debe empezar por https:// y terminar en un dominio (.com, .mx, etc.), los links de YouTube deben ser especiales para incrustar",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: async (link) => {
        const regex = /^https:\/\//;
        const regexHtp = /^http:\/\//;
        const regexYT = /youtube/i; 
        const regexEmbed = /embed/i; 
        if (regex.test(link) || regexHtp.test(link)) {
          if (regexYT.test(link)) {
            if (regexEmbed.test(link)) {
              setLinks((prevLinks) => [...prevLinks, link]);
              console.log(links);
            } else {
              Swal.fire({
                title: "Advertencia",
                text: "Los links de YouTube deben ser de incrustación, un link INCORRECTO sería : https://www.youtube.com/watch?v=ju7iZi87s6g, el mismo link CORRECTO debería verse así : https://www.youtube.com/embed/ju7iZi87s6g, para más información consulte el manual de usuario",
                icon: "warning",
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: "Ok",
              });
            }
          }
          else{
            setLinks((prevLinks) => [...prevLinks, link]);
              console.log(links);
          }
        } else {
          Swal.fire({
            title: "Advertencia",
            text: "Parece que no ha ingresado un link valido, recuerde: debe iniciar con https:// y terminar con un dominio (.com, .mx, etc)",
            icon: "warning",
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: "Ok",
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  const modificarOpcion = async () => {
    console.log("antigua" + antiguaOpt);
    console.log("nueva" + opcion);
    const response = await putOpcion(
      parseInt(params.idpreg),
      antiguaOpt,
      opcion,
      retroalimentacion,
      links
    );
    if (response === 200) {
      Swal.fire({
        text: "Se ha actualizado correctamente",
        icon: "success",
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: "Ok",
      }).then((continuar) => {
        if (continuar.value) {
          window.location.reload();
        }
      });
    } else {
      Swal.fire({
        text: "Algo salió mal, compruebe su conexión a internet o intente más tarde",
        icon: "error",
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    const setOpciones = async () => {
      const data = await getOpciones();
      console.log(data);
      setLinks(data[parseInt(params.idx)].links);
      console.log("current " + data[parseInt(params.idx)].opcion);
      setAntiguaOpt(data[parseInt(params.idx)].opcion);
      set_Opciones(data);
    };
    setOpciones();
  }, []);
  const deleteLink = (indice) => {
    const linksProvicional = [...links];
    linksProvicional.splice(indice, 1);
    setLinks(linksProvicional);
  };
  return (
    <>
      <Titulo titulo="Modificar Opción" />
      <div className="modificarOpcion">
        <div className="row">
          <MenuAdmin />
          <div className="col containerModificarO">
            <div className="container">
              {!opciones_ ? (
                <Cargando />
              ) : (
                <>
                  <li className="element">
                    <div className="col-12">
                      <h4>Nombre de la opción</h4>
                    </div>
                    <div className="col-12">
                      {!opciones_ ? (
                        ""
                      ) : (
                        <h6>{opciones_[parseInt(params.idx)].opcion}</h6>
                      )}
                    </div>
                    <div className="col-10 mb-4">
                      <input
                        type="text"
                        placeholder="Ingrese la opción actualizada"
                        onChange={handleChangeOpcion}
                      />
                    </div>
                  </li>
                  <li className="element">
                    <div className="col-12">
                      <h4>Retroalimentación</h4>
                    </div>
                    <div className="col-12">
                      {!opciones_ ? (
                        ""
                      ) : (
                        <p>{opciones_[parseInt(params.idx)].feedback}</p>
                      )}
                    </div>
                    <div className="col-12">
                      <h6>
                        <b>Ingrese la nueva retroalimentación</b>
                      </h6>
                    </div>
                    <div className="col-12">
                      <textarea onChange={handleChangeRetroalimentacion} />
                    </div>
                  </li>
                  <li className="element">
                    <div className="row">
                      <div className="col-10 mb-5">
                        <h4>Links</h4>
                      </div>
                      <div className="col">
                        <button
                          onClick={() => {
                            addLink();
                          }}
                          id="smallSuccess"
                        >
                          <FontAwesomeIcon icon={faPlusCircle} />
                        </button>
                      </div>
                    </div>

                    <div className="col-12">
                      <ul>
                        {!links.map
                          ? ""
                          : links.map((link, idx) => {
                              return (
                                <>
                                  <li>
                                    <div className="row">
                                      <div className="col-10">{link}</div>
                                      <div className="col">
                                        <button
                                          id="delete"
                                          onClick={() => {
                                            deleteLink(idx);
                                          }}
                                        >
                                          <FontAwesomeIcon icon={faClose} />
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                                  <hr />
                                </>
                              );
                            })}
                      </ul>
                    </div>
                  </li>
                  <li className="element">
                    <button
                      onClick={() => {
                        modificarOpcion();
                      }}
                      id="success"
                    >
                      Guardar cambios
                    </button>
                  </li>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ModificarOpcion;
