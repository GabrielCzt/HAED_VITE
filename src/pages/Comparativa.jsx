import React,{useEffect, useState} from "react";
import Cookies from "universal-cookie";
import "../estilos/Comparativa.css"
import "../estilos/Pages.css"

const cookie = new Cookies();



function Intentos(){
    
    // funcion para obtener las retroalimentaciones seleccionadas
    const fetchRetro = async () => {
        let select = document.getElementById('leftRetro')
        let intento = select.value;
        console.log(intento)

            try {
                const token = cookie.get('token');          
                const url = 'http://api-haed.danielreyesepitacio.cloud/api/users/evaluaciones/respuestas/'  + intento
                const response = await fetch(url, {
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
                });
       
                if (response.ok) {
                  const jsonData = await response.json();
                  console.log(jsonData)
                  setRetro(jsonData)
     
                } else {
                  console.error('Error en la solicitud:', response.status);
                }
              } catch (error) {
                console.error('Error en la solicitud:', error);
              }
        

      };



    const [retro,setRetro] = useState("");
    const [data, setData]=useState(null);
      const [lastRetro, setLastRetro] = useState(null);

    
      useEffect(()=>{
        console.log("hola")

        // Obteniendo el listado de resultados y fechas
        const fetchData = async () => {
            try {
              const token = cookie.get('token');
              console.log(token)
              const url = "http://api-haed.danielreyesepitacio.cloud/api/users/intentos"
              const response = await fetch(url, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              });
      
                if (response.ok) {
                  const jsonData = await response.json();
                  console.log(jsonData)
                  setData(jsonData)
                  const numeroMayor = jsonData.reduce((max, elemento) => {
                    return Math.max(max, elemento.id);
                  }, -Infinity);
                  const lastUrl = 'http://api-haed.danielreyesepitacio.cloud/api/users/evaluaciones/respuestas/'  + numeroMayor
                  const lastResponse = await fetch(lastUrl, {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    }
                  });
                  if (lastResponse.ok) {
                    const lastJsonData = await lastResponse.json();
                    console.log(lastJsonData)
                    setLastRetro(lastJsonData)
       
                  } else {
                    console.error('Error en la solicitud:', lastResponse.status);
                  }

                }
                else {
                    console.log('Error en la solicitud:', response.status);
                }
            } catch (error) {
              console.log('Error en la solicitud:', error);
            }
          };
          fetchData();
      },[])

    return(
        <>
             {/**Barra de titulo */}
      <div className="barContains">
            <div className="bar">               
                <span className="display-3"><b>Comparar retroalimentaciones</b></span>                
            </div>
            </div>
            <div className="compara">
            <div className="container">
            <h1 className="display-6">Seleccione una fecha para ver sus retroalimentaciones</h1>
            <div className="row">
                {/* Primera columna */}
                <div className="col">
                    <div className="row selection">
                    <select name="fecha" id="leftRetro" onChange={fetchRetro}>
                        <option value="">Seleccione una fecha</option>
                          {!data ? (
                            <p>Algo salió mal</p>
                          ) : (
                            data.slice(0, -1).map((num, index) => {
                              return (
                                <>
                                  <option value={num.id}>{num.fecha}</option>
                                </>
                              );
                            })
                          )}
                      </select>
                    </div>
                    <div className="row">
                      <h5>{!retro?"" : retro.titulo}</h5>
                    {!retro ? <><p>Seleccione una fecha</p><br/></> : retro.preguntas.map((num, index) => {                                                                     
                        return (
                            <>
                                <li>{num.respuestas[0].feedback}</li>                        
                            </>
                        );
                })}
                    </div>
                </div>
                {/* segunda columna, intentar mostrar la ultima respuesta */}
                <div className="col">
                    <div className="row selection">                               
                        <h5>Retroalimentación más reciente: {!lastRetro ? "" : lastRetro.titulo}</h5>
                    </div>
                    <div className="row">
                    {!lastRetro ? <><p>Seleccione una fecha</p><br/></> : lastRetro.preguntas.map((num, index) => {                                                                     
                        return (
                            <>
                                    <li>{num.respuestas[0].feedback}</li>                        
                            </>
                        );
                })}
                    </div>
                </div>
            </div>
            </div>
            </div>
           

            
            
        </>
    )
}

export default Intentos