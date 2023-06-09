import React from "react";
import  "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/Footer.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer(){
    {/**Obteniendo la fecha para el Copyright */}
    const year = new Date().getFullYear();
    return(
        <>
        {/**Etiqueta separadora de estilos */}
        <div className="foot">
            <footer>
            <div className="container section-bg mt-5">
                <div className="row d-flex justify-content-between">
                    {/**Primer apartado de texto */}
                    <div className="col-xl-3 col-lg-4 col-md-5 col-sm-8">
                        <p className="info1">
                        “Proporcionar Educación Superior Tecnológica a través de programas intensivos de estudio, pertinentes e integrales, acordes a los avances científicos y tecnológicos para formar profesionistas competitivos con sentido humano, que fortalezcan los procesos de los sectores productivo y de servicios a nivel regional y nacional que coadyuven al desarrollo social.”
                        </p>
                    </div>
                    {/**Apartado de links, columna central izquierda*/}
                    <div className="col-xl-2 col-lg-2 col-md-3 col-sm-5">
                        <div className="footer-tittle">
                        <h4>Páginas</h4>
                            <ul>
                                <li><Link  to="/">Inicio</Link></li>
                                <li><Link to="/Descubre">Descubre</Link></li>
                                <li><Link to="/Autoevaluacion">Autoevaluación</Link></li>
                                <li><Link to="/CanalYoutube">Canal de Youtube</Link></li>
                                <li><Link to="Contacto">Contacto</Link></li>
                            </ul>
                        </div>
                    </div>
                    {/**Apartado de links, columna central derecha */}
                        <div className="col-xl-2 col-lg-2 col-md-3 col-sm-5">
                            <h4>Explorar</h4>
                            <ul>
                                <li><a href="">Cookies</a></li>
                                <li><a href="">Politicas de privacidad</a></li>
                            </ul>
                        </div>
                        {/**Contacto */}
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8">
                            <h4>Nosotros</h4>
                            <p>Comunícate con los cuerpos académicos encargados para resolver alguna situación.</p>
                            <h4><span id="correos">Correos</span> <span id="electronicos">electrónicos</span></h4>
                            <p>cuestionario@utpuebla.edu.mx<br/>
                            cuerpoacademico1@utpuebla.edu.mx<br/>
                            cuerpoacademico2@utpuebla.edu.mx
                            </p>
                        </div>
                </div>
                <hr/>
                {/**Fondo del footer, queda fuera del renglón anterior */}
                <div id="footer-bottom">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-xl-9 col-lg-8 ">
                            <p>        
                                Universidad Tecnológica de Puebla &copy;  {year } Todos los derechos reservados | <a href="creditos.html">Créditos</a> &nbsp;                                
                                <a href="https://www.facebook.com/OficialUTP" target="_blank"><FontAwesomeIcon className="icon" icon={faFacebook} />&nbsp;</a>
                                <a href="https://www.instagram.com/utpueblaoficial/?hl=es" target="_blank"><FontAwesomeIcon className="icon" icon={faInstagram} />&nbsp;</a>
                                <a href="https://twitter.com/OficialUTP"  target="_blank"><FontAwesomeIcon className="icon" icon={faTwitter} />&nbsp;</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </footer>
        </div>
           </>
        
    )
}
export default Footer;