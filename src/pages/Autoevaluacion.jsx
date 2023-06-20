import React, {useContext, useEffect, useState} from "react";
import "../estilos/Autoevaluacion.css";
import "../estilos/Pages.css";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { faArrowRight, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SessionContext from "../Context/SessionContext";



const cookie = new Cookies();


function Cuestionario(){
    const [espera,setEspera] = useState("Registrar respuestas")
    const [icon, setIcon] = useState(faArrowRight)
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
        if(!cookie.get('nombres')){
            navigate('/Seleccionar-cuestionario')
          }
        fetchApi();
    },[])
   
    const [retro, setRetro] = useState([]);
    


    const Add = () =>{
        setEspera("Espere, enviando ")
        setIcon(faArrowsRotate);
        const seleccion = document.querySelectorAll('input[type="radio"]:checked');
        const retroalimentacion = Array.from(seleccion).map((elemento)=> {return {pregunta_id: elemento.name, respuesta: elemento.value}});
        try{
            const params = {
                evaluacion_id: cookie.get('cuest'),
                respuestas: retroalimentacion.map((num) => {
                  return num;
                }),
            };                
            console.log(params)
            const {token} = useContext(SessionContext)
            const headers = {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          };
            //Usamos axios y pasamos el link y los parametros
            axios.post('http://api-haed.danielreyesepitacio.cloud/api/respuestas/all', params, headers)
            .then(response =>{  
               console.log(response.data) 
               cookie.set('intento', response.data[0].intento_id,{path:"/"})
    
            })
            .catch(error => {
               console.log(error)               
            })
        }
        catch{
            console.log("Error, sin retroalimentacion")
        }   
        setTimeout(() => {
            navigate("/Retroalimentacion")
        }, 4000);
       
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
                        <h1>Está contestando {cuest.titulo}</h1>
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
                                            <h5>{index+1}</h5>
                                        </div>
                                        <div className="col">
                                            <div className="question">                                    
                                                <p id="pregunta">{num.pregunta}</p>
                                                {/**Mapeamos las opciones de cada pregunta */}
                                                {num.opciones.map((opt,index)=>{
                                                    let valor;                                                                                                
                                                    try{
                                                        valor = opt.opcion;
                                                    }
                                                    catch{
                                                        valor="Sin retroalimentacion"
                                                    }
                                                    return(
                                                        <>
                                                            <input  type="radio" name={opt.pregunta_id} value={valor} id="hola"/>&nbsp;<label   for="hola">{opt.opcion}</label><br/>                                                
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
                        <button id="contestar" onClick={(event) => {
                            event.stopPropagation();
                            Add();
                          }}>{espera}&nbsp;&nbsp;<FontAwesomeIcon icon={icon}/></button>
                    }
                    
                </div>            
            </div>
            
            <br/><br/>
            </div>
        

        
        
        </>
    );

}

export default Cuestionario;