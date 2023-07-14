import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/Index.css";
import HERO from "../imagenes/hero.png";
import IMG1P from "../imagenes/img1_portfolio.jpg";
import IMG2P from "../imagenes/img2_portfolio.jpg";
import IMG3P from "../imagenes/img3_portfolio.jpg";
import IMG4P from "../imagenes/img4_portfolio.jpg";
import cuerpo from "../imagenes/cuerpos.png";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function Index() {
  //Funciones para mostrar/ocutar el contenido de las fichas de los cuerpos académicos
  const contenidoTIC = () => {
    let tics = document.getElementById("contenedorTIC");
    let calidad = document.getElementById("contenedorCalidad");
    let imagen = document.getElementById("contenedorImagen");
    imagen.style.visibility = "hidden";
    imagen.style.display = "none";
    calidad.style.visibility = "hidden";
    calidad.style.display = "none";
    tics.style.visibility = "visible";
    tics.style.display = "block";
    if (
      document.getElementById("fichaTic") &&
      document.getElementById("fichaCalidadA")
    ) {
      document.getElementById("fichaTic").id = "fichaTicA";
      document.getElementById("fichaCalidadA").id = "fichaCalidad";
    }
  };

  const contenidoCalidad = () => {
    let tics = document.getElementById("contenedorTIC");
    let calidad = document.getElementById("contenedorCalidad");
    let imagen = document.getElementById("contenedorImagen");
    imagen.style.visibility = "hidden";
    imagen.style.display = "none";
    calidad.style.visibility = "visible";
    calidad.style.display = "block";
    tics.style.visibility = "hidden";
    tics.style.display = "none";
    if (
      document.getElementById("fichaCalidad") &&
      document.getElementById("fichaTicA")
    ) {
      document.getElementById("fichaCalidad").id = "fichaCalidadA";
      document.getElementById("fichaTicA").id = "fichaTic";
    }
  };

  //*Se encarga de los efectos en scroll
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <>
      <div className="idx">
        {/* Primera parte del index */}
        <div className="index-dark">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-6" data-aos="fade-up">
                <h1 className="fs-1">HAED: Herramienta de Autoevaluación Docente</h1>
                <br />
                <Link to="/Seleccionar-cuestionario">
                  <button id="i_contestar">
                    Clic aquí para contestar Autoevaluación
                  </button>
                </Link>
              </div>
              <div className="col-sm-12 col-md-6" data-aos="zoom-in">
                <img className="img-fluid" src={HERO} alt="Hero" />
              </div>
            </div>

            {/* Ficha de definicion de HAED*/}

            <div className="row" id="definicion">
              <div className="col-sm-12 col-md-6 " data-aos="zoom-in">
                <img
                  className="img-fluid"
                  id="img2p"
                  src={IMG2P}
                  alt="ImagenPortafolio2"
                />
              </div>
              <div className="col-sm-12 col-md-6 info" data-aos="zoom-in">
                <h4>
                  Herramienta enfocada al mejoramiento de la calidad educativa
                  universitaria
                </h4>
                <p>
                  HAED es un herramienta alternativa de autoevaluación docente
                  propuesta por los cuerpos académicos:
                </p>
                <ol>
                  <li>
                    <FontAwesomeIcon id="cicleCheck" icon={faCircleCheck} />
                    TIC Educativa.
                  </li>
                  <li>
                    <FontAwesomeIcon id="cicleCheck" icon={faCircleCheck} />
                    Calidad y Competitividad.
                  </li>
                </ol>
                <p>
                  Está basada en competencias y considera aspectos integrales
                  que incluyen al docente como persona, su desarrollo
                  profesional y su relación con la comunidad universitaria,
                  especialmente con el estudiante.
                </p>
              </div>
            </div>

            {/**Apartado de cuerpos académicos */}

            <div className="row cuerpos">
              <div className="col-sm-12 col-md-6" data-aos="fade-up">
                <div className="row">
                  <h4>Cuerpos académicos</h4>
                  <p>
                    *Para más información da clic sobre el nombre del cuerpo
                    académico.
                  </p>
                </div>

                <div onClick={contenidoTIC}>
                  <div className="row" id="fichaTic">
                    <div className="row">
                      <h5>
                        <b>TIC Educativa</b>
                      </h5>
                    </div>
                    <div className="col">
                      <h6>
                        <b>Clave</b>
                      </h6>
                      <p>nUTPUE_CA-8</p>
                    </div>
                    <div className="col" id="grado">
                      <h6>
                        <b>Grado</b>
                      </h6>
                      <p>En formación</p>
                    </div>
                  </div>
                </div>
                <div onClick={contenidoCalidad}>
                  <div className="row" id="fichaCalidad">
                    <div className="row">
                      {" "}
                      <h5>
                        <b>Calidad y competitividad</b>
                      </h5>
                    </div>
                    <div className="col">
                      <h6>
                        <b>Clave</b>
                      </h6>
                      <p>UTPUE_CA-6</p>
                    </div>
                    <div className="col" id="grado">
                      <h6>
                        <b>Grado</b>
                      </h6>
                      <p>Consolidado</p>
                    </div>
                  </div>
                </div>
              </div>

              {/**Para la funcionalidad de mostrar las diferentes definiciones por
                     cada cuerpo académico se escribió la información en contendores separados
                    y posteriormente con las funciones js y los estilos css se muestran/ocultan
                    */}

              <div className="col-sm-12 col-md-6" data-aos="zoom-in">
                <div id="contenedorImagen">
                  <p>
                    <img className="img-fluid" src={cuerpo} alt="Cuerpos" />
                  </p>
                </div>
                <div id="contenedorTIC">
                  <h6>Objetivo:</h6>
                  Desarrollar propuestas de mejora, fundamentadas y relacionadas
                  con el estudio de diferentes ambientes de aprendizaje; de
                  igual manera, propiciar la colaboración y creación de
                  materiales educativos que apoyen distintos escenarios de
                  estudio para ser aprovechados por las futuras generaciones
                  elevando así el autoaprendizaje y la conciencia social.
                  <h6>Líneas de investigación:</h6>
                  Estudio de ambientes de aprendizaje y propuestas de mejora
                  Material Didáctico
                  <h6>Integrantes:</h6>
                  Mtra. Verónica Lizardi Rojo Mtra. Norma Angélica Roldán
                  Oropeza Lic. Rosalba Bolaños Ortega
                  <h6>Contacto:</h6>
                  tic-educativa@utpuebla.edu.mx
                </div>
                <div id="contenedorCalidad">
                  <h6>Objetivo:</h6>
                  Investigar y desarrollar propuestas de mejora enfocadas a la
                  mejora de la calidad y optimización de empresas, instituciones
                  y universidades, con el fin de mejorar sus procesos, productos
                  o servicios para que generen una ventaja competitiva.
                  <h6>Líneas de investigación:</h6>
                  Normalización de los Sistemas de Gestión de la Calidad ISO
                  9000 Automatización y robótica para optimizar los sistemas de
                  control
                  <h6>Integrantes:</h6>
                  Mtro. Héctor De Sampedro Poblano Dra. Luz del Carmen Morán
                  Bravo Dr. Gustavo Herrera Sánchez Dr. Alejandro Silva Juárez
                  <h6>Contacto:</h6>
                  hector.desampedro@utpuebla.edu.mx
                </div>
              </div>
            </div>

            {/*Tarjetas*/}

            <div className="row cards">
              <div data-aos="fade-up">
                <h3>Temas</h3>
                <p>
                  Los temas a tocar dentro del cuestionario de autoevaluación son los siguientes:
                </p>
              </div>
              {/**Los data-aos son en realidad clases, por lo que agregar una "class" a la etiqueta Card causa conflicto, por esta razón, 
                     se colocó cada tarjeta en un div con las clases respectivas para el diseño responsivo
                    */}
              <div className="col-sm-12 col-md-3">
                <Card id="tarjeta" data-aos="zoom-in" data-aos-duration="100">
                  <FontAwesomeIcon id="iconCard" icon={faLightbulb} />
                  <Card.Body>
                    <Card.Title>Práctica reflexiva</Card.Title>
                    <Card.Text>
                      Dirigido a que el participante reconozca y analice los
                      hechos de manera libre mediante una observación científica
                      no estructurada.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-sm-12 col-md-3">
                <Card id="tarjeta" data-aos="zoom-in" data-aos-duration="200">
                  <FontAwesomeIcon id="iconCard" icon={faDesktop} />
                  <Card.Body>
                    <Card.Title>Aspectos Tecnológicos</Card.Title>
                    <Card.Text>
                      Son habilidades que Greg Thompson menciona como elementos
                      indispensables que el docente debe incorporar y enseñar a
                      sus discentes.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-sm-12 col-md-3">
                <Card id="tarjeta" data-aos="zoom-in" data-aos-duration="300">
                  <FontAwesomeIcon id="iconCard" icon={faUserTie} />
                  <Card.Body>
                    <Card.Title>Profesionalización Docente</Card.Title>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-sm-12 col-md-3">
                <Card id="tarjeta" data-aos="zoom-in" data-aos-duration="400">
                  <FontAwesomeIcon id="iconCard" icon={faGlobe} />
                  <Card.Body>
                    <Card.Title>Sobre la herramienta</Card.Title>
                    <Card.Text>
                      Cuestionamientos en apoyo a la mejora de la herramienta.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>

            {/**Portafolio de imagenes */}

            <div className="row portafolio" data-aos="fade-up">
              <h3>Portafolio de imágenes de HAED</h3>
              <div className="col-sm-12 col-md-4">
                <img
                  className="img-fluid"
                  id="img1p"
                  src={IMG1P}
                  alt="ImagenPortafolio1"
                />
              </div>
              <div className="col-sm-12 col-md-4">
                <img
                  className="img-fluid"
                  id="img3p"
                  src={IMG3P}
                  alt="ImagenPortafolio3"
                />
              </div>
              <div className="col-sm-12 col-md-4">
                <img
                  className="img-fluid"
                  id="img4p"
                  src={IMG4P}
                  alt="ImagenPortafolio4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
