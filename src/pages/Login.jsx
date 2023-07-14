import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import "../estilos/Login.css";
import "../estilos/Pages.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SessionContext from "../context/SessionContext";
import Titulo from "../components/BarraDeTitulo";

const cookie = new Cookies();

function Login() {
  const {
    _email,
    _password,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
    _error,
    loading,
  } = useContext(SessionContext);
  const navigate = useNavigate();
  {
    /*//Estado para ocultar contraseña*/
  }
  const [ojos, setOjos] = useState(faEye);
  {
    /*verificacion de credenciales*/
  }

  {
    /*Referencia para colocar cursor en input 'email'*/
  }
  const userRef = useRef();
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (cookie.get("token")) {
      navigate("/Perfil");
    }
    document.getElementById("myPassword").value = "";
    document.getElementById("myName").value = "";
  }, []);

  {
    /*Muestra y oculta la contraseña del input 'password' */
  }
  const SeePassword = () => {
    let pass = document.getElementById("myPassword");
    if (pass.type === "password") {
      pass.type = "text";
      setOjos(faEyeSlash);
    } else if (pass.type === "text") {
      pass.type = "password";
      setOjos(faEye);
    }
  };

  return (
    <>
      <Titulo titulo="Iniciar sesión" />
      {/**Etiqueta separadora de estilos */}
      <div className="log">
        <div className="container" id="log_sign">
          <div className="row">
            {/**Cuadro izquierdo de registro */}
            <div className="col-sm-12 col-md-6 sign">
              <div className="row">
                <h4>¿No tienes una cuenta?</h4>
                <p>
                  Para poder contestar la Autoevaluación es necesario tener una
                  cuenta de usuario, si aún no la tiene, de clic en el botón de
                  Registrarse.
                </p>
                <br />
                <Link to="/Registrarse">
                  <button id="button">REGISTRARSE</button>
                </Link>
              </div>
            </div>
            {/**Formulario de inicio de sesión */}
            <div className="col-sm-12 col-md-6 login">
              <h2>Bienvenido</h2>
              <h4>Inicie sesión ahora</h4>

              {/**Indicador de exito en el inicio*/}
              {loading ? (
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
              ) : (
                <p id="error">{_error}</p>
              )}
              {/**Formulario de inicio de sesión */}
              <form onSubmit={handleSubmit}>
                <input
                  required
                  value={_email}
                  onChange={handleChangeEmail}
                  name="nombre"
                  type={"email"}
                  id="myName"
                  ref={userRef}
                  placeholder="Ingrese su Correo Electrónico"
                ></input>
                <br />
                <input
                  required
                  value={_password}
                  onChange={handleChangePassword}
                  name="password"
                  type={"password"}
                  id="myPassword"
                  placeholder="Ingrese su contraseña"
                ></input>
                <FontAwesomeIcon id="eye" onClick={SeePassword} icon={ojos} />
                <button type="submit" id="ingresar">
                  INGRESAR
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
