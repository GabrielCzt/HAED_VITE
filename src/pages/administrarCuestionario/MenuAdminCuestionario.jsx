import React from "react";
import Titulo from "../../components/BarraDeTitulo";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "../../estilos/AdministrarCuestionarios.css";
import MenuAdmin from "../../components/MenuAdmin";
import { useEffect } from "react";
import fetchData from "../../funciones/ObtenerInformación";

function MenuAdminCuest() {
  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData();
      if (data.rol_id !== 3) {
        navigate("/");
      }
    };
    fetchDataAsync();
  }, []);
  return (
    <>
      <Titulo titulo="Administrar cuestionarios" />
      <div className="MenuACuest">
        <div className="row">
          <MenuAdmin/>
          <div className="col">
            <div className="container">
              <div className="row optContainer">
                <div className="col-sm-12 col-md-6">
                  <div className="row">
                    <Link to="/Administrar-cuestionarios/Modificar-cuestionario">
                      <button id="opcion">
                        Actualizar cuestionario &nbsp;
                        <FontAwesomeIcon icon={faPencil} />
                      </button>
                    </Link>
                  </div>
                  <br />
                  <div className="row">
                    <li>
                      Selecciona un cuestionario existente y modifica sus
                      opciones
                    </li>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="row">
                    <Link to="/Crear-cuestionario">
                      <button id="opcion">
                        Crear cuestionario &nbsp;{" "}
                        <FontAwesomeIcon icon={faPlusCircle} />
                      </button>
                    </Link>
                  </div>
                  <br />
                  <div className="row">
                    <li>Crea un cuestionario desde cero</li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MenuAdminCuest;
