import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom";
import "../estilos/Menu.css";
import "../estilos/Pages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function Menu(){
    return(
    <>
    {/**Barra de titulo */}
        <div className="barContains">
            <div className="bar">               
                <span className="display-3"><b>Autoevaluación</b></span>                
            </div>
        </div>
        {/**Etiqueta separadora de estilos */}
        <div className="menu">
            <div className="container">
                <h5 className="display-5">Seleccione un cuestionario para continuar</h5><hr/>
                <Link className="_button" to="/Autoevaluacion" >Cuestionario de <FontAwesomeIcon id="pen" icon={faPenToSquare}/></Link>
                <Link className="_button" to="/Autoevaluacion" >Cuestionario de <FontAwesomeIcon id="pen" icon={faPenToSquare}/> </Link>
                <Link className="_button" to="/Autoevaluacion" >Cuestionario de <FontAwesomeIcon id="pen" icon={faPenToSquare}/> </Link>
                <Link className="_button" to="/Autoevaluacion" >Cuestionario de <FontAwesomeIcon id="pen" icon={faPenToSquare}/> </Link>
                <Link className="_button" to="/Autoevaluacion" >Cuestionario de <FontAwesomeIcon id="pen" icon={faPenToSquare}/> </Link>
                <br/><br/>
            </div>
        </div>
    </>
    );
}

export default Menu