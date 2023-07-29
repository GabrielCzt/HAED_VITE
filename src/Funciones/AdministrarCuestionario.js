import Cookies from "universal-cookie";
import { decryptToken } from "./Cifrado";
const cookie = new Cookies();


//* Operaciones get
const getEvaluaciones = async () => {
  try {
    const token = decryptToken(cookie.get("token"))
    const url =
      "http://api-haed.danielreyesepitacio.cloud/api/admin/evaluaciones";
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const evaluaciones = await response.json();
      console.log(evaluaciones);
      return evaluaciones;
    } else {
      return error;
    }
  } catch (error) {
    console.log(error);
  }
};
export { getEvaluaciones };

const getEvaluacion = async (id) => {
  try {
    const token = decryptToken(cookie.get("token"));
    const url =
      "http://api-haed.danielreyesepitacio.cloud/api/evaluaciones/" +
      id +
      "/all";
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const evaluaciones = await response.json();
      console.log(evaluaciones);
      return evaluaciones;
    } else {
      return error;
    }
  } catch (error) {
    console.log(error);
  }
};
export { getEvaluacion };

const getPregunta = async (id) => {
  try {
    const token = decryptToken(cookie.get("token"));
    const url =
      "http://api-haed.danielreyesepitacio.cloud/api/admin/preguntas/" + id;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const pregunta = await response.json();
      console.log(pregunta);
      return pregunta;
    } else {
      return error;
    }
  } catch (error) {
    return error;
  }
};
export { getPregunta };

const getOpciones = async () => {
  try {
    const token = decryptToken(cookie.get("token"));
    const url = "http://api-haed.danielreyesepitacio.cloud/api/admin/opciones";

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const opciones = await response.json();
      console.log(opciones);
      return opciones;
    } else {
      return error;
    }
  } catch (error) {
    return error;
  }
};
export { getOpciones };

//* Operaciones put

const putEvaluacion = async (id, titulo, desc) => {
  try {
    const token = decryptToken(cookie.get("token"));
    const url =
      "http://api-haed.danielreyesepitacio.cloud/api/admin/evaluaciones/" + id;
    const params = {
      descripcion: desc,
      titulo: titulo,
    };
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    return response.status;
  } catch (error) {
    return error;
  }
};
export { putEvaluacion };

const putPregunta = async (id, evId, pregunta) => {
  try {
    const token = decryptToken(cookie.get("token"));
    const url =
      "http://api-haed.danielreyesepitacio.cloud/api/admin/preguntas/" + id;

    const params = {
      evaluacion_id: evId,
      pregunta: pregunta,
    };
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    return response.status;
  } catch (error) {
    return error;
  }
};
export { putPregunta };

const putOpcion = async (
  idpreg,
  opcion,
  nuevaOpcion,
  retroalimentacion_,
  links
) => {
  try {
    const token = decryptToken(cookie.get("token"));
    const url =
      "http://api-haed.danielreyesepitacio.cloud/api/admin/opciones/" +
      idpreg +
      "/" +
      opcion;
    console.log(url);

    console.log("Esto se está pasando :" + nuevaOpcion);

    const params = {};
    if (nuevaOpcion !== "") {
      params.opcion = nuevaOpcion;
    }
    if (retroalimentacion_ !== "") {
      params.feedback = retroalimentacion_;
    }
    if (links) {
      params.links = links;
    }
    console.log(params);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    console.log("respuesta de la funcion : " + response.status);
    return response.status;
  } catch (error) {
    return error;
  }
};
export { putOpcion };

//* Operaciones post

const postEvaluacion = async (_titulo, _descripcion) => {
  try {
    const token = decryptToken(cookie.get("token"));
    const url =
      "http://api-haed.danielreyesepitacio.cloud/api/admin/evaluaciones";
    const params = {
      titulo: _titulo,
      descripcion: _descripcion,
    };
    console.log(params);
    console.log(token)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    console.log(response.status);
    return response.status;
  } catch (error) {
    return error;
  }
};
export { postEvaluacion };

const postPregunta = async (id, pregunta) => {
  try {
    const token = decryptToken(cookie.get("token"));
    const url = "http://api-haed.danielreyesepitacio.cloud/api/admin/preguntas";

    const params = {
      evaluacion_id: id,
      pregunta: pregunta,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    return response.status;
  } catch (error) {
    return error;
  }
};
export { postPregunta };

const postOpcion = async (idPreg, opcion_, retroalimentacion_, links) => {
  try {
    const token = decryptToken(cookie.get("token"));
    const url = "http://api-haed.danielreyesepitacio.cloud/api/admin/opciones";
    console.log(token);
    const params = {
      pregunta_id: idPreg,
      opcion: opcion_,
      feedback: retroalimentacion_,
      links: links,
    };
    console.log(params);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    console.log("respuesta de la funcion : " + response.status);
    return response.status;
  } catch (error) {
    return error;
  }
};
export { postOpcion };

//*Operaciones delete

const deleteEvaluacion = async (id) => {
  try {
    const token = decryptToken(cookie.get("token"));
    const url =
      "http://api-haed.danielreyesepitacio.cloud/api/admin/evaluaciones/" + id;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  } catch (error) {
    return error;
  }
};

export { deleteEvaluacion };

const deletePregunta = async (id) => {
  try {
    const token = decryptToken(cookie.get("token"));
    const url =
      "http://api-haed.danielreyesepitacio.cloud/api/admin/preguntas/" + id;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  } catch (error) {
    return error;
  }
};
export { deletePregunta };

const deleteOpcion = async (idpreg, opcion) => {
  try {
    const token = decryptToken(cookie.get("token"));
    const url =
      "http://api-haed.danielreyesepitacio.cloud/api/admin/opciones/" +
      idpreg +
      "/" +
      opcion;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  } catch (error) {
    return error;
  }
};
export { deleteOpcion };
