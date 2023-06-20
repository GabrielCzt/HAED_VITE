import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/Perfil.css";
import "../estilos/Pages.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SessionContext from "../Context/SessionContext";

const cookie = new Cookies();


function Perfil() {
  
  const navigate = new useNavigate();
  useEffect(() => {
    if(!cookie.get('nombres')){
      navigate('/Iniciar-sesion')
    }
    
  }, []);
    


  let nombres = cookie.get('nombres');
  return (
    <>
    
      {/**Barra de titulo */}
      <div className="barContains">
            <div className="bar">               
                <span className="display-3"><b>Perfil de Usuario</b></span>                
            </div>
        </div>
        <div className="profile">
          <div className="container">
              <div className="row">
              <h4 className="display-6">Bienvenido {nombres}</h4>    <hr/>    
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-6 btnContainer">
                <Link  to="/Seleccionar-cuestionario"><button id="opcion">Contestar Autoevaluación</button></Link>
              </div>
              <div className="col-sm-12 col-md-6 btnContainer">
                <Link   to="/Informacion-perfil"><button id="opcion">Ver información del perfil</button></Link>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-6 btnContainer">
                <Link  to="/Comparativa-de-retroalimentaciones"><button id="opcion">Comparar retroalimentaciones</button></Link>
              </div>
              <div className="col-sm-12 col-md-6 btnContainer">
                <Link to="/Seleccionar-cuestionario"><button id="opcion">Editar Información</button></Link>
              </div>
            </div>
          </div>       
        </div>
    </>
  );
}

export default Perfil;
