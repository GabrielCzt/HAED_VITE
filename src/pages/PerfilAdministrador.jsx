import React, { useContext, useEffect } from "react";
import "../estilos/Pages.css"
import { useNavigate } from "react-router-dom";
import SessionContext from "../Context/SessionContext";


function PerfilAdministrador(){
    const navigate = new useNavigate();
    const {administrador} = useContext(SessionContext)
    useEffect(()=>{
        if(administrador!==3){
            navigate("/Perfil")
        }
        
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