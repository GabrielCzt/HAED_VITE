import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import "../estilos/Header.css"
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";





function Header() {
  //Para obtener los elementos de la fecha
  const year = new Date().getFullYear();
  const month = new Date().getMonth()+1;
  const day = new Date().getDate();
        
  return (         
  <>
  {/**Etiqueta separadora de estilos, para evitar problemas al compilar y ejecutar */}
  <div className="cab">
    <header>
      <div className="container">
        <div className="row">
          {/**Primera columna, contiene el icono de reloj y la fecha completa */}
          <div className="col-sm-3 col-md-2" id="date">         
            <FontAwesomeIcon icon={faClock} id="reloj"/>{day}/{month}/{year}
          </div>
          {/**Segunda columna, se reserva para el titulo y ayuda a posicionar el siguiente elemento, además de permitir un mejor control
           * de responsividad
           */}
          <div className="col-sm-7 col-md-9" id="Title">
            <p>Herramienta de Autoevaluacion HAED</p>
          </div>
          {/**Tercera columna, contiene el botón de menú, es necesario usar etiquetas de React-Bootstrap para evitar problemas de compatibilidad */}
          <div className="col-sm-2 col-md-1">
            <Dropdown >
              <Dropdown.Toggle id="dropdown-basic" >
                <FontAwesomeIcon icon={faCircleUser}/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {/**Usar ItemText en lugar de Item sirve para colocar la funcionalidad de Link */}
              <Dropdown.ItemText><Link id="links-header" to="/Iniciar-sesion">Iniciar Sesión</Link></Dropdown.ItemText>
                <Dropdown.ItemText><Link id="links-header" to="/Registrarse">Registrarse</Link></Dropdown.ItemText>                                                                                                        
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      
      </div>
    </header>
    </div>
  </>                               
  )
}
export default Header  