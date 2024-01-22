import React,{useState,useEffect} from "react";
import Home from "./components/Home";
import Logueo from "./components/Logueo";
import Servicios from "./components/Servicios";

import firebaseApp from "./credenciales";
import {getAuth, onAuthStateChanged} from "firebase/auth";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Estadisticas from "./components/Estadisticas";
import Reuniones from "./reuniones/Reuniones";
import TipoReunion from "./tipoReunion/TipoReunion";
import Navbar from "./Nav-bar/navbar";
import HomeOriginal from "./components/HomeOriginal";

const auth = getAuth(firebaseApp);

function App() {

  const [usuarioGlobal, setUsuarioGlobal] = useState(null);
  onAuthStateChanged(auth,(usuarioFirebase)=>{
    if(usuarioFirebase){
      //codigo en caso de haya sesion iniciada
      setUsuarioGlobal(usuarioFirebase);
    }else{
      //codigo en caso de que no haya sesiuon iniciada
      setUsuarioGlobal(null);
    }
  })

  return (
    <Router>
      <Routes>
        <Route 
          exact path="/" 
          element={usuarioGlobal ? <HomeOriginal correoUsuario={usuarioGlobal.email} /> : <Logueo />} />
        <Route path="/login" element={<Logueo />} />
        <Route path="/home" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/reuniones" element={<Reuniones />} />
        <Route path="/tiporeunion" element={<TipoReunion />} />
        
      </Routes>
    </Router>

  
  );
}

export default App;
