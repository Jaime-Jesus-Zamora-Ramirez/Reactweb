import React, { useRef, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../Card/Card';


const URL_REGISTER = "http://localhost/pagina-web2/src/Components/LoginForm/registrar.php";

const enviarData = async (url, data) => {
  try {
    const resp = await fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await resp.json();
    console.log('Respuesta del servidor:', json);
    return json;
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    throw error;
  }
};

export default function LoginForm(props) {
  const [error, setError] = useState(null);
  const [esperar, setEspera] = useState(false);
  const refUsuario = useRef(null);
  const refClave = useRef(null);
  const refNombre = useRef(null);
  const refApellidos = useRef(null);
  const refIdTipoUsuario = useRef(null);

  const handleRegister = async (event) => {
    setEspera(true);
    event.preventDefault();
    try {
      const data = {
        usuario: refUsuario.current.value,
        clave: refClave.current.value,
        nombre: refNombre.current.value,
        apellidos: refApellidos.current.value,
        idTipoUsuario: refIdTipoUsuario.current.value
      };
      const respuestaJson = await enviarData(URL_REGISTER, data);
      console.log("respuesta del evento", respuestaJson);
      setError(respuestaJson.error);
      setEspera(false);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <Card>
      <h1 className="title">REGISTER</h1>
      <form onSubmit={handleRegister} disabled={esperar}>
        <div className="inputs_containter">
          <input type="text" placeholder='Usuario' ref={refUsuario} />
          <input type="password" placeholder='Contraseña' ref={refClave} />
          <input type="text" placeholder='Nombre' ref={refNombre} />
          <input type="text" placeholder='Apellidos' ref={refApellidos} />
          <input type="hidden" value="0" placeholder='ID Tipo Usuario' ref={refIdTipoUsuario} />
        </div>
        {
          error &&
          <div class="alert alert-danger d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            <div>
              {error}
            </div>
          </div>
        }
        <input type="submit" value="Register" className='login_button' />
      </form>

    </Card>
  );
}
