import React, { useState } from "react";
import "../estilos/Login.css";
import "../estilos/Pages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom";
import axios from "axios";

function Login(){
    const [_nombre, setNombre] = useState('');
    const [_password, setPassword]=useState('');  
    const handleChangeName = (event) =>{
        setNombre(event.target.value)
    }
    const handleChangePassword = (event) =>{
        setPassword(event.target.value)
    }
    const [_error, setError] = useState("");
    const imprimir = ()=>{console.log(_nombre); console.log(_password)};
    const handleSubmit = (event) =>{
        event.preventDefault();
        const params ={
            email: _nombre,
            password: _password
        }

        axios.post('http://api-haed.danielreyesepitacio.cloud/api/auth/login', params)
            .then(response =>{
                if(response.params == "" || response.params == null){
                    console.log("Sin coincidencias");
                }
                else{
                    console.log(response.params);
                }                
            })
            .catch(error => {

               if(error.response && error.response.status === 404){
                    console.log("Algo salió mal");
                    setError("Nombre o usuario incorrectos 😢");
                }
                else{
                    console.log("Algo salió muy mal")
                    setError("Algo salió mal");
                }
                
            })
    }

    return(        
        
        <>
        {/**Barra de titulo */}
        <div className="barContains">
            <div className="bar">               
                <span className="display-3"><b>Inicio de Sesión</b></span>                
            </div>
            </div> 
        {/**Etiqueta separadora de estilos */}
        <div className="log">
        <div className="container" id="log_sign">
            <div className="row">
                {/**Cuadro izquierdo de registro */}
                <div className="col-sm-12 col-md-6 sign">
                    <h2>¿No tienes una cuenta?</h2>
                    <p>Para poder contestar la Autoevaluación es necesario tener una cuenta de usuario, si aún no la tiene, de clic en el botón de Crear cuenta.</p><br/>
                  <Link to="/Registrarse" id="button">REGISTRARSE</Link>
                </div>
                {/**Formulario de inicio de sesión */}
                <div className="col-sm-12 col-md-6 login">

                    <h2>Bienvenido</h2>
                    <h3>Inicie sesión ahora</h3>
                    <p id="error">{_error}</p>
                    <form onSubmit={handleSubmit}>
                        <input required value={_nombre} onChange={handleChangeName} name="nombre" type={"email"} required placeholder="Ingrese su Correo Electrónico"></input><br/>
                        <input required value={_password} onChange={handleChangePassword} name="password" type={"password"} required placeholder="Ingrese su contraseña"></input>                                          
                        <button type="submit" id="ingresar">INGRESAR</button>
                    </form>    
                   
                </div>
            </div>
        </div>
        </div>
        </>
    )
}
export default Login