import { Button, ListGroup } from "react-bootstrap";
import DeleteReunion from "./EliminarReunion";


const ListaReunion = ({ datos, reload, clickEditar }) => {

  
  return (
    
    <ol className="list-group list-group-light ">
    {datos.map((element) => (
    <li key={element.id} className="list-group-item d-flex justify-content-between align-items-start">
      <div className="col-2">
        <div className="fw-bold">{element.nombrereunion}</div>
        <i className="bi bi-calendar3">{element.fecha}</i>
      </div>
      <div className="col-8">
        <div className="fw-bold">{element.oficiante}</div>
        <i className="bi bi-people">{element.asistencia}</i>
      </div>
      <div className="col-1">
        <div className="fw-bold"><Button variant="warning" 
                onClick={() => clickEditar(element)}
                
                >
                  <i className="bi bi-pencil" />
                </Button></div>
                {/* <DeleteReunion id={element.id} reload={reload} /> */}
      </div>
      <div className="col-1">
        <div className="fw-bold"><DeleteReunion id={element.id} reload={reload} /></div>
        
      </div>
      <span className="badge badge-primary rounded-pill">14</span>
    </li>
    ))}
    {/* <li className="list-group-item d-flex justify-content-between align-items-start ">
      <div className="ms-2 me-auto" >
        <div className="fw-bold">Subheading</div>
        Content for list item
      </div>
      <span className="badge badge-primary rounded-pill">14</span>
    </li>
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">Subheading</div>
        Content for list item
      </div>
      <span className="badge badge-primary rounded-pill">14</span>
    </li> */}
  </ol>
        
    // <>
    //   {datos.length === 0 ? (
    //     <p>No hay datos para mostrar</p>
    //   ) : (
    //     <ul>
    //       {datos.map((element) => (
            
    //         <ListGroup key={element.id}>
    //           <div>
                
    //             <ListGroup.Item variant="warning">
    //               <div className="row ">
    //                 <div className="col-2">
    //                   <p>{element.nombrereunion}</p>
    //                   <p><i className="bi bi-calendar3">{element.fecha}</i></p>
    //                 </div>
    //                 <div className="col-8">
    //                   <p>{element.oficiante}</p>
    //                   <p><i className="bi bi-people">{element.asistencia}</i></p>
    //                 </div>
    //                 <div className="col-2" >
    //                   <p><Button variant="warning" 
    //             onClick={() => clickEditar(element)}
                
    //             >
    //               Editar
    //               <i className="fas fa-pen" />
    //             </Button></p>
    //             <p>
    //             <DeleteReunion id={element.id} reload={reload} />
    //             </p>
    //                 </div>
    //               </div>
                  

                
    //             </ListGroup.Item>
    //           </div>
    //           <hr></hr>
    //         </ListGroup>
    //       ))}
    //     </ul>
    //   )}
    // </>
  );
}

export default ListaReunion;
