import React from "react";
import { useParams } from "react-router-dom";
import Titulo from "../components/BarraDeTitulo";
import "../estilos/ActualizarUsuario.css";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import {  decryptToken } from "../funciones/Cifrado";
import fetchData from "../funciones/ObtenerInformación";
import Swal from "sweetalert2";
import "../estilos/ActualizarUsuario.css";
import Cargando from "../components/Cargando";
const cookie = new Cookies();

function ActualizarInformacion() {
  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData();
      setInfo(data);
    };
    fetchDataAsync();
  }, []);
  const navigate = new useNavigate();
  let params = useParams();
  const [info, setInfo] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [_id, set_Id] = useState("");
  const [email, setEmail] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const changeNombres = (event) => {
    setNombre(event.target.value);
  };
  const changeApellidos = (event) => {
    setApellidos(event.target.value);
  };
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changeID = (event) => {
    set_Id(event.target.value);
  };
  const changeEdad = (event) => {
    setEdad(event.target.value);
  };
  const changeSexo = (event) => {
    setSexo(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };
  const changeConfirmation = (event) => {
    setConfirmation(event.target.value);
  };
  const [selectedOption, setSelectedOption] = useState("");

  // Función para manejar el cambio en la selección

  // *Funcion para realizar la actualización de usuario
  const handleUpdate = async () => {
    try {
      const token = decryptToken(cookie.get("token"));
      console.log(token)
      const url =
        "http://api-haed.danielreyesepitacio.cloud/api/users/update";
      const parametros = {};
      if (nombre !== null && nombre !== "") {
        parametros.nombres = nombre;
      }
      if (apellidos !== null && apellidos !== "") {
        parametros.apellidos = apellidos;
      }
      if (email !== null && email !== "") {
        parametros.email = email;
      }
      if (_id !== null && _id !== "") {
        parametros.matricula = _id;
      }
      if (edad !== null && edad !== "") {
        parametros.edad = edad;
      }
      if (sexo !== null && sexo !== "") {
        parametros.sexo = sexo;
      }

      if (selectedOption !== "" && selectedOption !== null) {
        parametros.rol_id = parseInt(selectedOption);
      }

      if (password !== null && password !== "") {
        parametros.password = password;
        if (confirmation !== null && confirmation !== "") {
          parametros.password_confirmation = confirmation;
          if (password === confirmation) {
            console.log(JSON.stringify(parametros));
            const response = await fetch(url, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(parametros),
            });
            if (response.ok) {
              navigate("../Perfil");
            }
          } else {
            Swal.fire({
              text: "Las contraseñas no coinciden",
              icon: "error",
              showCloseButton: true,
              focusConfirm: false,
              confirmButtonText: "Ok",
            });
          }
        } else {
          Swal.fire({
            text: "Las contraseñas no coinciden",
            icon: "error",
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: "Ok",
          });
        }
      } else {
        console.log(JSON.stringify(parametros));
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parametros),
        });
        if (response.ok) {
          navigate("../Perfil");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Titulo titulo="Actualizar usuario" />
      {/* Etiqueta separadora de estilos */}
      <div className="userupdate">
        <div className="row">
          {!info ? (
            <Cargando />
          ) : (
            <>
              <div className="col containerUserUpdate">
                <div className="container">
                  <div className="row">
                    <li>
                      <div>
                        
                          <div className="row containInput">
                            <label>
                              <b>Nombre</b>
                            </label>
                            <input
                              onChange={changeNombres}
                              type="text"
                              placeholder={info.nombres}
                            />
                          </div>
                          <div className="row containInput">
                            <label>
                              <b>Apellidos</b>
                            </label>
                            <input
                              onChange={changeApellidos}
                              type="text"
                              placeholder={info.apellidos}
                            />
                          </div>

                          <div className="row containInput">
                            <label>
                              <b>Email</b>
                            </label>
                            <input
                              onChange={changeEmail}
                              type="text"
                              placeholder={info.email}
                            />
                          </div>

                          <div className="row containInput">
                            <label>
                              <b>ID de Docente</b>
                            </label>
                            <input
                              onChange={changeID}
                              type="text"
                              placeholder={info.matricula}
                            />
                          </div>
                          <div className="row containInput">
                            <label>
                              <b>Edad</b>
                            </label>
                            {info.edad ? (
                              <input
                                onChange={changeEdad}
                                type="text"
                                placeholder={info.edad}
                              />
                            ) : (
                              <input
                                onChange={changeEdad}
                                type="text"
                                placeholder={"No establecido"}
                              />
                            )}
                          </div>
                          <div className="row containInput">
                            <label>
                              <b>Género</b>
                            </label>
                            {info.sexo ? (
                              <input
                                onChange={changeSexo}
                                type="text"
                                placeholder={info.sexo}
                              />
                            ) : (
                              <input
                                onChange={changeSexo}
                                type="text"
                                placeholder={"No establecido"}
                              />
                            )}
                          </div>

                          <div className="row containInput">
                            <label>
                              <b>Contraseña</b>
                            </label>
                            <input
                              onChange={changePassword}
                              type="text"
                              placeholder="Nueva contraseña"
                            />
                          </div>

                          <div className="row containInput">
                            <label>
                              <b>Confirmación</b>
                            </label>
                            <input
                              onChange={changeConfirmation}
                              type="text"
                              placeholder="Vuelva a escribir la contraseña"
                            />
                          </div>

                          <button id="enviar" type="submit" onClick={()=>{handleUpdate()}}>
                            Actualizar
                          </button>
                        
                      </div>
                    </li>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ActualizarInformacion;
