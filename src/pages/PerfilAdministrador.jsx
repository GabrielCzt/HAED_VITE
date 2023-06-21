import React, { useContext, useEffect } from "react";
import "../estilos/Pages.css"
import { useNavigate } from "react-router-dom";
import SessionContext from "../Context/SessionContext";
import Cookies from "universal-cookie";

const cookie = new Cookies();

function PerfilAdministrador(){
    const navigate = new useNavigate();
  const fetchData = async () => {
    try {
      const token = cookie.get('token')
      const url = 'http://api-haed.danielreyesepitacio.cloud/api/users/info'
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData)
        if(jsonData.rol_id!==3)navigate("../Perfil")


      } else {
        console.error('Error en la solicitud:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
    useEffect(()=>{
        fetchData();
        
    },[])
    return(<>
     {/**Barra de titulo */}
     <div className="barContains">
            <div className="bar">               
                <span className="display-3"><b>Opciones de Administrador</b></span>                
            </div>
        </div>

        {/* Etiqueta separadora de estilo s*/}
        <div className="adminProfile">

        </div>
    
    </>);
}

export default PerfilAdministrador