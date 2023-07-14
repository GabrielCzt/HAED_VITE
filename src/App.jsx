//IMPORTACIONES DE PAQUETES Y DEPENDENCIAS

import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";

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
import InfoPerfil from "./pages/InfoPerfil";
import Retroalimentacion from "./pages/Retroalimentacion";
import Intentos from "./pages/Comparativa";
import PerfilAdministrador from "./pages/PerfilAdministrador";
import Usuarios from "./pages/Usuarios";
import ActualizarUsuario from "./pages/ActualizarUsuario";
import MaterialDeApoyo from "./pages/MaterialDeApoyo";
import BusquedaYoutube from "./pages/canalYoutube/BusquedaYoutube";
import Graficas from "./pages/Graficas";

//Sirve para que al cargar una página diferente se dirija al usuario a la parte superior
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
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
            <Route path="/" Component={Index} />
            <Route path="/Descubre" Component={Descubre} />
            <Route path="/Seleccionar-cuestionario" Component={Menu} />
            <Route path="/Autoevaluacion" Component={Cuestionario} />
            <Route path="/CanalYoutube/:numero" Component={CanalYT_Start} />
            <Route path="/Contacto" Component={Contacto} />
            <Route path="/Iniciar-sesion" Component={Login} />
            <Route path="/Registrarse" Component={Sign} />
            <Route path="/Perfil" Component={Perfil} />
            <Route path="/Informacion-Perfil" Component={InfoPerfil} />
            <Route path="/Retroalimentacion" Component={Retroalimentacion} />
            <Route
              path="/Comparativa-de-retroalimentaciones"
              Component={Intentos}
            />
            <Route
              path="/Opciones-administrador"
              Component={PerfilAdministrador}
            />
            <Route path="/Informacion-de-usuarios" Component={Usuarios} />
            <Route
              path="/Actualizar-usuario/:id"
              Component={ActualizarUsuario}
            />
            <Route
              path="/Material-de-apoyo/:origen/:retro/:link"
              Component={MaterialDeApoyo}
            />
            <Route path="/Busqueda/:palabra" Component={BusquedaYoutube} />
            <Route path="/Graficas" Component={Graficas} />
          </Routes>
          <Footer />
        </SessionProvider>
      </Router>
    </>
  );
}

export default App;
