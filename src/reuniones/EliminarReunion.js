import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { EliminarReunion } from './dataReunion/data.reunion';

const DeleteReunion = ({id, reload}) => {

  const [idEliminarReunion , setIdEliminarTipoReunion] = useState(id);

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async () => {
    //onDelete();
    
    await EliminarReunion(idEliminarReunion);
    reload();
    setShowModal(false);
  };

  return (
    <>
    <Button onClick={handleShowModal} variant='danger'><i className="bi bi-trash"  /></Button>

    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este elemento?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    
  )
}

export default DeleteReunion