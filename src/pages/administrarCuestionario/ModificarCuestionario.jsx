import React from "react";
import Titulo from "../../components/BarraDeTitulo";
import {
  deletePregunta,
  getEvaluacion,
  postPregunta,
} from "../../funciones/AdministrarCuestionario";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faCheck,
 
  faClose,
  
  faPencil,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import { putEvaluacion } from "../../funciones/AdministrarCuestionario";
import Swal from "sweetalert2";
import "../../estilos/AdministrarCuestionarios.css";
import MenuAdmin from "../../components/MenuAdmin";
import Cargando from "../../components/Cargando";

import fetchData from "../../funciones/ObtenerInformación";

function ModificarCuestionario() {
  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData();
      if (data.rol_id !== 3) {
        navigate("/");
      }
    };
    fetchDataAsync();
  }, []);
  const params = useParams();
  const currentId = params.id;
  const [cuestionario, setCuestionario] = useState(null);
  useEffect(() => {
    const setEvaluacion = async () => {
      const data = await getEvaluacion(params.id);
      console.log(data);
      setCuestionario(data);
    };
    setEvaluacion();
  }, []);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const handleChangeTitulo = (event) => {
    setTitulo(event.target.value);
  };
  const handleChangeDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const modificarEvaluacion = async () => {
    let paramTitulo;
    let paramDesc;
    if (titulo === "" && descripcion === "") {
      Swal.fire({
        text: "Debe actualizar al menos uno de los campos",
        icon: "warning",
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: "Ok",
      });
    } else {
      if (titulo !== "") {
        paramTitulo = titulo;
      } else {
        paramTitulo = cuestionario.titulo;
      }
      if (descripcion !== "") {
        paramDesc = descripcion;
      } else {
        paramDesc = cuestionario.descripcion;
      }
      const response = await putEvaluacion(currentId, paramTitulo, paramDesc);
      console.log(response);
      if (response === 200) {
        Swal.fire({
          text: "Actualizado con exito, los cambios se verán reflejados al recargar la página",
          icon: "success",
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: "Ok",
        }).then(()=>{window.location.reload()})
      }
    }
  };
  const crearPregunta = async () => {
    Swal.fire({
      title: "¿Cuál será la pregunta?",
      icon: "question",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: async (pregunta) => {
        const response = await postPregunta(params.id, pregunta);
        if (response === 201) {
          Swal.fire({
            text: "Se ha creado correctamente",
            icon: "success",
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: "Ok",
          }).then((continuar) => {
            if (continuar.value) {
              window.location.reload();
            }
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  const eliminarPregunta = async (idPreg) => {
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
        const response = await deletePregunta(idPreg);
        console.log(response);
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
  return (
    <>
      <Titulo titulo="Modificar cuestionario" />
      <div className="modiCuest">
        <div className="row">
          <MenuAdmin />
          <div className="col modiCuestContainer">
            <div className="container">
              {/* Input para el titulo y la descripcion */}
              {!cuestionario ? (
               <Cargando/> 
              ) : (
                <>
                  <li className="lista">
                    <div className="row">
                      <div className="col-10">
                        <h4>
                          <b>Titulo:</b>
                        </h4>
                      </div>
                      <div className="col-10">
                        <h6>{cuestionario.titulo}</h6>
                      </div>
                      <div className="col-10">
                        <input
                          type="text"
                          onChange={handleChangeTitulo}
                          placeholder="Ingrese el titulo actualizado"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-10">
                        <h4>
                          <b>Descripcion:</b>
                        </h4>
                      </div>
                      <div className="col-10">
                        <h6>{cuestionario.descripcion}</h6>
                      </div>
                      <div className="col-10">
                        <input
                          type="text"
                          onChange={handleChangeDescripcion}
                          placeholder={cuestionario.descripcion}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="row successContainer">
                      <div className="col-10">
                        <button
                          id="success"
                          onClick={() => {
                            modificarEvaluacion();
                          }}
                        >
                          Guardar cambios &nbsp;
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                      </div>
                    </div>
                  </li>
                  <div className="row">
                    <div className="col-sm-6 col-md-2">
                      <h4>Preguntas</h4>
                    </div>
                    <div className="col">
                      <button
                        onClick={() => {
                          crearPregunta();
                        }}
                        id="smallSuccess"
                      >
                        <FontAwesomeIcon icon={faPlusCircle} />
                      </button>
                    </div>
                  </div>
                  <br />
                  {/* Empieza el mapeo de las preguntas */}
                  {!cuestionario
                    ? ""
                    : cuestionario.preguntas.map((ans, idx) => {
                        return (
                          <>
                            <li className="lista">
                              <div className="row">
                                <div className="col-10">
                                  <h5>{ans.pregunta}</h5>
                                </div>
                                <div className="col">
                                  <Link
                                    to={
                                      "/Administrar-cuestionarios/Modificar-cuestionario/" +
                                      params.id +
                                      "/" +
                                      ans.id
                                    }
                                  >
                                    <button id="edit">
                                      <FontAwesomeIcon icon={faPencil} />
                                    </button>
                                  </Link>{" "}
                                  &nbsp;
                                  <button
                                    id="delete"
                                    onClick={() => {
                                      eliminarPregunta(ans.id);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faClose} />
                                  </button>
                                </div>
                              </div>
                            </li>
                          </>
                        );
                      })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ModificarCuestionario;
