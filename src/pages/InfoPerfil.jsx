import React, { useState, useEffect } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import '../estilos/InfoPerfil.css'

const cookie = new Cookies();

function InfoPerfil() {
    const navigate = useNavigate();

    {/*//Estado para mostrar contraseña*/ }
    const [ojos, setOjos] = useState(faEye)

    const data = {
        nombre: cookie.get('nombres'),
        apellido: cookie.get('apellidos'),
        correo: cookie.get('email'),
        mat: cookie.get('matricula')
    }

    const nombre = data.nombre.toUpperCase()
    const apellidos = data.apellido.toUpperCase()
    const matricula = data.mat
    const email = data.correo


    useEffect(() => {
        if (!nombre || !apellidos || !matricula || !email) {
            navigate('/Iniciar-sesion')

        }
    }, [])


    {/*Muestra y oculta contraseña del input 'password' */ }
    const SeePassword = () => {
        let pass = document.getElementById("myPassword");
        let pass2 = document.getElementById("myPassword2");
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

    return (
        <>
            {/**Barra de titulo */}
            <div className="barContains">
                <div className="bar">
                    <span className="display-3"><b>Perfil de Usuario</b></span>
                </div>
            </div>


            {/* Contenedor principal de contenido */}
            <div class="container">
                <div class="row" >

                    {/* Tarjeta de datos del usuario */}
                    <div class="col-lg-4">
                        <div class="profile-card-4 z-depth-3">
                            <div class="card">
                                {/* Imagen de tarjeta */}
                                <div class="card-body text-center bg-success rounded-top">
                                    <div class="user-box">
                                        <button class="btn " onClick={() => navigate("/")} > <img className="img" src="https://pbs.twimg.com/profile_images/1609948030865743872/FXN0HLMz_400x400.jpg" height="100" width="100" /></button>
                                    </div>
                                    <h5 class="mb-1 text-white">Universidad Tecnologica de Puebla</h5>

                                </div>
                                {/* Cuerpo de la tarjeta  */}
                                <div class="card-body">
                                    {/* Lista de elementos  */}
                                    <ul class="list-group shadow-none">
                                        {/* Elemento */}
                                        <li class="list-group-item">
                                            <div class="list-icon">
                                                <i class="fa fa-envelope"></i>
                                            </div>
                                            <div class="list-details">
                                                <span>{nombre} {apellidos} </span>
                                                <small>Nombre</small>
                                            </div>
                                        </li>
                                        {/* Elemento */}
                                        <li class="list-group-item">
                                            <div class="list-icon">
                                                <i class="fa fa-globe"></i>
                                            </div>
                                            <div class="list-details">
                                                <span>{matricula}</span>
                                                <small>Matricula</small>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta de edicion para datos del usuario */}
                    <div class="col-lg-8">
                        <div class="card z-depth-3">
                            {/* Contenido de la tarjeta */}
                            <div class="card-body">
                                {/* Indica el apartado de contenido  */}
                                <ul class="nav nav-pills nav-pills-success nav-justified">
                                    <li class="nav-item">
                                        <a data-target="#edit" data-toggle="pill" class="nav-link active show "><i class="icon-note"></i> <span class="hidden-xs">Editar Perfil</span></a>
                                    </li>
                                </ul>

                                {/* Cuerpo y Formulario de envio */}
                                <div class="tab-content p-3">
                                    {/* Panel de datos */}
                                    <div class="tab-pane active  show" id="edit">
                                        {/* Input y evento de formulario */ }
                                        <form onSubmit={" "}>
                                            {/* Separador de input  */ }
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label form-control-label">Nombre(s)</label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="text" onChange={''} defaultValue={data.nombre} />
                                                </div>
                                            </div>
                                             {/* Separador de input  */ }
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label form-control-label">Apellido(s)</label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="text" onChange={''} defaultValue={data.apellido} />
                                                </div>
                                            </div>
                                             {/* Separador de input  */ }
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label form-control-label">Correo Electronico</label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="email" onChange={''} defaultValue={data.correo} />
                                                </div>
                                            </div>
                                             {/* Separador de input  */ }
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label form-control-label">Contraseña nueva</label>
                                                <div class="col-lg-9">
                                                    <input id="myPassword" class="form-control" type="password" onChange={''} />

                                                </div>
                                            </div>
                                             {/* Separador de input  */ }
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label form-control-label">Confirmar contraseña</label>
                                                <div class="col-lg-9">
                                                    <input id="myPassword2" class="form-control" type="password" onChange={''} />
                                                    <FontAwesomeIcon id="eye" onClick={SeePassword} icon={ojos} />
                                                </div>
                                            </div>
                                             {/* Separador de input  */ }
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label form-control-label"></label>
                                                {/* Enviar o cancelar el envio de datos */ }
                                                <div class="col-lg-9">
                                                    <input type="reset" class="btn btn-secondary" value="Cancel" />
                                                    <input type="button" class="btn btn-success" value="Save Changes" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



        </>
    )


}

export default InfoPerfil;