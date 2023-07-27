import React from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/Error404.css"
function NotFound(){
    const navigate = new useNavigate()
    return(<>
    <div className="NotFound">
        <div className="container">
            <div className="row rowFound">
                <h1>No encontramos la página que busca</h1><br/>
                <button onClick={()=>{navigate("/")}}>Llévame al inicio</button>
            </div>
        </div>
    </div>
    </>)
}
export default NotFound