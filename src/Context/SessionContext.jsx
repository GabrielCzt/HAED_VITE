import { createContext, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const SessionContext = createContext();
import { useNavigate } from "react-router-dom";

const SessionProvider= ({children})=>{
    const [administrador,setAdministrador]=useState(0)
    const [token,setToken] = useState("soy un token")
    const navigate = new useNavigate()
    const cookie = new Cookies();
    const [loading, setLoading] = useState('')
    {/**Almacenaremos los datos del formulario con estados */ }
    const [_email, setEmail] = useState('');
    const [_password, setPassword] = useState('');

    /**Las siguientes funciones se encargan de 
    guardar todas las claves conforme las escribe el usuario */
    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }
    /**Para almacenar errores de inicio */
    const [_error, setError] = useState("");
    //const imprimir = ()=>{console.log(_nombre); console.log(_password)};

    //Consultamos los datos en la api
    const handleSubmit = (event) => {

        event.preventDefault();

        //Variables de ingreso en un solo objeto
        const params = {
            email: _email,
            password: _password
        }
        //Usamos axios y pasamos el link y los parametros
        axios.post('http://api-haed.danielreyesepitacio.cloud/api/auth/login', params)
            .then(response => {
                setLoading(true)
                console.log(response.data)
                return response.data;
            })
            .then(response => {
                if (response) {
                    let respuesta = response.data;
                    console.log(respuesta)
                    cookie.set('token', response.token, {path:"/"})
                    if(token=="")setToken(response.token)
                    setTimeout(() => {
                        if(respuesta.rol_id!==3){navigate("/Perfil")}
                        else{navigate("/Opciones-administrador")}
                         setLoading(false)                        
                        }, 2000)
                }
                else {
                    console.log("Contraseña incorrecta")
                }
            })

            .catch(error => {

                if (error.response && error.response.status === 404) {
                    console.log(error);
                    setError("Nombre o usuario incorrectos 😢");
                }
                else {
                    console.log(error)
                    setError("Algo salió mal");
                }

            })
    }
    // Código para el registro
    const [_nombres, set_Nombres] = useState("");
    const [_apellidos, set_Apellidos] = useState("");
    const [_matricula, set_Matricula] = useState("");
    const [_confirmation, set_Confirmation] = useState("");

    const changeNombres = (event) => {
        set_Nombres(event.target.value)
    }
    const changeApellidos = (event) => {
        set_Apellidos(event.target.value)
    }
    const changeMatricula = (event) => {
        set_Matricula(event.target.value)
    }
    const changeEmail = (event) => {
        setEmail(event.target.value)
    }
    const changePassword = (event) => {
        setPassword(event.target.value)
    }

    const changeConfirmation = (event) => {
        set_Confirmation(event.target.value)
    }

    const validarCadenas = (cadena) => {
        const regex = /^[a-zA-Z\sáéíóúñÁÉÍÓÚ]+$/;
        return regex.test(cadena);
    }

    const validarMatricula = (cadena) => {
        const regex = /^utp/i;
        return regex.test(cadena)
    }
    const handleSign = (event) => {
        event.preventDefault();
        if (validarCadenas(_nombres)) {
            if (validarCadenas(_apellidos)) {
                if (validarMatricula(_matricula)) {
                    if (_password === _confirmation) {
                        setLoading(true)
                        const params = {
                            "nombres": _nombres,
                            "apellidos": _apellidos,
                            "matricula": _matricula.toUpperCase(),
                            "email": _email,
                            "password": _password,
                            "password_confirmation": _confirmation
                        }

                        axios.post("http://api-haed.danielreyesepitacio.cloud/api/auth/register", params)
                            .then(response => {
                                console.log(response.data)
                                const logParams = {
                                    email: _email,
                                    password: _password
                                }
                                axios.post('http://api-haed.danielreyesepitacio.cloud/api/auth/login', logParams)
                                    .then(response => {
                                        //console.log(response.data)
                                        return response.data;
                                    })
                                    .then(response => {
                                        let respuesta = response.data;
                                        console.log(respuesta)
                                        setAdministrador(respuesta.rol_id)
                                        cookie.set('apellidos', respuesta.apellidos, { path: "/" })
                                        cookie.set('centro_trabajo', respuesta.centro_trabajo, { path: "/" })
                                        cookie.set('id', respuesta.id, { path: "/" })
                                        cookie.set('email', respuesta.email, { path: "/" })
                                        cookie.set('matricula', respuesta.matricula, { path: "/" })
                                        cookie.set('nombres', respuesta.nombres, { path: "/" })
                                        // cookie.set('token', response.token, {path:"/"})
                                        setToken(response.token)
                                        setTimeout(() => {
                                            if(respuesta.rol_id!==3){navigate("/Perfil")}
                                            else{navigate("/Opciones-administrador")}
                                            
                                             setLoading(false)                        
                                            }, 2000)
                                    })

                            })
                            .catch(error => {
                                if (error.response && error.response.status === 422) {
                                    console.log(error);
                                    setError("Ese usuario ya fue registrado");
                                }
                                else {
                                    console.log(error)
                                    setError("Algo salió mal, vuelva a intentarlo");
                                }
                            })
                    }
                    else {
                        setError("Las contraseñas no coinciden")
                        document.getElementById("confirmation").focus()
                    }
                }
                else {
                    setError("Ingrese una matricula valida")
                    document.getElementById("matricula").focus()
                }
            }
            else {
                setError("Los apellidos no pueden tener números ni caracteres especiales")
                document.getElementById('apellidos').focus()
            }
        }
        else {

            setError("EL nombre no puede tener números ni caracteres especiales")
            document.getElementById('nombres').focus()
        }
    }

    const userData={_email,_password,handleChangeEmail,handleChangePassword,handleSubmit,
        _error,loading,handleSign,changeNombres, changeApellidos,
        changeEmail,changeMatricula,changePassword,changeConfirmation,
    _nombres, _apellidos,_matricula,_confirmation}
    return <SessionContext.Provider value={userData}>{children}</SessionContext.Provider>
}

export {SessionProvider}
export default SessionContext;