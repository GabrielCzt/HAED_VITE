import React, { useEffect } from "react";
import "../estilos/Pages.css";
import "../estilos/Usuarios.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import fetchData from "../funciones/ObtenerInformación";
import Swal from "sweetalert2";
import Titulo from "../components/BarraDeTitulo";
import MenuAdmin from "../components/MenuAdmin";
import Cargando from "../components/Cargando";
import { decryptToken } from "../funciones/Cifrado";

const cookie = new Cookies();

function Usuarios() {
  const navigate = new useNavigate();
  const [info, setInfo] = useState(null);


  // ^ Obtenemos la lista completa de usuarios ==================================================
  const getUsers = async () => {
    try {
      //~ Desencriptamos el token ================================================================
      const token = decryptToken(cookie.get("token"));
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

  //^Función para eliminar a un usuario de la lista ======================================================
  const deleteUser = async (identificador) => {
    //~Debemos asegurarnos que el usuario realmente quiere eliminar un elemento===========================
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
          const token = decryptToken(cookie.get("token"));
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
          // ~Realizamos la solicitud a la api =======================================================
          fetch(url, options).then((response) => {
            if (response.ok) {
              window.location.reload();
            } else {
              Swal.fire({
                text: "Algo salió mal",
                icon: "error",
                showCloseButton: true,
              });
            }
          });
        } catch (error) {
          console.log(error);
        }
        getUsers();
      }
    });
  };

  //^Comprobación de permisos para la página ==========================================================
  useEffect(() => {
    console.log(cookie.get("token"));
    const fetchDataAsync = async () => {
      const data = await fetchData();
      console.log(data);
      if (data.rol_id !== 3) {
        navigate("../Perfil");
      }
    };
    fetchDataAsync();
    getUsers();
  }, []);
  return (
    <>
      <Titulo titulo="Información de usuarios" />

      <div className="infoUsers">
        <div className="row">
          {/* Menú del administrador ===================================================================== */}
          <MenuAdmin /> 
          <div className="col">
            <div className="tableContainer ">

              {/* Validamos que los datos del usuario se carguen antes de mostrar la tabla =============== */}
              {!info ? (
                <Cargando />
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Nombres</th>
                      <th>Matricula</th>
                      <th>Rol</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!info ? (
                      <tr>
                        <td colSpan="5">Algo salió mal</td>
                      </tr>
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
                          <tr key={index}>
                            <td>
                              {num.nombres} {num.apellidos}
                            </td>
                            <td id="tdID">{num.matricula}</td>
                            <td>{rol}</td>
                            {/* Botones para las acciones que puede realizar a cada usuario ============= */}
                            <td>
                              <button
                                id="edit"
                                onClick={() => {
                                  navigate(`/Actualizar-usuario/${num.id}`);
                                }}
                              >
                                <FontAwesomeIcon icon={faPencil} />
                              </button>
                            </td>
                            <td>
                              <button
                                id="delete"
                                onClick={() => {
                                  deleteUser(num.id);
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Usuarios;
