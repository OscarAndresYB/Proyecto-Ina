import { Button, Table } from "react-bootstrap";
import DeleteTipoReunion from "./EliminarTipoReunion";

const TablaTipoReunion = ({datos, reload, clickEditar})=> {

  
  return (
    <>
    
    <Table striped bordered hover>
      <thead>
        <tr>
          {/* <th>#</th> */}
          <th>Tipo de Reunion</th>
          <th>Estado</th>
          <th> </th>
          <th> </th>
          </tr>
      </thead>

      {/* poner condicionar de longitud de datos  si es igual a 0 mostyrar mensaje que no hay datos */}
      <tbody>
       {/* si hay datos mostrar el tBody */}
       {datos.length === 0 ? (
            <tr>
              <td colSpan="6">No hay nada para mostrar</td>
            </tr>
          ) : (
datos.map((element)=>{
  return(
    <tr key={element.id}>
          {/* <td>{element.id}</td> */}
          <td>{element.nombre}</td>
          <td style={{textAlign:"center", paddingRight:"10px"}}>{
              element.estado ? 
                <span className="badge badge-success">Activo</span>
                :   
                <span className="badge badge-danger">No Activo</span> 
                }
            </td>
          {/* <td>{element.estado ? 'activo':'inactivo'}</td> */}
          <Button variant='warning' onClick={()=>clickEditar(element)} ><i className="fas fa-pen" /></Button>
          {/* <td><EditEmpresa empresa={element} reload={reload}/></td> */}
          <td><DeleteTipoReunion id={element.id} reload={reload}/></td>
        </tr>
  )
})
          )}
        
        
      </tbody>
    </Table>
    </>
  );
}

export default TablaTipoReunion;