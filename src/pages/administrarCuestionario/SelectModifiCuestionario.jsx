import React, { useEffect, useState } from "react";
import Titulo from "../../components/BarraDeTitulo";
import { getEvaluaciones } from "../../funciones/AdministrarCuestionario";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartColumn,
  faCircleUser,
  faClose,
  faFileInvoice,
  faPencil,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { deleteEvaluacion } from "../../funciones/AdministrarCuestionario";
import Swal from "sweetalert2";
import MenuAdmin from "../../components/MenuAdmin";

import "../../estilos/Constantes.css"
import Cargando from "../../components/Cargando";

import fetchData from "../../funciones/ObtenerInformación";


function SelectModifiCuestionario() {
  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData();
      if (data.rol_id !== 3) {
        navigate("/");
      }
    };
    fetchDataAsync();
  }, []);
  const [menuEvaluaciones, setMenuEvaluaciones] = useState(null);
  useEffect(() => {
    const setEvaluaciones = async () => {
      const data = await getEvaluaciones();
      console.log(data);
      setMenuEvaluaciones(data);
    };
    setEvaluaciones();
  }, []);
  const eliminarEvaluacion = async (id) => {
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
        const response = await deleteEvaluacion(id);
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
      <Titulo titulo="Modificar cuestionarios" />
      <div className="selectModifiCuest">
        <div className="row">
          <MenuAdmin />
          <div className="col modificarContainer">
            <div className="container">
              {!menuEvaluaciones ? (
                <Cargando/>
              ) : (
                menuEvaluaciones.map((ev, idx) => {
                  return (
                    <>
                      <li>
                        <div className="row">
                          <div className="col-9">
                            <div className="row">
                              <h4>{ev.titulo}</h4>
                            </div>
                            <div className="row">
                              <h6>{ev.descripcion}</h6>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="row options">
                              <Link
                                id="link"
                                to={
                                  "/Administrar-cuestionarios/Modificar-cuestionario/" +
                                  ev.id
                                }
                              >
                                <button id="edit">
                                  <FontAwesomeIcon icon={faPencil} />
                                </button>
                              </Link>
                              <button
                                onClick={() => {
                                  eliminarEvaluacion(ev.id);
                                }}
                                id="delete"
                              >
                                <FontAwesomeIcon icon={faClose} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectModifiCuestionario;
