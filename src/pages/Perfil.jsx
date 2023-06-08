import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/Perfil.css";
import "../estilos/Pages.css";
import PerfilSideBar from "./PerfilSideBar";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const cookie = new Cookies();


function Perfil() {
  const navigate = new useNavigate();
  useEffect(() => {
    if(!cookie.get('nombres')){
      navigate('/Iniciar-sesion')
    }
  }, []);
    
  
  let matricula = cookie.get('nombres');
  return (
    <>
    
      {/**Barra de titulo */}
      <div className="barContains">
            <div className="bar">               
                <span className="display-3"><b>Perfil de Usuario</b></span>                
            </div>
        </div>
       
        <div className="row">
          <div className="col-1">
            <PerfilSideBar/>
          </div>
          <div className="col">
            <p className="display-6">Bienvenido {matricula}</p>
          </div>
        
        
        </div>
        
          

    </>
  );
}

export default Perfil;
