import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import '../estilos/InfoPerfil.css'

const cookie = new Cookies();

function InfoPerfil() {
    const navigate = useNavigate();
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
        if (!nombre || !apellidos) {
            navigate('/Iniciar-sesion')

        }
    }, [])


    return (
        <>
            {/**Barra de titulo */}
            <div className="barContains">
                <div className="bar">
                    <span className="display-3"><b>Perfil de Usuario</b></span>
                </div>
            </div>



            <div class="container">
                <div class="row" id="secondary">
                    <div class="col-lg-4">
                        <div class="profile-card-4 z-depth-3">
                            <div class="card">
                                <div class="card-body text-center bg-success rounded-top">
                                    <div class="user-box">
                                        <button class="btn " onClick={() => navigate("/")} > <img className="img" src="https://pbs.twimg.com/profile_images/1609948030865743872/FXN0HLMz_400x400.jpg" height="100" width="100" /></button>
                                    </div>
                                    <h5 class="mb-1 text-white">Universidad Tecnologica de Puebla</h5>

                                </div>
                                <div class="card-body">
                                    <ul class="list-group shadow-none">
                                        <li class="list-group-item">
                                            <div class="list-icon">
                                                <i class="fa fa-envelope"></i>
                                            </div>
                                            <div class="list-details">
                                                <span>{nombre} {apellidos} </span>
                                                <small>Nombre</small>
                                            </div>
                                        </li>
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
                                <div class="card-footer text-center">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card z-depth-3">
                            <div class="card-body">
                                <ul class="nav nav-pills nav-pills-success nav-justified">
                                    <li class="nav-item">
                                        <a href="javascript:void();" data-target="#edit" data-toggle="pill" class="nav-link active show "><i class="icon-note"></i> <span class="hidden-xs">Editar Perfil</span></a>
                                    </li>
                                </ul>
                                <div class="tab-content p-3">

                                    <div class="tab-pane active  show" id="edit">
                                        <form>
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label form-control-label">Nombre(s)</label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="text" onChange={''} />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label form-control-label">Apellido(s)</label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="text" onChange={''} />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label form-control-label">Correo Electronico</label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="email" onChange={''} />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label form-control-label">Contraseña nueva</label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="password" onChange={''} />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label form-control-label">Confirmar contraseña</label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="password" onChange={''} />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-lg-3 col-form-label form-control-label"></label>
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