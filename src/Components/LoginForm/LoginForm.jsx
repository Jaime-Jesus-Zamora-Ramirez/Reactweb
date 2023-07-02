import React, { useRef,useState } from 'react';//para guardar la informacion
import './LoginForm.css'; //estilos de css
import 'bootstrap/dist/css/bootstrap.min.css';//libreria de boostrap
import Card from '../Card/Card';//se importa el card jsx para que se muestre
import FacebookIcon from '@mui/icons-material/Facebook';//icono de facebook
import GoogleIcon from '@mui/icons-material/Google';//icono de google
import InstagramIcon from '@mui/icons-material/Instagram';//icono de instagram

const URL_LOGIN = "http://localhost/pagina-web2/src/Components/LoginForm/login.php";//envia la solicitud de inicio de sesion al servidor

const enviarData = async (url, data) => {//funcion asincrona para esperar 
  try {
    const resp = await fetch(url, {//funcion que obtiene la informacion del servidor
      method: 'post',//methodo post para enviar informacion
      body: JSON.stringify(data),//se convierten los datos a texto mediante un json
      headers: {//Determina que tipo de datos se manda al servidor.
        'Content-Type': 'application/json'//indica que tipo de contenido que se está enviando
      }
    });
    const json = await resp.json(); //convertimos la respuesta a json y es async
    console.log('Respuesta del servidor:', json);//comprobar si existe la conexion
    return json;//retornamos el json
  } catch (error) { //creamos un cath de error por si algo falla
    console.error("Error al enviar los datos:", error); 
    throw error; //error se lanzado nuevamente y se captura en un bloque
  }
};

export default function LoginForm(props) {//componente props
  const [error, setError] = useState(null); //estado para mostrar los errores de boostrap
  const [esperar, setEspera]= useState(false);//para bloquear el boton hasta que responda el servidor
  const refUsuario = useRef(null);//usuario
  const refClave = useRef(null);//password

  const handleLogin = async (event) => { // función asíncrona 
    setEspera(true);
    event.preventDefault();
    try { //capturar cualquier error que pueda ocurrir durante la ejecución
      const data = { //objeto que contiene las propiedades usuario y clave=password
        usuario: refUsuario.current.value,//usuario
        clave: refClave.current.value//clave=password
      };
      const respuestaJson = await enviarData(URL_LOGIN, data);
      console.log("respuesta del evento", respuestaJson);//verifica los valores que se enviarán en la solicitud.
      props.acceder(respuestaJson.conectado);//actualiza el estado de conexión en el component
      setError(respuestaJson.error)
      setEspera(false);
    } catch (error) {//creamos un cath de error por si algo falla
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <Card>
      <h1 className="title">LOGIN</h1>
      <form onSubmit={handleLogin /*establece el evento de envío*/} disable={esperar}> 
        <div className="inputs_containter">
          <input type="email" placeholder='Usuario' ref={refUsuario/*capturar la dirección de correo electrónico del usuario.*/ } /> 
          <input type="password" placeholder='Contraseña' ref={refClave/*capturar el password del usuario. */} />
        </div>
         {
             error &&
     <div class="alert alert-danger d-flex align-items-center" role="alert">
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
       </svg>
      <div>
       {error}
      </div>
      </div>
         }    
         
         <div className="button_container">
        <div className="button_wrapper">
          <input type="submit" value="Log In" className='login_button' />
        </div>
        <div className="button_wrapper">
          <button type="button" className='register_button'>Register</button>
        </div>
      </div>
      <p></p>
      </form>
      <div className="link_containter">
        <a href="https://www.facebook.com/donpompeyo/?locale=es_LA" className='small'>¿Has olvidado tu contraseña?</a>
      </div>
      <div className="icons">
       <FacebookIcon className='icon' />
        <GoogleIcon className='icon' />
        <InstagramIcon className='icon' />
      </div>
    </Card>
  );
}
