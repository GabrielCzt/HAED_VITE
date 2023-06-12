import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import "../estilos/Pages.css"
import "../estilos/Retroalimentacion.css"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate} from "react-router-dom";

const cookie = new Cookies();

function Retroalimentacion(){

    const navigate = new useNavigate();

    useEffect(()=>{
        if(!cookie.get('nombres') ){
            navigate('/Iniciar-sesion')
        }
        if(!cookie.get('retroalimentacion')){
            navigate('/Seleccionar-cuestionario')
        }
    },[])

    const retro = cookie.get('retroalimentacion')
    const [toPrintR, setToPrintR] = useState([]);

    const handle = (event) =>{        
        //Variables de ingreso en un solo objeto
        try{
            const params = {
                opciones: retro.map((num) => {
                  return num;
                }),
            };        
        
        console.log(params)
        //Usamos axios y pasamos el link y los parametros
        axios.post('http://api-haed.danielreyesepitacio.cloud/api/feedbacks/opcion/all', params)
            .then(response =>{   
                console.log(response.data)
                setToPrintR(response.data)
               //return response.data;                 
            })
            .catch(error => {
               if(error.response && error.response.status === 404){
                    console.log(error);
                }
                else{
                    console.log(error)
                }                
            })
        }
        catch{
            console.log("Error, sin retroalimentacion")
        }            
    }       
    useEffect(()=>{
        handle();
        
    },[])

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
                {!toPrintR.map ? "" : toPrintR.map((num, index) => {
                return (<>
                <div className="row">
                    <div className="col-1 hand">
                            <FontAwesomeIcon icon={faHandPointRight}/>
                    </div>
                    <div className="col">
                    <li key={index}>{num.feedback}</li>
                    </div>
                </div>
                
                </>)
                })} 
                <Link to="/Seleccionar-cuestionario"><button id="end">Volver al menú de selección</button></Link>
                <Link to="/"><button id="end">Ir al Inicio</button></Link>
            </div>
            
        </div>
         
        </>
        
    )
}

export default Retroalimentacion