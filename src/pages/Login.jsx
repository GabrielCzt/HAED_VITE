import React, { useState } from "react";
import "../estilos/Login.css";
import "../estilos/Pages.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect } from "react";


const cookie = new Cookies();

function Login(){
    const navigate = useNavigate();

    useEffect(() => {
        if(cookie.get('nombres')){
          navigate('/Perfil')
        }
    }, []);
    
    {/**Almacenaremos los datos del formulario con estados */}
    const [_email, setEmail] = useState('');
    const [_password, setPassword]=useState('');  

    /**Las siguientes funciones se encargan de 
    guardar todas las claves conforme las escribe el usuario */
    const handleChangeEmail = (event) =>{
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) =>{
        setPassword(event.target.value)
    }
    /**Para almacenar errores de inicio */
    const [_error, setError] = useState("");
    //const imprimir = ()=>{console.log(_nombre); console.log(_password)};

    //Consultamos los datos en la api
    const handleSubmit = (event) =>{
        
        event.preventDefault();

        //Variables de ingreso en un solo objeto
        const params ={
            email: _email,
            password: _password
        }
        //Usamos axios y pasamos el link y los parametros
        axios.post('http://api-haed.danielreyesepitacio.cloud/api/auth/login', params)
            .then(response =>{   
                //console.log(response.data)
               return response.data;                 
            })
           .then(response =>{
                if(response){
                    let respuesta = response.data;
                    cookie.set('administrador', respuesta.administrador, {path:"/"})
                    cookie.set('apellidos', respuesta.apellidos, {path:"/"})
                    cookie.set('centro_trabajo', respuesta.centro_trabajo, {path:"/"})
                    cookie.set('id', respuesta.id, {path:"/"})
                    cookie.set('email', respuesta.email, {path:"/"})                    
                    cookie.set('matricula', respuesta.matricula, {path:"/"})
                    cookie.set('nombres', respuesta.nombres, {path:"/"})
                    navigate("/Perfil");
                }
                else{
                    console.log("Contraseña incorrecta")
                }
            })

            .catch(error => {

               if(error.response && error.response.status === 404){
                    console.log(error);
                    setError("Nombre o usuario incorrectos 😢");
                }
                else{
                    console.log(error)
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
                        <input required value={_email} onChange={handleChangeEmail} name="nombre" type={"email"} placeholder="Ingrese su Correo Electrónico"></input><br/>
                        <input required value={_password} onChange={handleChangePassword} name="password" type={"password"}placeholder="Ingrese su contraseña"></input>                                          
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