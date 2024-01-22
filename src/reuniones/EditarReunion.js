import React,{useState} from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { getFirestore,doc, setDoc, deleteDoc } from 'firebase/firestore';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import firebaseApp from '../credenciales';
import EliminarReunion from './EliminarReunion';
import { datosReunion } from './dataReunion/data.reunion';
const firestore = getFirestore(firebaseApp);


export default function EditarReunion({servicio,onDelete}) {
    const [show, setShow] = useState(false);
    const handleClose =()=> setShow(false);
    const handleShow =()=> setShow(true);

    // Estado para gestionar los datos editables
    const [datosEditables, setDatosEditables]=useState({
        
    })
    
    const handleInputChange=(e)=>{
        const {name,value} =e.target;
        setDatosEditables({
            ...datosEditables,
            [name]:value,
        });
    };
    
    async function editServicio(e){
        e.preventDefault();
        
        const idtiporeunion = e.target.formIdTipoReunion.value;
        const fecha = e.target.formFecha.value;
        const congregacion = e.target.formCongregacion.value;
        const miembros = e.target.formMiembros.value;
        const oficiante = e.target.formOficiante.value;
        const observacion = e.target.formObservacion.value;
        
        const fechaDate = new Date(fecha+"T00:00:00");
        const mes = fechaDate.toLocaleDateString('es-ES', { month: 'long' });

        const documentoRef = doc(firestore,'reunion',datosEditables.id);

        await datosReunion(documentoRef,{
            
            idtiporeunion:idtiporeunion,
            fecha: fecha,
            // mes: mes,
            congregacion:congregacion,
            miembros: parseInt(miembros),
            asistencia: parseInt(miembros),
            oficiante: oficiante,
            observacion: observacion  
        })
        
        e.target.formIdTipoReunion.value="";
        e.target.formFecha.value="";
        e.target.formCongregacion.value="Ninguno"
        e.target.formMiembros.value="";
        e.target.formOficiante.value="Ninguno";
        e.target.formObservacion.value="";

        handleClose();
    }
    function clickEditar(){
        setDatosEditables({

            formIdTipoReunion:  servicio.formIdTipoReunion,
            fecha:              servicio.fecha,
            congregacion:       servicio.congregacion,
            miembros:           servicio.miembros,
            asistencia:         servicio.asistencia,
            oficiante:          servicio.oficiante,
            observacion:        servicio.observacion,
            // mes:                servicio.mes,
        })
        handleShow();
    }
    async function eliminarServicio(idServicioAEliminar){
      EliminarReunion(doc(firestore, "reunion", idServicioAEliminar));
  }

  return (
    <>
        <div className='d-flex justify-content-between' >
            <div className='d-flex justify-content-between align-items-start'  style={{cursor: 'pointer'}} onClick={clickEditar}>
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>{servicio.boleta} </p>
                  <p className='text-muted mb-0'><i className="bi bi-calendar3"> {servicio.fechaFormat}</i></p>
                </div>
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>{servicio.congregacion}</p>
                  <p className='d-flex text-muted mb-0'><i className="bi bi-people"> {servicio.asistencia}</i>  <i className="bi bi-currency-dollar"> {servicio.ofrenda}</i></p>
                </div>
            </div>
            <div className='d-flex justify-content-between align-items-end'>
              
              <div className='ms-3'>
                <EliminarReunion onDelete={()=>eliminarServicio(servicio.id)}/>
              </div>
            </div>
        </div>




        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Editar Reunion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={editServicio}>
              
              <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  id="formFecha"
                  name="fecha"
                  value={datosEditables.fecha}
                  onChange={handleInputChange}
                  required
                />
              <Form.Label>Congregacion</Form.Label>
              <Form.Select aria-label="Default select example" id="formCongregacion" name="congregacion" value={datosEditables.congregacion} onChange={handleInputChange} required >
                <option value="">Seleccione</option>
                <option value="Canto Grande">Canto Grande</option>
                <option value="Huanta">Huanta</option>
              </Form.Select>
              <Form.Label>Miembros(Adultos + Niños)</Form.Label>
              <Form.Control
                type="number"
                placeholder="ingrese numero de miembros"
                id="formMiembros"
                name="miembros"
                value={datosEditables.miembros}
                onChange={handleInputChange}
                required
                
              />
              <Form.Label>Oficiante</Form.Label>
              <Form.Select aria-label="Default select example" id="formOficiante" name="oficiante" value={datosEditables.oficiante} onChange={handleInputChange} required>
                <option value="">Seleccione</option>
                <option value="Dc. Gonzales Olvider">Dc. Gonzales Olvider</option>
                <option value="Ev. Enrique Jhonny">Ev. Enrique Jhonny</option>
                <option value="Evd. De la Cruz Jesus">Evd. De la Cruz Jesus</option>
                <option value="Pr. Apayco Edilberto">Pr. Apayco Edilberto</option>
                <option value="Pr. Freyre Felix">Pr. Freyre Felix</option>
                <option value="Pr. Gomez Miguel">Pr. Gomez Miguel</option>
                <option value="Pr. Gomez Pool">Pr. Gomez Pool</option>
                <option value="Pr. Gonzales Delfin">Pr. Gonzales Delfin</option>
                <option value="Pr. Gonzales William">Pr. Gonzales William</option>
                <option value="Pr. Pastor Valentin">Pr. Pastor Valentin</option>
              </Form.Select>
              
              <Form.Label>Observacion</Form.Label>
              <Form.Control as="textarea" rows={3} id="formObservacion" name="observacion" value={datosEditables.observacion} onChange={handleInputChange}/>
            {/* <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button> */}
          <hr/>
          <Button type='submit'>Guardar</Button>
          </Form>
            </Modal.Body>
        </Modal>
    {/* </Container> */}
    </>
  )
}


