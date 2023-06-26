import React, { useEffect, useContext } from "react";
import "../estilos/Login.css"; //Se reciclaron los estilos de la página Login, pues son exactamente los mismos
import "../estilos/Pages.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState } from "react";
import SessionContext from "../Context/SessionContext";
import Titulo from "../components/BarraDeTitulo";

const cookie = new Cookies();

function Sign() {
  const {
    _email,
    _password,
    _error,
    loading,
    handleSign,
    changeNombres,
    changeApellidos,
    changeEmail,
    changeMatricula,
    changePassword,
    changeConfirmation,
    _nombres,
    _apellidos,
    _matricula,
    _confirmation,
  } = useContext(SessionContext);
  //Código para la redirección validada por sesión
  const navigate = new useNavigate();

  {
    /*//Estado para mostrar contraseña*/
  }
  const [ojos, setOjos] = useState(faEye);

  {
    /*Muestra y oculta contraseña del input 'password' */
  }
  const SeePassword = () => {
    let pass = document.getElementById("password");
    let pass2 = document.getElementById("confirmation");
    if (pass.type === "password" || pass2.type === "password") {
      pass.type = "text";
      pass2.type = "text";
      setOjos(faEyeSlash);
    } else if (pass.type === "text" || pass2.type === "text") {
      pass.type = "password";
      pass2.type = "password";
      setOjos(faEye);
    }
  };

  useEffect(() => {
    if (cookie.get("token")) {
      navigate("/Perfil");
    }
    document.getElementById("nombres").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("matricula").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmation").value = "";
  }, []);

  //Código para el registro

  return (
    <>
      <Titulo titulo="Registrarse"/>
      {/**Etiqueta separadora de estilos */}
      <div className="log">
        <div className="container" id="log_sign">
          <div className="row">
            {/**Cuadro de la izquierda para iniciar sesión */}
            <div className="col-sm-12 col-md-6 sign">
              <h2>¿Ya tienes una cuenta?</h2>
              <p>
                Para contestar la autoevaluación debes iniciar sesión, si ya
                tienes una cuenta da click en el botón Iniciar Sesión
              </p>
              <br />
              <Link to="/Iniciar-sesion">
                <button id="button">INICIAR SESIÓN</button>
              </Link>
            </div>
            {/**Formulario para registro */}
            <div className="col-sm-12 col-md-6 login">
              <h2>Bienvenido</h2>
              <h3>Vamos a crear una nueva cuenta</h3>
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

              <form onSubmit={handleSign}>
                <input
                  id="nombres"
                  required
                  value={_nombres}
                  onChange={changeNombres}
                  type={"text"}
                  placeholder="Ingrese sus Nombres"
                ></input>
                <input
                  id="apellidos"
                  required
                  value={_apellidos}
                  type={"text"}
                  onChange={changeApellidos}
                  placeholder="Ingrese sus Apellidos"
                ></input>
                <input
                  id="matricula"
                  inputMode="numeric"
                  required
                  value={_matricula}
                  type={"text"}
                  onChange={changeMatricula}
                  placeholder="Coloque aquí su ID de docente"
                ></input>
                <input
                  id="email"
                  required
                  value={_email}
                  type={"email"}
                  onChange={changeEmail}
                  placeholder="Ingrese su Correo Electrónico"
                ></input>
                <input
                  id="password"
                  required
                  value={_password}
                  type={"password"}
                  onChange={changePassword}
                  placeholder="Contraseña"
                ></input>
                <FontAwesomeIcon id="eye" onClick={SeePassword} icon={ojos} />
                <input
                  id="confirmation"
                  required
                  value={_confirmation}
                  type={"password"}
                  onChange={changeConfirmation}
                  placeholder="Repita su contraseña"
                ></input>
                <button type="submit" id="ingresar">
                  CLICK AQUÍ PARA CREAR SU CUENTA
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Sign;
