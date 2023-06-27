import React from "react";
import { Form, useParams } from "react-router-dom";
import Titulo from "../components/BarraDeTitulo";
import "../estilos/ActualizarUsuario.css";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const cookie = new Cookies();

function ActualizarUsuario() {
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

  const handleUpdate = async () => {
    try {
      const token = cookie.get("token");
      const url =
        "http://api-haed.danielreyesepitacio.cloud/api/admin/users/" +
        params.id;
      const parametros = new Map();
      if (nombre !== null && nombre !== "") {
        parametros.set('nombres', nombre);
      }
      if (apellidos !== null && apellidos !== "") {
        parametros.set('apellidos', apellidos);
      }
      if (email !== null && email !== "") {
        parametros.set('email', email);
      }
      if (_id !== null && _id !== "") {
        parametros.set('matricula', _id);
      }
      if (edad !== null && edad !== "") {
        parametros.set('edad', edad);
      }
      if (sexo !== null && sexo !== "") {
        parametros.set('sexo', sexo);    
      }
      if (password !== null && password !== "") {
        parametros.set('password', password);
      }
      if (confirmation !== null && confirmation !== "") {
        parametros.set('password_confirmation', confirmation);
      }
      console.log(JSON.stringify(Object.fromEntries(parametros)))
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(parametros))
      });
      if(response.ok){
        navigate("/Informacion-de-usuarios")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const token = cookie.get("token");
      const url =
        "http://api-haed.danielreyesepitacio.cloud/api/admin/users/" +
        params.id;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        setInfo(userData);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Titulo titulo="Actualizar usuario" />
      {/* Etiqueta separadora de estilos */}
      <div className="userupdate">
        <div className="container">
          <div className="row">
            <div className="col">
              <h6>Ingrese solamente los campos que desea actualizar</h6>
            </div>
            <div className="col-6">
              <form onSubmit={handleUpdate}>
                <input
                  onChange={changeNombres}
                  type="text"
                  placeholder={"Nombres: " + info.nombres}
                />
                <br />
                <input
                  onChange={changeApellidos}
                  type="text"
                  placeholder={"Apellidos: " + info.apellidos}
                />
                <br />
                <input
                  onChange={changeEmail}
                  type="text"
                  placeholder={"Email: " + info.email}
                />
                <br />
                <input
                  onChange={changeID}
                  type="text"
                  placeholder={"ID de docente: " + info.matricula}
                />
                <br />
                {info.edad ? (
                  <input
                    onChange={changeEdad}
                    type="text"
                    placeholder={"Edad: " + info.edad}
                  />
                ) : (
                  <input
                    onChange={changeID}
                    type="text"
                    placeholder={"Edad:"}
                  />
                )}
                <br />
                {info.sexo ? (
                  <input
                    onChange={changeSexo}
                    type="text"
                    placeholder={"Sexo: " + info.sexo}
                  />
                ) : (
                  <input
                    onChange={changeSexo}
                    type="text"
                    placeholder={"Sexo:"}
                  />
                )}
                <br />
                <input
                  onChange={changePassword}
                  type="text"
                  placeholder="Contraseña"
                />
                <br />
                <input
                  onChange={changeConfirmation}
                  type="text"
                  placeholder="Repetir contraseña"
                />
                <br />
                <button id="enviar" type="submit">Actualizar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActualizarUsuario;
