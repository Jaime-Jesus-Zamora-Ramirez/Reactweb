import React, {useState} from "react"; //Estados

import LoginForm from "./Components/LoginForm/LoginForm"; //importamos el LoginForm
import PaginaPrincipal from './Components/PaginaPrincipal/PaginaPrincipal' //importamos la pagina principal

function App() {

  const [conectado, setConectado]= useState(false); //Primer estado
  const acceder =(estado) =>{ // se crea para cambiar entre true y flase
    setConectado(estado)
  }

  return (
    conectado ? <PaginaPrincipal/> : <LoginForm acceder={acceder}/> 
  //si conectado es verdadero carga pagina principal y si no carga el login

  
  );
}

export default App;
