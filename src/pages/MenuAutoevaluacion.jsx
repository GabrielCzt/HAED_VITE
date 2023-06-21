import {React, useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, useNavigate } from "react-router-dom";
import "../estilos/Menu.css";
import "../estilos/Pages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";


const cookie = new Cookies();




function Menu(){

    const url = "http://api-haed.danielreyesepitacio.cloud/api/evaluaciones";

    const [name, setName] = useState();
    const fetchApi = async ()=>{
        const response = await fetch(url);
        const apiResponse = await response.json();
        setName(apiResponse);
    }
    useEffect(()=>{
        fetchApi();
    },[])
    
    useEffect(()=>{
        document.getElementById('visible').style.visibility="visible";
        document.getElementById('visible').style.display="unset";
        document.getElementById('redirect').style.visibility="hidden";
        document.getElementById('redirect').style.display="none";
        if(!cookie.get('token')){
            document.getElementById('visible').style.visibility="hidden";
            document.getElementById('visible').style.display="none";
            document.getElementById('redirect').style.visibility="visible";
            document.getElementById('redirect').style.display="unset";
        }
    },[]);
    const navigate = new useNavigate();
    

    const reload =()=>{
        window.location.reload();
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
        <div id="visible">
            <div className="menu">
                <div className="container">
                    <h5 className="display-5">Seleccione un cuestionario para continuar</h5><hr/>
                    {/* Se mapea la cantidad de cuestionarios para generar tantos botones como sea neceario */}
                    {!name? <><p>Algo salió mal</p>
                    <button id="toLogIn"onClick={reload}>Clic aquí para reintentar</button>
                    </>
                    : name.map((num, index) => {    
                                                                 
                        return (
                            // No se usa la etiqueta Link para evitar conflictos al usar onCLick, en cambio
                            // se agrega una etiqueta p con funcionalidad onClick y useNavigate
                            <p className="_button" onClick={()=>{
                                cookie.set('cuest', num.id, {path:"/"});
                                navigate("/Autoevaluacion");
                            }}>Contestar {num.titulo} <FontAwesomeIcon id="pen" icon={faPenToSquare}/> </p>
                        );
                    })}
                    <br/><br/>
                </div>
            </div>            
        </div>
        <div id="redirect">
                <div className="container">
                    <p className="display-6">Debe iniciar sesión para contestar la autoevaluación</p>
                    <Link to="/Iniciar-sesion"><button id="toLogIn">Haga click aquí para iniciar sesión</button></Link>
                </div>
        </div>
        
    </>
    );
}

export default Menu