import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/Perfil.css";
import "../estilos/Pages.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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
        <div className="container">
            <div className="row">
            <h4 className="display-6">Bienvenido {nombres}</h4>        
          </div>
          <div className="row">
            <div className="col">
              <Link to="/Seleccionar-cuestionario">Contestar Autoevaluacion</Link>
            </div>
          </div>
        </div>
       
       

    </>
  );
}

export default Perfil;
