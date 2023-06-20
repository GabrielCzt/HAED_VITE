import React, { useEffect } from "react";
import "../estilos/Login.css"; //Se reciclaron los estilos de la página Login, pues son exactamente los mismos
import "../estilos/Pages.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { Spinner } from 'react-bootstrap';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'
import { useState } from "react";
import axios from "axios";

const cookie = new Cookies();



function Sign() {
    //Código para la redirección validada por sesión
    const navigate = new useNavigate();

    {/*Estado indicador en la carga correcta de credenciales*/ }
    const [loading, setLoading] = useState('')

    {/*Estado indicador de error en la carga de credenciales*/ }
    const [_error, set_Error] = useState("");


    {/*//Estado para mostrar contraseña*/ }
    const [ojos, setOjos] = useState(faEye)

    {/*Muestra y oculta contraseña del input 'password' */ }
    const SeePassword = () => {
        let pass = document.getElementById("password");
        let pass2 = document.getElementById("confirmation");
        if (pass.type === "password" || pass2.type === "password") {
            pass.type = "text";
            pass2.type = "text"
            setOjos(faEyeSlash);
        }
        else if (pass.type === "text" || pass2.type === "text") {
            pass.type = "password";
            pass2.type = "password"
            setOjos(faEye);
        }
    }

    useEffect(() => {
        if (cookie.get('nombres')) {
            navigate('/Perfil')
        }
    }, []);

    //Código para el registro
    const [_nombres, set_Nombres] = useState("");
    const [_apellidos, set_Apellidos] = useState("");
    const [_matricula, set_Matricula] = useState("");
    const [_email, set_Email] = useState("");
    const [_password, set_Password] = useState("");
    const [_confirmation, set_Confirmation] = useState("");

    const changeNombres = (event) => {
        set_Nombres(event.target.value)
    }
    const changeApellidos = (event) => {
        set_Apellidos(event.target.value)
    }
    const changeMatricula = (event) => {
        set_Matricula(event.target.value)
    }
    const changeEmail = (event) => {
        set_Email(event.target.value)
    }
    const changePassword = (event) => {
        set_Password(event.target.value)
    }

    const changeConfirmation = (event) => {
        set_Confirmation(event.target.value)
    }

    const validarCadenas = (cadena) => {
        const regex = /^[a-zA-Z\sáéíóúñÁÉÍÓÚ]+$/;
        return regex.test(cadena);
    }

    const validarMatricula = (cadena) => {
        const regex = /^utp/i;
        return regex.test(cadena)
    }
    const handleSign = (event) => {
        event.preventDefault();
        if (validarCadenas(_nombres)) {
            if (validarCadenas(_apellidos)) {
                if (validarMatricula(_matricula)) {
                    if (_password === _confirmation) {                    
                        const params = {
                            "nombres": _nombres,
                            "apellidos": _apellidos,
                            "matricula": _matricula.toUpperCase(),
                            "email": _email,
                            "password": _password,
                            "password_confirmation": _confirmation
                        }

                        axios.post("http://api-haed.danielreyesepitacio.cloud/api/auth/register", params)
                            .then(response => {
                                setLoading(true)
                                console.log(response.data)
                                const logParams = {
                                    email: _email,
                                    password: _password
                                }
                                axios.post('http://api-haed.danielreyesepitacio.cloud/api/auth/login', logParams)
                                    .then(response => {
                                        //console.log(response.data)
                                        return response.data;
                                    })
                                    .then(response => {
                                        let respuesta = response.data;
                                        cookie.set('administrador', respuesta.administrador, { path: "/" })
                                        cookie.set('apellidos', respuesta.apellidos, { path: "/" })
                                        cookie.set('centro_trabajo', respuesta.centro_trabajo, { path: "/" })
                                        cookie.set('id', respuesta.id, { path: "/" })
                                        cookie.set('email', respuesta.email, { path: "/" })
                                        cookie.set('matricula', respuesta.matricula, { path: "/" })
                                        cookie.set('nombres', respuesta.nombres, { path: "/" })
                                        cookie.set('token', response.token, { path: "/" })
                                        cookie.set('Verified', ('verificado'), { path: "/" })
                                        setTimeout(() => navigate("/Perfil"), 1000)
                                    })

                            })
                            .catch(error => {
                                if (error.response && error.response.status === 422) {
                                    console.log(error);
                                    set_Error("Ese usuario ya fue registrado");
                                }
                                else {
                                    console.log(error)
                                    set_Error("Algo salió mal, vuelva a intentarlo");
                                }
                            })
                    }
                    else {
                        set_Error("Las contraseñas no coinciden")
                        document.getElementById("confirmation").focus()
                    }
                }
                else {
                    set_Error("Ingrese una matricula valida")
                    document.getElementById("matricula").focus()
                }
            }
            else {
                set_Error("Los apellidos no pueden tener números ni caracteres especiales")
                document.getElementById('apellidos').focus()
            }
        }
        else {

            set_Error("EL nombre no puede tener números ni caracteres especiales")
            document.getElementById('nombres').focus()
        }
    }
    return (
        <>
            {/**Barra de titulo */}
            <div className="barContains">
                <div className="bar">
                    <span className="display-3"><b>Registrarse</b></span>
                </div>
            </div>
            {/**Etiqueta separadora de estilos */}
            <div className="log">
                <div className="container" id="log_sign">
                    <div className="row">
                        {/**Cuadro de la izquierda para iniciar sesión */}
                        <div className="col-sm-12 col-md-6 sign">
                            <h2>¿Ya tienes una cuenta?</h2>
                            <p>Para contestar la autoevaluación debes iniciar sesión, si ya tienes una cuenta da click en el botón Iniciar Sesión</p><br />
                            <Link to="/Iniciar-sesion" id="button">INICIAR SESIÓN</Link>
                        </div>
                        {/**Formulario para registro */}
                        <div className="col-sm-12 col-md-6 login">
                            <h2>Bienvenido</h2>
                            <h3>Vamos a crear una nueva cuenta</h3>

                            {loading ?
                                (

                                    <div
                                        className="alert alert-success d-flex align-items-center"
                                        role="alert"
                                    >
                                        <div>
                                            <p className="text-credentials">Cargando credenciales</p>
                                        </div>
                                        <div className="Spin">
                                            <Spinner animation="border" variant="success" />
                                        </div>
                                    </div>
                                ) :
                                (

                                    <p id="error">{_error}</p>
                                )}

                            <form onSubmit={handleSign}>
                                <input id="nombres" required value={_nombres} onChange={changeNombres} type={"text"} placeholder="Ingrese sus Nombres" ></input>
                                <input id="apellidos" required value={_apellidos} type={"text"} onChange={changeApellidos} placeholder="Ingrese sus Apellidos"></input>
                                <input id="matricula" required value={_matricula} type={"text"} onChange={changeMatricula} placeholder="Coloque aquí su Matricula"></input>
                                <input id="email" required value={_email} type={"email"} onChange={changeEmail} placeholder="Ingrese su Correo Electrónico"></input>
                                <input id="password" required value={_password} type={"password"} onChange={changePassword} placeholder="Contraseña"></input>
                                <FontAwesomeIcon id="eye" onClick={SeePassword} icon={ojos} />
                                <input id="confirmation" required value={_confirmation} type={"password"} onChange={changeConfirmation} placeholder="Repita su contraseña"></input>
                                <button type="submit" id="ingresar">CLICK AQUÍ PARA CREAR SU CUENTA</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Sign