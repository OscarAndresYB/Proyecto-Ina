import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { Button } from "react-bootstrap";
import firebaseApp from "../credenciales";
import Navbar from "../Nav-bar/navbar";
const auth = getAuth(firebaseApp);

const HomeOriginal =({correoUsuario})=>{
    return(
        <>
        <Navbar/>
        <br></br>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4 style={{ flex: 1 }}>Bienvenido, {correoUsuario}</h4>
        <Button variant="warning" style={{ alignSelf: 'flex-end' }} onClick={()=>signOut(auth)}>Cerrar Sesion</Button>
      </div>
      </>
    )
}

export default HomeOriginal;