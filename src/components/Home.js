import React,{useState,useEffect} from 'react';
import firebaseApp from '../credenciales';
import { getAuth,signOut } from 'firebase/auth';
import {getFirestore, doc, getDoc,setDoc, collection, onSnapshot, query, where,orderBy} from "firebase/firestore";
import {Container,Button, Stack, InputGroup,Form} from "react-bootstrap";
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import AgregarServicio from './AgregarServicio';
import ListarServicios from './ListarServicios';
import Navbar from '../Nav-bar/navbar';
import Navbar2 from '../Nav-bar/navbar2';



const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);





export default function Home({correoUsuario}) {
  const[arrayServicios,setArrayServicios] =useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
 
  async function buscarServicios(){
    
    const q =query(collection(firestore,"servicios"), where("fecha","!=",""),orderBy('fecha','desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot)=>{
      const datos=[];
      querySnapshot.forEach((doc)=>{

        datos.push(
          {
            id:doc.id, 
            boleta:doc.data().boleta,
            fecha: doc.data().fecha,
            fechaFormat: format(new Date(doc.data().fecha+"T00:00:00"),'dd/MM/yyyy'),
            congregacion:doc.data().congregacion,
            miembros:doc.data().miembros,
            invitados:doc.data().invitados,
            asistencia: doc.data().asistencia,
            ofrenda: doc.data().ofrenda,
            oficiante: doc.data().oficiante,
            escuelaDominical: doc.data().escuelaDominical,
            observacion: doc.data().observacion,
            mes:doc.data().mes,
          })
      })
      setArrayServicios(datos);
      // datosEstadisticosGenerales(datos);
      // datosAsistenciasxCongregacion(datos);
    })
  }
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = arrayServicios  && arrayServicios.filter((record) =>
    
    record.congregacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.boleta.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.fechaFormat.toLowerCase().includes(searchTerm.toLowerCase())
      
  );

  useEffect(()=>{
    async function fetchServicios(){
      const servicios = await buscarServicios();
    };
    fetchServicios();
  },[])

  

  


  return (
    <>
    <Navbar/>
    <h1>Servicios</h1>
    <Container style={{padding:"15px"}}>
      <Stack>
      {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4 style={{ flex: 1 }}>Bienvenido, {correoUsuario}</h4>
        <Button variant="warning" style={{ alignSelf: 'flex-end' }} onClick={()=>signOut(auth)}>Cerrar Sesion</Button>
      </div> */}
      
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      
        
        <AgregarServicio 
          arrayServicios={arrayServicios} 
          setArrayServicios={setArrayServicios}
          correoUsuario={correoUsuario}
        />
        
      </div>
      <hr/>
      <h2>Buscar Servicios</h2>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><i className="bi bi-search"></i></InputGroup.Text>
        <Form.Control
          placeholder="Buscar..."
          aria-label="Search"
          aria-describedby="basic-addon1"
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>
      
      { arrayServicios ? 
      <ListarServicios
        arrayServicios={filteredData}
        // arrayServicios={arrayServicios} 
        setArrayServicios={setArrayServicios}
        correoUsuario={correoUsuario}
      /> :
        "No hay ningun registro"
      }
      
      
      
      </Stack>
    </Container>
    </>
  )
}
