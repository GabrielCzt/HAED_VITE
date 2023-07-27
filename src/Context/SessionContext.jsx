import { createContext, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const SessionContext = createContext();
import { useNavigate } from "react-router-dom";
import { encrypt, encryptToken } from "../funciones/Cifrado";

const SessionProvider = ({ children }) => {

  const navigate = new useNavigate();
  const cookie = new Cookies();
  const [loading, setLoading] = useState("");
  {
    /**Almacenaremos los datos del formulario con estados */
  }
  const [_email, setEmail] = useState("");
  const [_password, setPassword] = useState("");

  /**Las siguientes funciones se encargan de 
    guardar todas las claves conforme las escribe el usuario */
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  /**Para almacenar errores de inicio */
  const [_error, setError] = useState("");
  //const imprimir = ()=>{console.log(_nombre); console.log(_password)};

  //Consultamos los datos en la api
  const handleSubmit = (event) => {
    event.preventDefault();

    //Variables de ingreso en un solo objeto
    const params = {
      email: _email,
      password: _password,
    };
    //Usamos axios y pasamos el link y los parametros
    axios
      .post("http://api-haed.danielreyesepitacio.cloud/api/auth/login", params)
      .then((response) => {
        setLoading(true);
        console.log(response.data);
        return response.data;
      })
      .then((response) => {
        if (response) {
          let respuesta = response.data;
          console.log(respuesta);
          cookie.set("token", encryptToken(response.token), { path: "/" });
          cookie.set("rol", encrypt(response.data.rol_id),{path:"/"});
          setTimeout(() => {
            if (respuesta.rol_id !== 3) {
              navigate("/Perfil");
            } else {
              navigate("/Opciones-administrador");
            }
            setLoading(false);
            setError("");
          }, 2000);
        } else {
          console.log("Contraseña incorrecta");
        }
      })

      .catch((error) => {
        if (error.response.status === 404) {
          console.log(error);
          setError("Usuario o contraseña incorrectos 😢");
        } else if (error.response.status === 406) {
          console.log(error);
          setError("Usuario o contraseña incorrectos 😢");
        } else {
          console.log(error);
          setError("Algo salió mal");
        }
      });
  };

  //! Código para el registro

  const [_nombres, set_Nombres] = useState("");
  const [_apellidos, set_Apellidos] = useState("");
  const [_matricula, set_Matricula] = useState("");
  const [_confirmation, set_Confirmation] = useState("");

  const changeNombres = (event) => {
    set_Nombres(event.target.value);
  };
  const changeApellidos = (event) => {
    set_Apellidos(event.target.value);
  };
  const changeMatricula = (event) => {
    set_Matricula(event.target.value);
  };
  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const changeConfirmation = (event) => {
    set_Confirmation(event.target.value);
  };

  const validarCadenas = (cadena) => {
    const regex = /^[a-zA-Z\sáéíóúñÁÉÍÓÚ]+$/;
    return regex.test(cadena);
  };

  const validarMatricula = (cadena) => {
    const regex = /^\d{4}$/;
    return regex.test(cadena);
  };
  const validarPassword = (cadena) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/;
    return regex.test(cadena);
  };
  const handleSign = (event) => {
    event.preventDefault();
    if (validarCadenas(_nombres)) {
      if (validarCadenas(_apellidos)) {
        if (validarMatricula(_matricula)) {
          if (validarPassword(_password)) {
            if (_password === _confirmation) {
              setLoading(true);
              const params = {
                nombres: _nombres,
                apellidos: _apellidos,
                matricula: _matricula.toUpperCase(),
                email: _email,
                password: _password,
                password_confirmation: _confirmation,
              };

              axios
                .post(
                  "http://api-haed.danielreyesepitacio.cloud/api/auth/register",
                  params
                )
                .then((response) => {
                  console.log(response.data);
                  const logParams = {
                    email: _email,
                    password: _password,
                  };
                  axios
                    .post(
                      "http://api-haed.danielreyesepitacio.cloud/api/auth/login",
                      logParams
                    )
                    .then((response) => {
                      //console.log(response.data)
                      return response.data;
                    })
                    .then((response) => {
                      let respuesta = response.data;
                      console.log(respuesta);
                      cookie.set("token", response.token, { path: "/" });
                      setTimeout(() => {
                        if (respuesta.rol_id !== 3) {
                          navigate("/Perfil");
                        } else {
                          navigate("/Opciones-administrador");
                        }
                        setLoading(false);
                        setError("");
                      }, 2000);
                    });
                })
                .catch((error) => {
                  if (error.response && error.response.status === 422) {
                    setLoading(false);
                    console.log(error);
                    setError("Ese usuario ya fue registrado");
                  } else {
                    setLoading(false);
                    console.log(error);
                    setError("Algo salió mal, vuelva a intentarlo");
                  }
                });
            } else {
              setLoading(false);
              setError("Las contraseñas no coinciden");
              document.getElementById("confirmation").focus();
            }
          } else {
            setLoading(false);
            setError(
              "Su contraseña debe contener al menos una mayuscula, una minuscula y un caracter especial"
            );
            document.getElementById("password").focus();
          }
        } else {
          setLoading(false);
          setError("Ingrese un ID valido");
          document.getElementById("matricula").focus();
        }
      } else {
        setLoading(false);
        setError(
          "Los apellidos no pueden tener números ni caracteres especiales"
        );
        document.getElementById("apellidos").focus();
      }
    } else {
      setLoading(false);
      setError("EL nombre no puede tener números ni caracteres especiales");
      document.getElementById("nombres").focus();
    }
  };

  const userData = {
    _email,
    _password,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
    _error,
    loading,
    handleSign,
    changeNombres,
    changeApellidos,
    changeEmail,
    changeMatricula,
    changePassword,
    changeConfirmation,
    _nombres,
    _apellidos,
    _matricula,
    _confirmation,
  };
  return (
    <SessionContext.Provider value={userData}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider };
export default SessionContext;
