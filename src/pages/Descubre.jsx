import React from "react";
import "../estilos/Descubre.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/Pages.css";
import Titulo from "../components/BarraDeTitulo";
import Miller from "../imagenes/piramide_miller.png";
import Dimensiones from "../imagenes/dimensiones.jpeg";
import Rasgos from "../imagenes/rasgos_practica_reflexiva.png";
import Habilidades from "../imagenes/habilidades.jpeg";

export default function Descubre() {
  return (
    <>
      <Titulo titulo="Descubre" />
      {/**Etiqueta separadora de estilos */}
      <div className="desc">
        <section>
          <div className="container">
            {/**Primer renglon de autoevaluación docente */}
            <div className="row">
              <div className="col-xl-12">
                <h3 className="title1">Autoevaluación Docente</h3>
                <p className="texto">
                  El proceso de autoevaluación es una parte fundamental de la
                  educación en nuestros días; esto también incluye al
                  profesorado universitario que necesita capacitarse
                  constantemente tanto en su profesión inicial (ingeniería o
                  licenciatura) como en su desarrollo docente, abarcando las
                  nuevas herramientas tecnológicas para que el proceso de
                  enseñanza aprendizaje sea funcional, sistemático, continuo,
                  integral y con calidad.
                </p>
                <br />
                <br />
                <center>
                  <h5 className="title3">
                    Con esta herramienta, el docente podrá reflexionar en su
                    práctica diaria para gestionar su propio conocimiento y
                    mejorar sus procesos de enseñanza, con lo que contribuirá de
                    manera significativa a la formación de estudiantes
                    competentes, éticos y comprometidos con la sociedad.
                  </h5>
                </center>
              </div>
            </div>
            {/**Sustento teórico de haed */}
            <div className="row">
              <br />
              <div className="col-xl-12">
                <h3 className="title1">Sustento teórico de HAED</h3>
                <p className="texto">
                  El diseño del instrumento de autoevaluación docente se
                  fundamenta en una investigación hecha por los cuerpos docentes
                  "TIC Educativa" y "Calidad y Competitividad", la cual está
                  basada al mismo tiempo en las propuestas de la Pirámide de
                  Miller, los Rasgos de una Práctica Reflexiva de Perrenoud y
                  las Habilidades Informáticas de Greg Thompson.
                </p>
                <br />
              </div>
            </div>
            {/**Piramide de Miller */}
            <div className="row">
              <div className="col-md-6">
                <div className="blog_post">
                  <img
                    className="img-teoria"
                    src={Miller}
                    alt="Piramide de Miller"
                  />
                  <div className="blog_details">
                    <a href="#">
                      <h4>Pirámide de Miller</h4>
                    </a>
                    <p className="texto">
                      Si se habla de una evaluación por competencias, significa
                      que el docente puede incorporar nuevos métodos de
                      evaluación, (López Pastor, 2014), menciona la importancia
                      que ahora tienen una evaluación por competencias que se
                      orienta al aprendizaje, en la participación del alumno,
                      dirigida a situaciones de naturaleza auténtica, cada vez
                      más cercanas a la vida real. La visión por competencias se
                      ve enriquecida por la propuesta que desarrolló George A.
                      Miller (Miller, 1990), mejor conocida como la Pirámide de
                      Miller. Esta propuesta se compone de cuatro niveles, en la
                      base se señala el saber, en el segundo nivel el saber
                      hacer, en el tercero la demostración de lo que es capaz de
                      hacer y la punta incluye la acción (hace).
                    </p>
                    <a
                      className="button button-blog"
                      target="_blank"
                      href="https://www.youtube.com/watch?v=iOAFWLm7tPg&amp;ab_channel=Mr99mx"
                    >
                      Ver más
                    </a>
                  </div>
                </div>
              </div>
              {/**Dimensiones de la autoevaluacion */}
              <div className="col-md-6">
                <div className="blog_post">
                  <img
                    className="img-teoria"
                    src={Dimensiones}
                    alt="Dimensiones para la autoevaluación"
                  />
                  <div className="blog_details">
                    <a href="#">
                      <h4>Dimensiones para la autoevaluación</h4>
                    </a>
                    <p className="texto">
                      Cecilia Fierro en su libro “Transformando la Práctica
                      Docente, Una propuesta basada en la investigación-acción”
                      (Cecilia Fierro, 2008), considera seis dimensiones
                      fundamentales para la autoevaluación: Personal,
                      Institucional, Interpersonal, Social, Didáctica, Valoral.
                    </p>
                    <a
                      className="button button-blog"
                      target="_blank"
                      href="https://www.youtube.com/watch?v=iOAFWLm7tPg&amp;ab_channel=Mr99mx"
                    >
                      Ver más
                    </a>
                  </div>
                </div>
              </div>

              {/**Rasgos de una práctica reflexiva */}
              <div className="col-md-6">
                <div className="blog_post">
                  <img
                    className="img-teoria"
                    src={Rasgos}
                    alt="Rasgos de una práctica reflexiva"
                  />
                  <div className="blog_details">
                    <a href="#">
                      <h4>Rasgos de una práctica reflexiva</h4>
                    </a>
                    <p className="texto">
                      Perrenoud se enfoca en preguntas sobre las acciones
                      tomadas dentro del aula, integrando al docente como ser
                      humano, el dominio de su profesión, la didáctica y su
                      interacción con los estudiantes. Para reconocer, estudiar
                      y analizar los hechos de manera libre, se propone realizar
                      una observación no estructurada mediante una reflexión
                      sobre los rasgos de una práctica reflexiva y para ello se
                      tomó como base la propuesta de (Perrenoud, 1998).
                    </p>
                    <a
                      className="button button-blog"
                      target="_blank"
                      href="https://www.youtube.com/watch?v=iOAFWLm7tPg&amp;ab_channel=Mr99mx"
                    >
                      Ver más
                    </a>
                  </div>
                </div>
              </div>
              {/**Habilidades tecnológicas */}
              <div className="col-md-6">
                <div className="blog_post">
                  <img
                    className="img-teoria"
                    src={Habilidades}
                    alt="Habilidades Tecnológicas"
                  />
                  <div className="blog_details">
                    <a href="#">
                      <h4>Habilidades Tecnológicas de Greg Thompson</h4>
                    </a>
                    <p className="texto">
                      Para realizar una evaluación integral es de vital
                      importancia considerar también aspectos tecnológicos, para
                      ello, Greg Thompson menciona algunos elementos
                      indispensables que el docente debe incorporar y enseñar a
                      sus discentes.
                    </p>
                    <a
                      className="button button-blog"
                      target="_blank"
                      href="https://www.youtube.com/watch?v=iOAFWLm7tPg&amp;ab_channel=Mr99mx"
                    >
                      Ver más
                    </a>
                  </div>
                </div>
              </div>

              {/**Tabla */}
              <div className="row">
                <div className="col-xl-12">
                  <h3 className="title1">Resumen</h3>
                  <p className="texto">
                    Las propuestas de la Pirámide de Miller, los Rasgos de una
                    Práctica Reflexiva de Perrenoud y las Habilidades
                    Informáticas de Greg Thompson se resumen en la siguiente
                    tabla:
                  </p>
                  <br />
                </div>
                <div className="tabla-responsiva">
                  <table striped bordered hover>
                    <thead className="cabecera-tabla">
                      <tr>
                        <th>Autor</th>
                        <th>Propuesta</th>
                        <th>Conceptos</th>
                        <th>Impacto del docente</th>
                      </tr>
                    </thead>
                    <tbody className="tbody">
                      <tr>
                        <th>Miller, G. (1990).</th>
                        <td>Pirámide de Miller</td>
                        <td>
                          HACER (incluyendo el saber ser y saber estar)
                          <br />
                          MOSTRAR CÓMO
                          <br />
                          SABER CÓMO
                          <br />
                          SABER
                          <br />
                        </td>
                        <td>
                          1. Actuación real en un contexto profesional.
                          <br />
                          2. Demostrar habilidades similares a su contexto.
                          <br />
                          3. Usar los saberes teóricos en la práctica e
                          involucrar al estudiante.
                          <br />
                          4. Conocimientos teóricos del profesionista.
                        </td>
                      </tr>
                      <tr>
                        <th>Fierro, C. (2008).</th>
                        <td>Dimensiones para la autoevaluación</td>
                        <td>
                          La relación pedagógica abarca seis dimensiones
                          particulares: personal, institucional, interpersonal,
                          social, didáctica y valoral, lo que sintetiza la
                          práctica educativa de cada maestro.
                        </td>
                        <td>
                          1. Personal: Se analiza qué lleva al individuo al
                          camino de la cátedra y qué lo mantiene ahí.
                          <br />
                          2. Institucional: relación con su institución.
                          <br />
                          3. Interpersonal: la relación entre personas que
                          participan en el proceso educativo.
                          <br />
                          4. Social: Aspecto histórico, político, cultural,
                          social y familiar.
                          <br />
                          5. Didáctica: El papel del maestro en orientar,
                          dirigir y guiar a través de la enseñanza.
                          <br />
                          6. Valoral: Ética, creencias, ideas, referentes
                          teóricos y valores personales, expresados en sus
                          preferencias conscientes e inconscientes.
                        </td>
                      </tr>

                      <tr>
                        <th>Perrenoud, P. (1998).</th>
                        <td>Rasgos de una práctica reflexiva</td>
                        <td>
                          La práctica reflexiva, dota al docente de elementos
                          para ser una mejor persona y de mayor conocimiento
                          para la toma de decisiones, ayuda a estar en constante
                          formación y no caer en el desánimo para seguir
                          creciendo.
                        </td>
                        <td>
                          1. Sentido de análisis y reflexión para la toma de
                          decisiones.
                          <br />
                          2. Aprender de los errores y mejorar.
                          <br />
                          3. Realizar actividades diferentes como docentes y
                          aprender de las experiencias.
                          <br />
                          4. Capacitarse constantemente.
                          <br />
                          5. Estudiar el entorno propio y el contexto de los
                          alumnos.
                        </td>
                      </tr>

                      <tr>
                        <th>Thompson, G. (2016).</th>
                        <td>Habilidades Tecnológicas de Greg Thompson.</td>
                        <td>
                          El docente debe conocer diferentes herramientas
                          tecnológicas con las que pueda interactuar y
                          enriquecer su clase.
                        </td>
                        <td>
                          Desarrollo de destrezas tecnológicas como una búsqueda
                          efectiva en la web, uso de redes sociales, correo
                          electrónico, plataformas para el desarrollo de
                          material didáctico, además del manejo de archivos en
                          la nube.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
