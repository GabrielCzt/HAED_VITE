import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  deleteOpcion,
  getOpciones,
  getPregunta,
} from "../../funciones/AdministrarCuestionario";
import { useState } from "react";
import Titulo from "../../components/BarraDeTitulo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClose,
  faPencil,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { putPregunta } from "../../funciones/AdministrarCuestionario";
import Swal from "sweetalert2";
import "../../estilos/AdministrarCuestionarios.css";
import { useNavigate } from "react-router-dom";
import MenuAdmin from "../../components/MenuAdmin";
import Cargando from "../../components/Cargando";

import fetchData from "../../funciones/ObtenerInformación";

function ModificarPregunta() {
  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData();
      if (data.rol_id !== 3) {
        navigate("/");
      }
    };
    fetchDataAsync();
  }, []);
  const navigate = new useNavigate();
  const params = useParams();
  const idEv = params.id;
  const idPreg = params.idpreg;
  const [_pregunta, set_Pregunta] = useState(null);
  const [_opciones, set_Opciones] = useState(null);

  const eliminarOpcion = async (idpreg, opcion) => {
    Swal.fire({
      text: "Esta acción no es reversible. ¿Desea continuar?",
      icon: "warning",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
    }).then(async (continuar) => {
      if (continuar.value) {
        const response = await deleteOpcion(idpreg, opcion);

        console.log("respuesta : " + response);
        if (response === 200) {
          Swal.fire({
            text: "Se ha eliminado correctamente",
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
            text: "Algo salió mal, compruebe su conexión o intentelo más tarde",
            icon: "error",
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: "Ok",
          });
        }
      }
    });
  };

  useEffect(() => {
    const setPregunta = async () => {
      const data = await getPregunta(params.idpreg);
      console.log(data);
      set_Pregunta(data);
    };
    const setOpciones = async () => {
      const data = await getOpciones();
      console.log(data);
      set_Opciones(data);
    };
    setOpciones();
    setPregunta();
  }, []);
  const [upPregunta, setUpPregunta] = useState("");
  const handleChangePregunta = (event) => {
    setUpPregunta(event.target.value);
  };
  const actualizarPregunta = async () => {
    if (upPregunta !== "") {
      const response = await putPregunta(idPreg, idEv, upPregunta);
      console.log(response);
      if (response === 200) {
        Swal.fire({
          text: "Actualización exitosa",
          icon: "success",
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: "Ok",
        }).then(() => {
          window.location.reload();
        });
      }
    } else {
      Swal.fire({
        text: "Para actualizar debe ingresar la pregunta modificada en el campo",
        icon: "warning",
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: "Ok",
      });
    }
  };
  return (
    <>
      <Titulo titulo="Modificar pregunta" />
      <div className="modiPregunta">
        <div className="row">
          <MenuAdmin />
          <div className="col containerModiPregunta">
            {!_pregunta ? (
              <Cargando />
            ) : (
              <div className="container">
                <li className="lista">
                  <div className="row">
                    <div className="col-12">
                      <h5>{!_pregunta ? "" : _pregunta.pregunta}</h5>
                    </div>
                    <div className="col-10">
                      {!_pregunta ? (
                        ""
                      ) : (
                        <input
                          onChange={handleChangePregunta}
                          type="text"
                          placeholder="Introduce aquí la pregunta actualizada"
                        />
                      )}
                    </div>
                    <div className="col">
                      <button
                        id="smallSuccess"
                        onClick={() => {
                          actualizarPregunta();
                        }}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="row mb-3">
                      <div className="col-sm-6 col-md-10">
                        <h3>
                          <b>Opciones</b>
                        </h3>
                      </div>
                      <div className="col">
                        <Link
                          to={
                            "/Administrar-cuestionarios/Modificar-cuestionario/Crear-opcion/" +
                            parseInt(params.idpreg)
                          }
                        >
                          <button id="smallSuccess">
                            <FontAwesomeIcon icon={faPlusCircle} />
                          </button>
                        </Link>
                      </div>
                      <br />
                    </div>
                    {!_opciones
                      ? ""
                      : _opciones.map((opt, index) => {
                          return (
                            <>
                              {opt.pregunta_id === parseInt(params.idpreg) ? (
                                <>
                                  <div className="row mb-3">
                                    <div className="col-10">
                                      <h6>{opt.opcion}</h6>
                                    </div>
                                    <div className="col">
                                      <Link
                                        to={
                                          "/Administrar-cuestionarios/Modificar-cuestionario/Modificar-opcion/" +
                                          parseInt(params.idpreg) +
                                          "/" +
                                          index
                                        }
                                      >
                                        <button id="edit">
                                          <FontAwesomeIcon icon={faPencil} />
                                        </button>
                                      </Link>
                                      &nbsp;
                                      <button
                                        onClick={() => {
                                          eliminarOpcion(
                                            parseInt(params.idpreg),
                                            opt.opcion
                                          );
                                        }}
                                        id="delete"
                                      >
                                        <FontAwesomeIcon icon={faClose} />
                                      </button>
                                      <br />
                                    </div>
                                  </div>
                                  <hr />
                                </>
                              ) : (
                                ""
                              )}
                            </>
                          );
                        })}
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate(
                        "../Administrar-cuestionarios/Modificar-cuestionario/" +
                          idEv
                      );
                    }}
                    id="success"
                  >
                    Todo listo, salir
                  </button>
                </li>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default ModificarPregunta;
