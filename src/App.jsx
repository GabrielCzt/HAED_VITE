//IMPORTACIONES DE PAQUETES Y DEPENDENCIAS

import React from 'react';
import {HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


//IMPORTANCIONES DE LAS PÁGINAS Y COMPONENTES

import Header from './components/Header'
import Navv from './components/Nav';
import Footer from './components/Footer';
import Index from './pages/Index';
import Descubre from './pages/Descubre';
import Menu from './pages/MenuAutoevaluacion';
import Cuestionario from './pages/Autoevaluacion';
import CanalYT_Start from './pages/canalYoutube/CanalYoutube';
import CanalYT2 from './pages/canalYoutube/CanalYoutube_2';
import CanalYT3 from './pages/canalYoutube/CanalYoutube_3';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Sign from './pages/SignIn';

//Sirve para que al cargar una página diferente se dirija al usuario a la parte superior
const ScrollToTop=()=>{
  const{pathname} = useLocation();
  useEffect(()=>{
    window.scrollTo(0,0);
  },[pathname]);
  return null;
}

function App() {
  return (
    <>
      {/**Para que el sitio funcione correctamente, solo es necesario colocar la ruta encapsulada
       * y aclarando el componente, si es un componente estático debe quedar fuera de la etiqueta Routes
       */}
      <Router>
        <ScrollToTop/>
        <Header />
        <Navv/>
        <Routes>
            <Route path="/" Component={Index}/>
            <Route path="/Descubre" Component={Descubre}/>
            <Route path="/Seleccionar-cuestionario" Component={Menu}/>
            <Route path="/Autoevaluacion" Component={Cuestionario}/>
            <Route path="/CanalYoutube" Component={CanalYT_Start}/>
            <Route path="/CanalYoutube/2" Component={CanalYT2}/>
            <Route path="/CanalYoutube/3" Component={CanalYT3}/>
            <Route path="/Contacto" Component={Contacto}/>
            <Route path="/Iniciar-sesion" Component={Login}/>
            <Route path="/Registrarse" Component={Sign}/>
        </Routes>
        <Footer/>
      </Router>
      
    </>
  );
}

export default App;
