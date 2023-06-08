import React, {useEffect, useState} from "react";
import "../estilos/Autoevaluacion.css";
import "../estilos/Pages.css";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";


const cookie = new Cookies();


function Cuestionario(){

    const navigate = new useNavigate();
    {/**Obteniendo el formulario de la API */}
    const url = "http://api-haed.danielreyesepitacio.cloud/api/evaluaciones/"+cookie.get('cuest')+"/all";
    const [cuest, setCuest] = useState();

    const fetchApi = async ()=>{
        const response = await fetch(url);
        const apiResponse = await response.json();
        setCuest(apiResponse);
    }
    useEffect(()=>{
        fetchApi();
    },[])
   
    const [retro, setRetro] = useState([]);


    const Add = () =>{
        const seleccion = document.querySelectorAll('input[type="radio"]:checked');
        const retroalimentacion = Array.from(seleccion).map((elemento)=>elemento.value);
        //setRetro(retroalimentacion )
        cookie.set('retroalimentacion', retroalimentacion , {path:"/"})
        //console.log(retroalimentacion);
        navigate("/Retroalimentacion");

    }
    return(
        <>
        {/**Barra de titulo */}
        <div className="barContains">
            <div className="bar">               
                <span className="display-3"><b>Autoevaluación</b></span>                
            </div>
        </div>
        
        {/**Etiqueta separadora de estilos */}
        <div className="questions">
            <div className="container">
                <div className="row">
                {!cuest ? "" :
                        <><h1>Está contestando {cuest.titulo}</h1></>
                    }
                    {/**Separando cada pregunta como un elemento de lista */}
                    <ul>
                        {/**Se deben mapear las preguntas */}
                        {!cuest ? 'Algo salió mal, asegurese de tener conexión a internet o intente más tarde': cuest.preguntas.map((num, index)=>{
                            const _id = num.id;
                                               
                            return( 
                            <>
                                <li>
                                    <div className="row">
                                        <div className="col-1 numero">
                                            <h5>{num.id}</h5>
                                        </div>
                                        <div className="col">
                                            <div className="question">                                    
                                                <p id="pregunta">{num.pregunta}</p>
                                                {/**Mapeamos las opciones de cada pregunta */}
                                                {num.opciones.map((opt,index)=>{
                                                    let valor;                                                
                                                    try{
                                                        valor = opt.id;
                                                    }
                                                    catch{
                                                        valor="Sin retroalimentacion"
                                                    }
                                                    return(
                                                        <>
                                                            <input  type="radio" name={_id} value={valor} id="hola"/>&nbsp;<label className={num.node_id} id={num.node_id} for="hola">{opt.descripcion}</label><br/>                                                
                                                        </>
                                                    );
                                                })}                                        
                                            </div>    
                                        </div>
                                    </div>                                                            
                                </li>   
                                                      
                            </>
                            
                            );
                        })}
                    </ul>
                    {!cuest ? "" :
                        <button id="contestar" onClick={Add}>Registrar</button>   
                    }
                    
                </div>            
            </div>
            
            <br/><br/>
            </div>
        

        
        
        </>
    );

}

export default Cuestionario;