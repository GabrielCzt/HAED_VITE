import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/Nav.css";
import TICS from "../imagenes/logo_TICeducativa_normal.png";
import Calidad from "../imagenes/CalidadyCompetividad.jpg";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function Navv() {
  return (
    <>
      {/**Etiqueta separadora de estilos */}
      <div className="_navbar">
        <Navbar expand="lg" className="nav">
          <div className="container">
            {/**Imagenes del nav brand */}
            <div className="col-sm-8 col-md-5">
              <img className="navbar-brand imagen" src={TICS} alt="TIC" />
              <img className="navbar-brand imagen" src={Calidad} alt="logo" />
            </div>
            {/**Links envueltos en un Collapse para el diseño responsivo */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink id="links" to="/">
                  Inicio
                </NavLink>
                <NavLink id="links" to="/Descubre">
                  Descubre
                </NavLink>
                <NavLink id="links" to="/Seleccionar-cuestionario">
                  Autoevaluación
                </NavLink>
                <NavLink id="links" to="/CanalYoutube/1">
                  Recomendaciones Youtube
                </NavLink>
                <NavLink id="links" to="/Contacto">
                  Contacto
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
    </>
  );
}
export default Navv;
