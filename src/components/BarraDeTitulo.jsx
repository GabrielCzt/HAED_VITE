import React from "react";
import "../estilos/Pages.css";
function Titulo(props) {
  const parametro = props.titulo;
  return (
    <>
      {/**Barra de titulo */}
      <div className="barContains">
        <div className="row">         
            <h2>{parametro}</h2>  
        </div>
      </div>
    </>
  );
}
export default Titulo;
