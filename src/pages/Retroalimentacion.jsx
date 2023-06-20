import React, { useContext, useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import "../estilos/Pages.css"
import "../estilos/Retroalimentacion.css"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate} from "react-router-dom";
import SessionContext from "../Context/SessionContext";

const cookie = new Cookies();

function Retroalimentacion(){

    const navigate = new useNavigate();
   
    const [toPrintR, setToPrintR] = useState(null);
   

    useEffect(() => {
        if(!cookie.get('nombres')){
            navigate('/Iniciar-sesion')
        }
        const fetchData = async () => {
          try {
            const token = useContext(SessionContext);
            console.log(cookie.get('intento'))
            let intento = parseInt(cookie.get('intento'))
            const url = 'http://api-haed.danielreyesepitacio.cloud/api/users/evaluaciones/respuestas/' + intento
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
    
            if (response.ok) {
              const jsonData = await response.json();
              if(!toPrintR){
                setToPrintR(jsonData);
              }


            } else {
              console.error('Error en la solicitud:', response.status);
            }
          } catch (error) {
            console.error('Error en la solicitud:', error);
          }
        };
    
        fetchData();
        console.log(toPrintR)
      }, []);
      useEffect(()=>{
        if(toPrintR){
            console.log(toPrintR)
        }
      })

 

    return(        
        <>

     <div className="barContains">
            <div className="bar">               
                <span className="display-3"><b>Retroalimentación</b></span>                
            </div>
        </div> 
        {/* Etiqueta separadora de estilos */}
        <div className="retrA">
            <div className="container">                
                <h5>Estas son algunas recomendaciones a tomar en cuenta</h5>
                {!toPrintR ? <><p>Espere</p><br/></> : toPrintR.preguntas.map((num, index) => {                                                                     
                        return (
                            <>
                            <div className="row">
                                <div className="col-1 hand">
                                    <FontAwesomeIcon icon={faHandPointRight} />
                                </div>
                                <div className="col">
                                    <li>{num.respuestas[0].feedback}</li>
                                </div>
                            </div>                            
                            </>
                        );
                })}
                <Link to="/Seleccionar-cuestionario"><button id="end">Volver al menú de selección</button></Link>
                <Link to="/"><button id="end">Ir al Inicio</button></Link>
            </div>
            
        </div>
         
        </>
        
    )
}

export default Retroalimentacion