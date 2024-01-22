import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { agregarReunion } from "./dataReunion/data.reunion";



const AgregarReunion = ({reload, arrayTipoReunion}) => {

  

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const agregarReunionn = async (e) => {
    e.preventDefault();
    const idtiporeunion = e.target.formIdtiporeunion.value;
    const fecha = e.target.formFecha.value;
    const congregacion = e.target.formCongregacion.value;
    const asistencia = e.target.formAsistencia.value;
    const oficiante = e.target.formOficiante.value;
    const observacion = e.target.formObservacion.value;
    
    const fechaDate = new Date(fecha+"T00:00:00");
      const mes = fechaDate.toLocaleDateString('es-ES', { month: 'long' });

    
    const response = await agregarReunion(
      idtiporeunion,
      fecha,
      congregacion,
      asistencia,
      oficiante,
      observacion,
      mes
    );
    toast.success("Prueba");
    console.log('response: '+ response);
    if (response == "ok") {
      toast.success("Empresa ingresada correctamente!");
      reload();
    } else {
      toast.error("Error al ingresar empresa");
    }
    handleClose();
  };
  
  
  return (
    <Container>
      
      <Button variant="primary" onClick={handleShow}>
        Agregar Reunion
      </Button> 

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Reunion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={agregarReunionn}>
          <Form.Label>Tipo de Reunion</Form.Label>
          <Form.Control
                  as="select"
                  id="formIdtiporeunion"
                >
                  <option value="">Seleccione</option>
                {arrayTipoReunion!== undefined ? arrayTipoReunion.map((element)=>{
                  return(
                    <option key={element.id} value={element.id} >{element.nombre}</option>
                    )
                }):(<option value="">no hay datos</option>)}
                </Form.Control>

            <Form.Label>Fecha</Form.Label>
            <Form.Control type="date" id="formFecha" required />

            <Form.Label>Congregacion</Form.Label>
            <Form.Select
              aria-label="Default select example"
              id="formCongregacion"
              required
            >
              <option value="">Seleccione</option>
              <option value="Canto Grande">Canto Grande</option>
              <option value="Huanta">Huanta</option>
            </Form.Select>

            <Form.Label>Asistencia</Form.Label>
            <Form.Control
              type="number"
              placeholder="ingrese numero de miembros"
              id="formAsistencia"
              required
            />

            <Form.Label>Oficiante</Form.Label>
            <Form.Select
              aria-label="Default select example"
              id="formOficiante"
              required
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
            <Form.Control as="textarea" rows={3} id="formObservacion" />

            <hr />
            <Button type="submit">Guardar</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AgregarReunion;
