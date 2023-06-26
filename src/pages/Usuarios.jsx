import React, { useContext, useEffect } from "react";
import "../estilos/Pages.css";
import "../estilos/Usuarios.css";
import { useNavigate } from "react-router-dom";
import SessionContext from "../Context/SessionContext";
import Cookies from "universal-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import fetchData from "../Funciones/ObtenerInformación";
import Swal from "sweetalert2";
import Titulo from "../components/BarraDeTitulo";

const cookie = new Cookies();

function Usuarios() {
  const navigate = new useNavigate();
  const [info, setInfo] = useState([]);
  const [infoUser, setInfoUser] = useState([]);
  const [id, setId] = useState(null);
  const getUsers = async () => {
    try {
      const token = cookie.get("token");
      const url = "http://api-haed.danielreyesepitacio.cloud/api/admin/users";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const usersData = await response.json();
        console.log(usersData);
        setInfo(usersData);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  //  Funcion para eliminar un usuario
  const deleteUser = async (identificador) => {
    Swal.fire({
      text: "Esta acción no es reversible. ¿Desea continuar?",
      icon: "warning",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
    }).then((continuar) => {
      if (continuar.value) {
        try {
          const token = cookie.get("token");
          console.log(token);
          const url =
            "http://api-haed.danielreyesepitacio.cloud/api/admin/users/" +
            identificador;
          const options = {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
          fetch(url, options).then((response) =>{
            if(response.ok){
              window.location.reload();
            }
            else{
              Swal.fire({
                text: "Algo salió mal",
                icon: "error",
                showCloseButton: true,
              })
            }
          } );
        } catch (error) {
          console.log(error);
        }
        getUsers();
        
      }
    });
  };
  useEffect(() => {
    console.log(cookie.get("token"));
    const fetchDataAsync = async () => {
      const data = await fetchData();
      console.log(data);
      setInfoUser(data);
      if (data.rol_id !== 3) {
        navigate("../Perfil");
      }
    };
    fetchDataAsync();
    getUsers();
  }, []);
  return (
    <>
      <Titulo titulo="Información de usuarios"/>
      

      <div className="infoUsers">
        <div className="container">
          <div className="tableContainer col-12">
            <table>
              <tr>
                <th>Nombres</th>
                <th>Matricula</th>
                <th>Rol</th>
                <th></th>
                <th></th>
              </tr>
              {!info ? (
                <p>Algo salió mal</p>
              ) : (
                info.map((num, index) => {
                  let rol = "Sin definir";
                  if (num.rol_id == 1) {
                    rol = "Docente";
                  } else if (num.rol_id == 2) {
                    rol = "Investigador";
                  } else {
                    rol = "Administrador";
                  }
                  return (
                    <>
                      <tr>
                        <td>
                          {num.nombres} {num.apellidos}
                        </td>
                        <td>{num.matricula}</td>
                        <td>{rol}</td>
                        <td>
                          <FontAwesomeIcon onClick={()=>{
                             navigate(`/Actualizar-usuario/${num.id}`) 
                          }
                          } id="edit" icon={faPencil} />
                        </td>
                        <td>
                          <FontAwesomeIcon
                            id="delete"
                            onClick={() => {
                              deleteUser(num.id);
                            }}
                            icon={faTrash}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Usuarios;
