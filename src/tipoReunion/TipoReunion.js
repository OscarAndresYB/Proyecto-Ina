import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Button, Form } from "react-bootstrap";
import BuscarTipoReunion from "./BuscarTipoReunion";
import BotonTipoReunion from "./BotonTipoReunion";
import TablaTipoReunion from "./TablaTipoReunion";
import { datosTipoReunion } from "./dataTipoR/data.tipoReunion";
import { Link } from "react-router-dom";



const TipoReunion = () => {
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
  const botonActualizarE = (tiporeunion)=>{

    
    setDato(2);
    setDatosTipoReunionU({
      id: tiporeunion.id,
      nombre:tiporeunion.nombre,
      estado:tiporeunion.estado
    });
    setDivAgregar(false);
    setDivActualizar(true);
    setDivLista(false)
  }

  const [datosTipoReunionn, setDatosTipoReunionn] = useState([]);
  const[ datosTipoReunionU , setDatosTipoReunionU] = useState({});
  
  const [searchText, setSearchText] = useState('');
  const handleSearch = (e) => { setSearchText(e.target.value) };
  // const filteredData = datosTipoReunionn.filter((tiporeunion) => {
  //   return (tiporeunion.nombre).toLowerCase().includes(searchText.toLowerCase());
  // });

  const obtenerTipoReunion= async()=>{
    //spinner on
    setIsLoading(true);
    const tiporeu = await datosTipoReunion();
    const datos = [];
    tiporeu.forEach((element)=>{
      datos.push({
        id: element.id,
        nombre: element.nombre,
        estado: element.estado
      })
      
    });

    setDatosTipoReunionn(datos);

    //poner spinner off
    setIsLoading(false);
    
  };
  async function obtenerTipoReunion2(){

    await obtenerTipoReunion();
    
  };

  const handleInputChange=(e)=>{
    const {name, value} = e.target;
    setDatosTipoReunionU({
        ...datosTipoReunionU,
        [name]:value,
    });
};
const handleEstadoChange=(e)=>{
    const {name,checked} = e.target;
    setDatosTipoReunionU({
        ...datosTipoReunionU,
        [name]:checked,
    })

}
async function editarTipoReunion(e){
  e.preventDefault();
  const nombre = e.target.formNombre.value;
  const estado = e.target.formEstado.checked;
  

  await editarTipoReunion(datosTipoReunionU.id,
      nombre,
      estado
  );
  


  e.target.formNombre.value="";
  
  obtenerTipoReunion2();
  botonAtrasE();
  
  

}

  
  useEffect(()=>{
    obtenerTipoReunion2();
  },[]);
  
  return (
    <>
     <h1>Tipo de Reunion</h1>
     <div style={{ margin: 30,  display:divLista ? 'block' : 'none'}}>
        
        <Button
          variant= "outline-success" 
          style={{ float: "right", margin: 30}}
          type='button' 
          onClick={botonAgregarE}>Agregar Tipo de Reunion</Button>
          <hr></hr>
        <Link to="/reuniones">
          <Button
            display="flex"
            margin-bottom= "2rem"
          >Regresar</Button>
        </Link>

          
          <BuscarTipoReunion 
          searchText={searchText} handleSearch={handleSearch} 
          />
          {/* {isLoading ? (
          
          <div style={{padding: "220px", display: "flex", justifyContent:"center"}}>
          <Spinner animation="border" variant="danger" />
          </div>
        ) : (
          <TablaTipoReunion 
       datos={filteredData}
       reload={obtenerTipoReunion2}
       clickEditar={botonActualizarE}
       />
        )} */}
    </div>
    <div style={{ margin: 30, display:divAgregar ? 'block' : 'none' }}>
        
        <Button 
          style={{ float: "right", margin: 30}}
          variant="outline-danger"
          type='button'
          onClick={botonAtrasE}>Atras</Button>
          <BotonTipoReunion reload={obtenerTipoReunion2} />
          
      </div>
    <div style={{ margin: 30,  display:divActualizar ? 'block' : 'none'}}>
      <Button
          style={{ float: "right", margin: 30}}
          variant="outline-danger" 
          type='button'
          onClick={botonAtrasE}>atras</Button>
        <div>
        <h3>Actualizar</h3>
          <Form onSubmit={editarTipoReunion}>
              <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ingrese un nombre"
                  id="formNombre"
                  name="nombre"
                  value={datosTipoReunionU.nombre}
                  onChange={handleInputChange}
                  required
                />
              <Form.Check // prettier-ignore
                    type="switch"
                    id="formEstado"
                    name="estado"
                    label="Estado"
                    //value={checked}
                    //{datosProducto.estado ? checked : ''}
                    checked={datosTipoReunionU.estado}
                    // value={datosProducto.estado}
                    onChange={handleEstadoChange}
                />
          <hr/>
          <Button type='submit'>Guardar</Button>
          </Form>
        </div>
      </div>  

     </>
  );
}

export default TipoReunion;
