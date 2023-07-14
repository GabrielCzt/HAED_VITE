import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faContactCard } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import emailjs from "@emailjs/browser";

import "../estilos/Contacto.css";
import "../estilos/Pages.css";
import Titulo from "../components/BarraDeTitulo";

export default function Contacto() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_lx7oknf","template_52t1nsi",form.current,"X-K1g4Lg8jT07BK81")
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <>
      <Titulo titulo="Contacto" />

      {/**Etiqueta separadora de estilos */}
      <div className="ctc">
        <section className="section contact-info pb-0">
          <div className="container">
            {/**Cartas de contacto */}
            <div className="row">
              <div className="col-lg-4 col-sm-6 col-md-6">
                <div className="contact-block mb-4 mb-lg-0">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    style={{ color: "#104141" }}
                    id="telefono"
                  />
                  <h5>Teléfono</h5>
                  +52-222-598-9854
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-md-6">
                <div className="contact-block mb-4 mb-lg-0">
                  <FontAwesomeIcon
                    icon={faContactCard}
                    style={{ color: "#104141" }}
                    id="correo"
                  />
                  <h5>Email</h5>
                  cuestionario@utpuebla.edu.mx
                  <br />
                  cuerpoacademico1@utpuebla.edu.mx
                  <br />
                  cuerpoacademico2@utpuebla.edu.mx
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-md-6">
                <div className="contact-block mb-4 mb-lg-0">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ color: "#104141" }}
                    id="ubicacion"
                  />
                  <h5>Ubicación</h5>
                  Antiguo Camino a La Resurrección 1002 - A, Zona Industrial,
                  72300 Puebla, Pue.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/**Formulario para enviar mensaje */}

        <section className="contact-form-wrap section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <form
                    ref={form}
                    onSubmit={sendEmail}
                    id="formContacto"
                    className="contact__form "
                    method="post"
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            name="name"
                            id="nombreContacto"
                            required=""
                            type="text"
                            class="form-control"
                            placeholder="Ingrese su nombre completo"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            name="email"
                            id="emailContacto"
                            required=""
                            type="email"
                            class="form-control"
                            placeholder="Ingrese su correo electrónico"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            name="head"
                            id="asuntoContacto"
                            required=""
                            type="text"
                            class="form-control"
                            placeholder="Ingrese el asunto a tratar"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            name="phone"
                            id="telefonoContacto"
                            required=""
                            type="text"
                            class="form-control"
                            placeholder="Ingrese su número de teléfono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group-2 mb-4">
                      <textarea
                        name="message"
                        id="mensajeContacto"
                        required=""
                        class="form-control"
                        rows="8"
                        placeholder="Ingrese su mensaje"
                      ></textarea>
                    </div>

                    <div className="text-center">
                      <input
                        className=" btn-main btn-round-full"
                        type="submit"
                        value="Enviar mensaje"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/**Espacio Google Maps */}
        <div className="google-map mt-5">
          <div id="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1627029075873!6m8!1m7!1sCAoSLEFGMVFpcE95V1hkb2U0N2N6R0RmS0ZEUENUX24wd2J2T2R2b2Zzb1ZHc2RF!2m2!1d19.05823776731109!2d-98.15246838088497!3f5.527456949759525!4f-6.876625275937911!5f0.7820865974627469"
              title="Prueba"
            />
          </div>
        </div>
      </div>
    </>
  );
}
