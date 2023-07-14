import React, { useEffect, useState, useRef } from "react";
import Titulo from "../components/BarraDeTitulo";
import Cookies from "universal-cookie";
import BarChart from "../components/BarChart";
import "../estilos/Graficas.css"
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Chart } from "chart.js";

const cookie = new Cookies();
cookie.set("check", 1, { path: "/" });
function Graficas() {
  const componentRef = useRef(null);
  const generatePdf = async () => {
    // Captura una imagen del componente utilizando html2canvas
    const canvas = await html2canvas(componentRef.current, {
      scale: 2, // Ajustar la escala
      dpi: 300, // Ajustar la resolución en DPI
    });
    const imageData = canvas.toDataURL("image/png");

    // Calcula el tamaño de página necesario para mostrar la imagen completa en el PDF
    const pdfWidth = canvas.width;
    const pdfHeight = canvas.height;

    // Crea una nueva instancia de jsPDF con el tamaño de página personalizado
    const doc = new jsPDF({
      format: [pdfWidth, pdfHeight],
    });

    // Agrega la imagen al documento PDF
    doc.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Guarda el documento PDF como descarga
    doc.save("Graficas.pdf");
  };
  const downloadImage = async () => {
    const canvas = await html2canvas(componentRef.current, {
      scale: 2, // Ajustar la escala
      dpi: 300, // Ajustar la resolución en DPI
    });
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "Graficas.png";
    link.click();
  };



  // Obteniendo los nombres de los cuestionarios

  const cuestUrl = "http://api-haed.danielreyesepitacio.cloud/api/evaluaciones";

  const [name, setName] = useState();
  const [currentCuest, setCurrentCuest] = useState("");
  const fetchCuest = async () => {
    const response = await fetch(cuestUrl);
    const apiResponse = await response.json();
    setName(apiResponse);
    if (currentCuest === "") setCurrentCuest(apiResponse[0].titulo)
  };
  // Obteniendo el número total de evaluaciones contestadas
  const [estadisticas, setEstadisticas] = useState();
  const [estadisticasCuest, setEstadisticasCuest] = useState();
  const getEstadisticas = async () => {
    try {
      const token = cookie.get("token");
      const url = "http://api-haed.danielreyesepitacio.cloud/api/admin/estadisticas/evaluaciones-contestadas"
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const datos = await response.json();
        console.log(datos);
        setEstadisticas({
          labels: datos.evaluaciones.map((label) => label.titulo),
          datasets: [{
            label: "Cantidad de veces que se contestó",
            data: datos.evaluaciones.map((dato) => dato.total),
            backgroundColor: ["#042c2c", "#2c8f62", "#006d77"],
            borderWidth: 2,
            borderSkipped: false,
          }]

        });

      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  const getCuestEstadisticas = async () => {
    try {
      const token = cookie.get("token");
      const url = "http://api-haed.danielreyesepitacio.cloud/api/admin/estadisticas/respuestas/" + cookie.get("check")
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const datos = await response.json();
        console.log(datos);
        setEstadisticasCuest(datos);

      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  useEffect(() => {
    getEstadisticas();
    fetchCuest();
    getCuestEstadisticas();
    console.log(estadisticas);
  }, [])



  return (
    <>
      <Titulo titulo="Estadisticas HAED" />
      <div className="graficas" >
        <div className="container" >
          <Link to="../Opciones-administrador"><button id="volver">Regresar al perfil &nbsp;<FontAwesomeIcon icon={faCircleArrowLeft} /></button></Link>
          <div className="row">
            <div className="col-12">
              <h5>Número de evaluaciones contestadas</h5><br />
              <div className="col-sm-12 col-md-6">
                {estadisticas ? <BarChart datos={estadisticas} /> : "Cargando"}
              </div>
            </div>
          </div>

          <div className="row">
            <Dropdown id="menuOpciones">
              <Dropdown.Toggle id="head">Seleccione un cuestionario</Dropdown.Toggle>
              <Dropdown.Menu id="menu">
                {!name ? <Dropdown.ItemText id="opcion">Espere, cargando</Dropdown.ItemText> : name.map((num) => {
                  return (
                    <>
                      <Dropdown.Item id="opcion" onClick={() => {
                        cookie.set("check", num.id, { path: "/" });
                        fetchCuest();
                        getCuestEstadisticas();
                        setCurrentCuest(num.titulo);
                      }}>{num.titulo}</Dropdown.Item>
                    </>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
            <div ref={componentRef}>
              <h4>{currentCuest}</h4>

              {!estadisticasCuest ? "Espere, cargando" : estadisticasCuest.map((num, idx) => {
                const respuestas = {
                  labels: num.respuestas.map((ans) => ans.respuesta),
                  datasets: [{
                    label: "Número de respuestas",
                    data: num.respuestas.map((ans) => ans.cantidad),
                    backgroundColor: ["#042c2c", "#2c8f62", "#006d77"],
                    borderWidth: 2,
                    borderSkipped: false,
                  }]
                }
                return (
                  <>
                    <div className="row">
                      <div className="col-12">
                        <h6>{num.pregunta}</h6>
                      </div>
                      <div className="col-sm-12 col-md-6">
                        <BarChart id="respuestas" datos={respuestas} />
                      </div>
                    </div>
                    <div className="html2pdf__page-break"></div> {/* Salto de página */}
                  </>)
              })}
            </div>
          </div><br/>
          <button onClick={downloadImage} id="volver">Descargar como Imagen</button>&nbsp;
          <button onClick={generatePdf} id="volver">Generar PDF</button>
        </div>
        
      </div>
    </>
  );
}
export default Graficas;
