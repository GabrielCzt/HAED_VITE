import React from "react";
import Titulo from "../../components/BarraDeTitulo";
import { postEvaluacion } from "../../funciones/AdministrarCuestionario";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../../estilos/AdministrarCuestionarios.css";
import {
  faChartColumn,
  faCircleUser,
  faFileInvoice,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import MenuAdmin from "../../components/MenuAdmin";
import { useEffect } from "react";
import fetchData from "../../funciones/ObtenerInformación";

function CrearCuestionario() {
  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData();
      if (data.rol_id !== 3) {
        navigate("/");
      }
    };
    fetchDataAsync();
  }, []);

  const navigate = new useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const handleChangeTitulo = (event) => {
    setTitulo(event.target.value);
  };
  const handleChangeDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const createCuestionario = async () => {
    if (titulo !== "" || descripcion !== "") {
      const response = await postEvaluacion(titulo, descripcion);
      if (response === 201) {
        Swal.fire({
          text: "Se ha creado el cuestionario, vamos a crear las preguntas",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "Ok",
        });
      } else {
        Swal.fire({
          text: "Algo salió mal, compruebe su conexión a internet o intente más tarde",
          icon: "error",
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: "Ok",
        });
      }
    } else {
      Swal.fire({
        text: "Debe colocar un titulo y una descripción",
        icon: "warning",
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: "Ok",
      });
    }
  };
  return (
    <>
      <Titulo titulo="Crear cuestionario" />
      <div className="crearCuest">
        <div className="row">
          <MenuAdmin />
          <div className="col crearContainer">
            <div className="container">
              <li className="lista">
                <div className="row">
                  <input
                    type="text"
                    onChange={handleChangeTitulo}
                    placeholder="Ingrese un titulo"
                  />
                </div>
                <br />
                <div className="row">
                  <input
                    type="text"
                    onChange={handleChangeDescripcion}
                    placeholder="Ingrese una descripción"
                  />
                </div>
                <br />
                <div className="row">
                  <button
                    id="success"
                    onClick={() => {
                      createCuestionario();
                    }}
                  >
                    Crear cuestionario
                  </button>
                </div>
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CrearCuestionario;
