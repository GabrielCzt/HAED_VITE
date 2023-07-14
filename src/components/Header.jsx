import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import "../estilos/Header.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import cambio from "../funciones/DarkTheme";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

const cookie = new Cookies();

function Header() {
  const navigate = new useNavigate();
  const [op1, setOp1] = useState("");
  const [route1, setRoute1] = useState("");
  const [op2, setOp2] = useState("");
  const [matricula, setMatricula] = useState("");
  const [info, setInfo] = useState([]);
  const [themeIcon,setThemeIcon]=useState(faSun)
  const [themeID, setThemeId] = useState("themeSun")

  
  const fetchData = async () => {
    try {
      const token = cookie.get("token");
      const url = "http://api-haed.danielreyesepitacio.cloud/api/users/info";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        if (jsonData.rol_id === 3) setRoute1("/Opciones-administrador");
        setMatricula(jsonData.nombres);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  const EstableceOp = () => {
    if (cookie.get("token")) {
      fetchData();
      setOp1("Perfil");
      setOp2("Cerrar Sesión");
      if (route1 === "" || route1 === "/Iniciar-sesion") setRoute1("/Perfil");
    } else {
      setMatricula("");
      setOp1("Iniciar Sesión");
      setOp2("Registrarse");
      setRoute1("/Iniciar-sesion");
    }
  };
  //Para obtener los elementos de la fecha
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  {
    /**Switch de menú */
  }
  useEffect(() => {
  if(!cookie.get("theme")){
    cookie.set("theme", "light", { path: "/" });
    setThemeIcon(faSun)
    setThemeId("themeSun")
  }
  else if(cookie.get("theme")==="dark"){
    setThemeId("themeMoon")
    setThemeIcon(faMoon)
  }
  
  cambio("set")
  }, []);
  const close = () => {
    if (op2 === "Registrarse") {
      navigate("/Registrarse");
    } else {
      setMatricula("");
      cookie.remove("retroalimentacion", { path: "/" });
      cookie.remove("cuest", { path: "/" });
      cookie.remove("token", { path: "/" });
      cookie.remove("intento", { path: "/" });
      navigate("/Iniciar-sesion");
    }
    setOp1("Iniciar Sesión");
    setOp2("Registrarse");
    setMatricula("");
  };
  const setTheme =()=>{
    cambio("switch");
    if(themeIcon===faSun){
      setThemeIcon(faMoon)
      cambio
      setThemeId("themeMoon")
    }
    else{
      setThemeIcon(faSun)
      cambio
      setThemeId("themeSun")
    }
  }
  return (
    <>
      <EstableceOp />
      {/**Etiqueta separadora de estilos, para evitar problemas al compilar y ejecutar */}
      <div className="cab">
        <header>
          <div className="container">
            <div className="row">
              {/**Primera columna, contiene el icono de reloj y la fecha completa */}
              <div className="col-sm-4 col-md-2" id="date">
                <button id={themeID} aria-label="switch-theme" onClick={setTheme}> <FontAwesomeIcon icon={themeIcon}/> </button>
                &nbsp;
                &nbsp;
                <FontAwesomeIcon icon={faClock} id="reloj" />
                {day}/{month}/{year}
              </div>
              {/**Segunda columna, se reserva para el titulo y ayuda a posicionar el siguiente elemento, además de permitir un mejor control
               * de responsividad
               */}
              <div className="col-sm-6 col-md-8" id="Title">
                <p>Herramienta de Autoevaluación HAED</p>
              </div>
              {/**Tercera columna, contiene el botón de menú, es necesario usar etiquetas de React-Bootstrap para evitar problemas de compatibilidad */}
              <div className="col-sm-2 col-md-2 desplegable">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" aria-label="Perfil Desplegable">
                    <FontAwesomeIcon icon={faCircleUser} />
                    &nbsp; {matricula}
                  </Dropdown.Toggle>
                  <Dropdown.Menu id="dropMenu">
                    {/**Usar ItemText en lugar de Item sirve para colocar la funcionalidad de Link */}
                    <Dropdown.ItemText>
                      <Link id="links-header" onClick={EstableceOp} to={route1}>
                        {op1}
                      </Link>
                    </Dropdown.ItemText>
                    <Dropdown.ItemText>
                      <p onClick={close} id="links-header">
                        {op2}
                      </p>
                    </Dropdown.ItemText>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
export default Header;
