import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Button, Form } from "react-bootstrap";
import { datosReunion, editarReunion } from "./dataReunion/data.reunion";
import BuscarReunion from "./BuscarReunion";
import ListaReunion from "./ListarReunion";
import AgregarReunion from "./AgregarReunion";
import { Link } from "react-router-dom";
import { datosTipoReunion } from "../tipoReunion/dataTipoR/data.tipoReunion";
import Navbar from "../Nav-bar/navbar";
import Navbar2 from "../Nav-bar/navbar2";



const Reuniones = () => {
  const [divLista, setDivLista] = useState(true);
  const [divAgregar, setDivAgregar] = useState(false);
  const [divActualizar, setDivActualizar] = useState(false);

  const[dato, setDato]= useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const botonAtrasE = ()=>{
    setDivAgregar(false);
    setDivActualizar(false);
    setDivLista(true)
  }
  const botonAgregarE = ()=>{
    setDivAgregar(true);
    setDivActualizar(false);
    setDivLista(false)
  }
  const botonActualizarE = (reunion)=>{

    
    setDato(2);
    // console.log('reunion.idtiporeunion: ' + reunion.idtiporeunion);
    setDatosReunionU({

      id: reunion.id,
      idtiporeunion:reunion.idtiporeunion,
      fecha:reunion.fecha,
      congregacion:reunion.congregacion,
      asistencia:reunion.asistencia,
      oficiante:reunion.oficiante,
      observacion:reunion.observacion,
    });
    setDivAgregar(false);
    setDivActualizar(true);
    setDivLista(false)
  }

  const [datosReunionn, setDatosReunion] = useState([]);

  const [arrayTiposReunion, setArrayTiposReunion] = useState([]);
  
  

  const[ datosReunionU , setDatosReunionU] = useState({
    idtiporeunion: "", // Asegúrate de que esto sea un valor inicial válido
  fecha: "",
  congregacion: "",
  asistencia: "",
  oficiante: "",
  observacion: "",
  });
  
  const [searchText, setSearchText] = useState('');
  const handleSearch = (e) => { setSearchText(e.target.value) };
  const filteredData = datosReunionn.filter((reunion) => {
    // console.log('reunion.idtiporeunion: ' + reunion.idtiporeunion);
    return (reunion.fecha + reunion.congregacion + reunion.observacion + reunion.oficiante + reunion.fecha + reunion.nombrereunion).toLowerCase().includes(searchText.toLowerCase());
  });

  const obtenerReunion= async()=>{
    //spinner on
    setIsLoading(true);
    const reu = await datosReunion();
    const datos = [];
    reu.forEach((element)=>{
      datos.push({
        id: element.id,
        idtiporeunion: element.idtiporeunion,
        fecha: element.fecha,
        mes:element.mes,
        congregacion: element.congregacion,
        asistencia: element.asistencia,
        oficiante: element.oficiante,
        observacion: element.observacion,
        nombrereunion:element.nombrereunion        
      })
      
    });

    setDatosReunion(datos);

    
    setIsLoading(false);
    
  };

  const obtenerTiposDeReunion = async () => {
    try {
      const datos = [];
      const Treuniones = await datosTipoReunion();
  
      Treuniones.forEach((element) => {
        datos.push({
          id: element.id,
          nombre: element.nombre
          
        });
      });
      
      setArrayTiposReunion(datos);
      
      
      

    } catch (error) {
      // console.error('Error al obtener datos de tipo reunión:', error);
    }
  };
  
  
  
  
  
  async function fetchGeneral(){
    await obtenerTiposDeReunion();
    await obtenerReunion();
  };

  const handleInputChange=(e)=>{
    const {name, value} = e.target;
    setDatosReunionU({
        ...datosReunionU,
        [name]:value,
    });
};

async function editarReunionn(e){  
  e.preventDefault();
  const idtiporeunion = e.target.formIdtiporeunion.value;
  const fecha = e.target.formFecha.value;
  const congregacion = e.target.formCongregacion.value;
  const asistencia = e.target.formAsistencia.value;
  const oficiante = e.target.formOficiante.value;
  const observacion = e.target.formObservacion.value;
  
  const fechaDate = new Date(fecha+"T00:00:00");
  const mes = fechaDate.toLocaleDateString('es-ES', { month: 'long' });

  await editarReunion(datosReunionU.id,
    idtiporeunion,
    fecha,
    congregacion,
    asistencia,
    oficiante,
    observacion,
    mes
  );
  


  e.target.formIdtiporeunion.value="";
  e.target.formFecha.value="";
  e.target.formCongregacion.value="";
  e.target.formAsistencia.value="";
  e.target.formOficiante.value="";
  e.target.formObservacion.value="";
  
  
  fetchGeneral();
  botonAtrasE();
  
  

}


  
  useEffect(()=>{
    fetchGeneral();
  },[]);
  
  return (
    <>
      <Navbar/>
      <h1>Reunion</h1>
      <div style={{ margin: 30, display: divLista ? "block" : "none" }}>
      
        
        
        <AgregarReunion onClick={botonAgregarE} reload={fetchGeneral} arrayTipoReunion={arrayTiposReunion}/>

        
       
        
        <Link to="/">
          <Button
            style={{ float: "right", margin: 30 }}
            variant="outline-danger"
            type="button"
          >Regresar</Button>
        </Link>
        <hr></hr>
        <h1>Buscar reunion</h1>
        <BuscarReunion searchText={searchText} handleSearch={handleSearch} />
        {isLoading ? (
          <div
            style={{
              padding: "220px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spinner animation="border" variant="danger" />
          </div>
        ) : (
          
          <ListaReunion
            datos={filteredData}
            reload={fetchGeneral}
            clickEditar={botonActualizarE}
          />
        )}
      </div>
      <div style={{ margin: 30, display: divAgregar ? "block" : "none" }}>
        {/* <Button 
          style={{ float: "right", margin: 30 }}
          variant="outline-danger"
          type="button"
          onClick={botonAtrasE}
        >
          Atras
        </Button> */}
        
        {/* <AgregarReunion onClick={botonAgregarE} reload={fetchGeneral} arrayTipoReunion={arrayTiposReunion}/> */}
      </div>
      <div style={{ margin: 30, display: divActualizar ? "block" : "none" }}>
        <Button
          style={{ float: "right", margin: 30 }}
          variant="outline-danger"
          type="button"
          onClick={botonAtrasE}
        >
          atras
        </Button>
        <div>
          <h3>Actualizar</h3>
          <Form onSubmit={editarReunionn}>
            <Form.Label>Tipo de reunion</Form.Label>
            <Form.Select
              aria-label="Default select example"
              type="text"
              id="formIdtiporeunion"
              name="idtiporeunion"
              value={datosReunionU.idtiporeunion}
              onChange={handleInputChange}
            >
              <option value="">Seleccione</option>
                {arrayTiposReunion!== undefined ? arrayTiposReunion.map((element)=>{
                  return(
                    <option key={element.id} value={element.id} >{element.nombre}</option>
                    )
                }):(<option value="">no hay datos</option>)}
            </Form.Select>
            <Form.Label>Fecha</Form.Label>
            <Form.Control 
              type="date" 
              id="formFecha"
              name="fecha"
              value={datosReunionU.fecha}
              onChange={handleInputChange} />
            <Form.Label>Congregacion</Form.Label>
            <Form.Select
              aria-label="Default select example"
              type="text"
              id="formCongregacion"
              name="congregacion"
              value={datosReunionU.congregacion}
              onChange={handleInputChange}
            >
              <option value="">Seleccione</option>
              <option value="Canto Grande">Canto Grande</option>
              <option value="Huanta">Huanta</option>
            </Form.Select>
            <Form.Label>Assitencia</Form.Label>
            <Form.Control
              type="number"
              placeholder="ingrese numero de miembros"
              id="formAsistencia"
              name="asistencia"
              value={datosReunionU.asistencia}
              onChange={handleInputChange}
            />
            <Form.Label>Oficiante</Form.Label>
            <Form.Select
              aria-label="Default select example"
              id="formOficiante"
              name="oficiante"
              value={datosReunionU.oficiante}
              onChange={handleInputChange}
            >
              <option value="">Seleccione</option>
              <option value="Dc. Gonzales Olvider">Dc. Gonzales Olvider</option>
              <option value="Ev. Enrique Jhonny">Ev. Enrique Jhonny</option>
              <option value="Evd. De la Cruz Jesus">
                Evd. De la Cruz Jesus
              </option>
              <option value="Pr. Apayco Edilberto">Pr. Apayco Edilberto</option>
              <option value="Pr. Freyre Felix">Pr. Freyre Felix</option>
              <option value="Pr. Gomez Miguel">Pr. Gomez Miguel</option>
              <option value="Pr. Gomez Pool">Pr. Gomez Pool</option>
              <option value="Pr. Gonzales Delfin">Pr. Gonzales Delfin</option>
              <option value="Pr. Gonzales William">Pr. Gonzales William</option>
              <option value="Pr. Pastor Valentin">Pr. Pastor Valentin</option>
            </Form.Select>
            <Form.Label>Observacion</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              id="formObservacion"
              name="observacion"
              value={datosReunionU.observacion}
              onChange={handleInputChange} />

            <hr />
            <Button type="submit">Guardar</Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Reuniones;
