import React from "react";
import "../estilos/Pages.css"
function Titulo(props){
    const parametro = props.titulo
return(<>
{/**Barra de titulo */}
<div className="barContains">
        <div className="bar">
          <span className="display-3">
            <b>{parametro}</b>
          </span>
        </div>
      </div>
</>)
}
export default Titulo