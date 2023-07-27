import React from "react";
import Titulo from "../../components/BarraDeTitulo";
import MenuAdmin from "../../components/MenuAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Swal from "sweetalert2";
import { postOpcion } from "../../funciones/AdministrarCuestionario";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import fetchData from "../../funciones/ObtenerInformación";

function CrearOpcion() {
  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData();
      if (data.rol_id !== 3) {
        navigate("/");
      }
    };
    fetchDataAsync();
  }, []);
  const params = useParams();
  const [links, setLinks] = useState([]);
  const [opcion, setOpcion] = useState("");
  const [retro,setRetro] = useState("");
  const handleChangeOpcion = (event)=>{
    setOpcion(event.target.value)
  }
  const handleChangeRetro = (event) =>{
    setRetro(event.target.value)
  }
  const crearOpcion = async()=>{
    const response = await postOpcion(params.idpreg,opcion,retro,links)
    console.log(response)
    if(response===201){
      Swal.fire({
        text: "Se ha añadido correctamente",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: "Ok",
      });
    }
    else{
      Swal.fire({
        text: "Algo salió mal, compruebe su conexión o intente más tarde",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "Ok",
      });
    }
  }
  const addLink = () => {
    Swal.fire({
      title: "Ingrese la URL",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: async (link) => {
        setLinks((prevLinks) => [...prevLinks, link]);
        console.log(links);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  return (
    <>
      <Titulo titulo="Crear opción" />
      <div className="createOpt">
        <div className="row">
          <MenuAdmin />
          <div className="col containerCreateOpt">
            <div className="container">
              <li className="element">
                <div className="row">
                  <h4>Ingrese el nombre de la opción</h4>
                </div>
                <div className="row">
                  <input onChange={handleChangeOpcion} type="text" required="true" />
                </div>
              </li>
              <li className="element">
                <div className="row">
                  <div className="col-12">
                    <h4>Ingrese la retroalimentación</h4>
                    <p>
                      Este es el texto que el docente recibirá si elige esta
                      respuesta
                    </p>
                  </div>
                  <div className="col-12">
                    <textarea  onChange={handleChangeRetro}required></textarea>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-10">
                    <h4>Links</h4>
                    <p>
                      Estos links son el material de apoyo que el docente podrá
                      visualizar en la retroalimentación
                    </p>
                  </div>
                  <div className="col">
                    <button
                      onClick={() => {
                        addLink();
                      }}
                      id="smallSuccess"
                    >
                      <FontAwesomeIcon icon={faPlusCircle} />
                    </button>
                  </div>
                </div>
                <div className="row">
                  {!links.map
                    ? ""
                    : links.map((link, idx) => {
                        return (
                          <>
                            <ul>
                              <li>{link}</li>
                            </ul>
                          </>
                        );
                      })}
                </div>
              </li>
              <li className="element">
                <button onClick={()=>{crearOpcion()}} id="success">
                  Agregar opción <FontAwesomeIcon icon={faPlusCircle} />
                </button>
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CrearOpcion;
