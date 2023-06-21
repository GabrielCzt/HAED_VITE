import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/Perfil.css";
import "../estilos/Pages.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SessionContext from "../Context/SessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileText, faUser, faTable, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const cookie = new Cookies();


function Perfil() {
  const [info, setInfo] = useState([])
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
        setInfo(jsonData)


      } else {
        console.error('Error en la solicitud:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };


  useEffect(()=>{
    fetchData()
  },[])




  const navigate = new useNavigate();
  useEffect(() => {
    if(!cookie.get('token')){
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
              <h4 className="display-6">Bienvenido {info.nombres}</h4>    <hr/>    
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-6 btnContainer">
                <Link  to="/Seleccionar-cuestionario"><button id="opcion">Contestar Autoevaluación &nbsp;<FontAwesomeIcon icon={faFileText}/></button></Link>
              </div>
              <div className="col-sm-12 col-md-6 btnContainer">
                <Link   to="/Informacion-perfil"><button id="opcion">Ver información del perfil  &nbsp; <FontAwesomeIcon icon={faUser}/> </button></Link>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-6 btnContainer">
                <Link  to="/Comparativa-de-retroalimentaciones"><button id="opcion">Comparar retroalimentaciones &nbsp; <FontAwesomeIcon icon={faTable}/> </button></Link>
              </div>
              <div className="col-sm-12 col-md-6 btnContainer">
                <Link to="/Seleccionar-cuestionario"><button id="opcion">Editar Información &nbsp; <FontAwesomeIcon icon={faPencil}/></button></Link>
              </div>
            </div>
          </div>       
        </div>
    </>
  );
}

export default Perfil;
