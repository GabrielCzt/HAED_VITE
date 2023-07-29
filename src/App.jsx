//IMPORTACIONES DE PAQUETES Y DEPENDENCIAS

import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import { Navigate } from "react-router-dom";

//IMPORTANCIONES DE LAS PÁGINAS Y COMPONENTES

import Header from "./components/Header";
import Navv from "./components/Nav";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Descubre from "./pages/Descubre";
import Menu from "./pages/MenuAutoevaluacion";
import Cuestionario from "./pages/Autoevaluacion";
import CanalYT_Start from "./pages/canalYoutube/CanalYoutube";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Sign from "./pages/SignIn";
import Perfil from "./pages/Perfil";
import Retroalimentacion from "./pages/Retroalimentacion";
import Intentos from "./pages/Comparativa";
import PerfilAdministrador from "./pages/PerfilAdministrador";
import Usuarios from "./pages/Usuarios";
import ActualizarUsuario from "./pages/ActualizarUsuario";
import MaterialDeApoyo from "./pages/MaterialDeApoyo";
import BusquedaYoutube from "./pages/canalYoutube/BusquedaYoutube";
import Graficas from "./pages/Graficas";
import MenuAdminCuest from "./pages/administrarCuestionario/MenuAdminCuestionario";
import SelectModifiCuestionario from "./pages/administrarCuestionario/SelectModifiCuestionario";
import ModificarCuestionario from "./pages/administrarCuestionario/ModificarCuestionario";
import ModificarPregunta from "./pages/administrarCuestionario/ModificarPregunta";
import CrearCuestionario from "./pages/administrarCuestionario/CrearCuestionario";
import CrearOpcion from "./pages/administrarCuestionario/CrearOpcion";
import ModificarOpcion from "./pages/administrarCuestionario/ModificarOpcion";
import Cookies from "universal-cookie";
import { decrypt } from "./funciones/Cifrado";
import NotFound from "./pages/Error404";
import ActualizarInformacion from "./pages/ActualizarInformación";

const cookie = new Cookies();
//Sirve para que al cargar una página diferente se dirija al usuario a la parte superior
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  if (!cookie.get("rol")) {
    cookie.set("rol", 0, { path: "/" });
  }

  const PrivateRoute = ({ component: Component }) => {
    let rol = decrypt(cookie.get("rol"));
    console.log(rol);
    return rol === 3 ? <Component /> : <Navigate to="/" />;
  };
  const LoggedteRoute = ({ component: Component }) => {
    
    return cookie.get("token")? <Component /> : <Navigate to="/" />;
  };
  return (
    <>
      {/**Para que el sitio funcione correctamente, solo es necesario colocar la ruta encapsulada
       * y aclarando el componente, si es un componente estático debe quedar fuera de la etiqueta Routes
       */}
      <Router>
        <ScrollToTop />
        <SessionProvider>
          <Header />
          <Navv />
          <Routes>
            {/* Rutas publicas ======================================================================== */}
            <Route path="/" Component={Index} />
            <Route path="/Descubre" Component={Descubre} />
            <Route path="/CanalYoutube/:numero" Component={CanalYT_Start} />
            <Route path="/Contacto" Component={Contacto} />
            <Route path="/Busqueda/:palabra" Component={BusquedaYoutube} />

            {/* Rutas SOLO sin logueo ================================================================ */}
            <Route path="/Iniciar-sesion" Component={Login} />
            <Route path="/Registrarse" Component={Sign} />

            {/* Rutas que requieren logueo =========================================================== */}
            <Route 
            exact
            path="/Actualizar-información"
            Component={ActualizarInformacion}
            />
            <Route
              exact
              path="/Seleccionar-cuestionario"
              Component={Menu} 
            />
            <Route
              exact
              path="/Autoevaluacion"
              element={<LoggedteRoute component={Cuestionario} />}
            />
            
            <Route
              exact
              path="/Perfil"
              element={<LoggedteRoute component={Perfil} />}
            />
            <Route
              exact
              path="/Retroalimentacion"
              element={<LoggedteRoute component={Retroalimentacion} />}
            />
           <Route
              exact
              path="/Comparativa-de-retroalimentaciones"
              element={<LoggedteRoute component={Intentos} />}
            />
            <Route
              exact
              path="/Material-de-apoyo/:origen/:retro/:link"
              element={<LoggedteRoute component={MaterialDeApoyo} />}
            />
            

            {/* Rutas de administrador ============================================================== */}
            <Route
              exact
              path="/Opciones-administrador"
              element={<PrivateRoute component={PerfilAdministrador} />}
            />
            <Route
              exact
              path="/Informacion-de-usuarios"
              element={<PrivateRoute component={Usuarios} />}
            />
            <Route
              exact
              path="/Actualizar-usuario/:id"
              element={<PrivateRoute component={ActualizarUsuario} />}
            />

            <Route
              exact
              path="/Graficas"
              element={<PrivateRoute component={Graficas} />}
            />
            <Route
              exact
              path="/Administrar-cuestionarios"
              element={<PrivateRoute component={MenuAdminCuest} />}
            />
            <Route
              exact
              path="/Administrar-cuestionarios/Modificar-cuestionario"
              element={<PrivateRoute component={SelectModifiCuestionario} />}
            />
            <Route
              exact
              path="/Administrar-cuestionarios/Modificar-cuestionario/:id"
              element={<PrivateRoute component={ModificarCuestionario} />}
            />
            <Route
              exact
              path="/Administrar-cuestionarios/Modificar-cuestionario/:id/:idpreg"
              element={<PrivateRoute component={ModificarPregunta} />}
            />
            <Route
              exact
              path="/Administrar-cuestionarios/Modificar-cuestionario/Crear-opcion/:idpreg"
              element={<PrivateRoute component={CrearOpcion} />}
            />

            <Route
              exact
              path="/Crear-cuestionario"
              element={<PrivateRoute component={CrearCuestionario} />}
            />
            <Route
              exact
              path="/Administrar-cuestionarios/Modificar-cuestionario/Modificar-opcion/:idpreg/:idx"
              element={<PrivateRoute component={ModificarOpcion} />}
            />

            {/* Error 404 Not Found ================================================================ */}

            <Route path="*" Component={NotFound} />
          </Routes>
          <Footer />
        </SessionProvider>
      </Router>
    </>
  );
}

export default App;
