import React from "react";
import "../estilos/Constantes.css";
import { BallTriangle } from "react-loader-spinner";

function Cargando() {
  return (
    <>
      <div className="loaderContainer">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#01626b"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
        <h4>
          <b>Cargando...</b>
        </h4>{" "}
        <br />
        <p>Si demora más de lo normal, pruebe: </p>
        <small> - Comprobar la conexión a internet</small>
        <small> - Volver a cargar la página</small>
        <small> - Intente más tarde</small>
      </div>
    </>
  );
}
export default Cargando;
