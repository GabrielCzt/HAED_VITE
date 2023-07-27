import React from "react";
import "../estilos/Constantes.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUsers, faFileInvoice, faChartColumn } from "@fortawesome/free-solid-svg-icons";
function MenuAdmin() {
  return (
    <>
      <div className="col-sm-12 col-md-1 menu">
        <div className="contenedorOpcionesMenu">
          <div className="row">
            <Link
              title="Perfil"
              to="../Opciones-administrador"
              className="opcionMenu"
            >
              <FontAwesomeIcon icon={faCircleUser} />
            </Link>
            <Link
              to="/Informacion-de-usuarios"
              title="Usuarios"
              className="opcionMenu"
            >
              <FontAwesomeIcon icon={faUsers} />
            </Link>
            <Link
              to="../Administrar-cuestionarios"
              title="Evaluaciones"
              className="opcionMenu"
            >
              <FontAwesomeIcon icon={faFileInvoice} />
            </Link>
            <Link to="../Graficas" title="Gráficas" className="opcionMenu">
              <FontAwesomeIcon icon={faChartColumn} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default MenuAdmin;
