import { Form, Button, FormGroup, InputGroup} from "react-bootstrap";
import React, { useState} from 'react'
import { toast } from 'react-toastify';
import { agregarTipoReunion } from "./dataTipoR/data.tipoReunion";


function BotonTipoReunion({reload}) {

  const [show, setShow] = useState(false);
    const handleClose =()=> setShow(false);
    const handleShow =()=> setShow(true);

    const agregarTipoReunionn =async(e)=>{
      // e.preventDefault();
      const nombre = e.target.formNombre.value;
      const response = await agregarTipoReunion(nombre);
if (response=='ok') {
  toast.success('Empresa ingresada correctamente!');
  reload();
}else{
  toast.error('Error al ingresar empresa');
}
      handleClose();
    };
  return (
    <>
        <div>
          <h2>Agregar Tipo de Reunion</h2>
          <Form 
          onSubmit={agregarTipoReunionn}
          >
            
              <FormGroup className="mb-3">
                <Form.Label>nombre</Form.Label>
                <InputGroup>
                <Form.Control
                type='text'
                  placeholder="Ingrese un nombre"
                  aria-label="Ingrese un nombre"
                  aria-describedby="basic-addon2"
                  id="formNombre"
                  required
                />
                 
                </InputGroup>
                
               </FormGroup>
          <hr/>
          <Button type='submit'>Guardar</Button>
          </Form>
    </div>
    </>
  );
}

export default BotonTipoReunion;