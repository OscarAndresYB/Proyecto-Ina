import React, { useState } from 'react'
import { Button, Container, Form, InputGroup, Stack,Table,Badge,ListGroup, ListGroupItem } from 'react-bootstrap'
import firebaseApp from '../credenciales';
import {getFirestore,doc, deleteDoc} from "firebase/firestore"
import { format } from 'date-fns';

import ButtonDelete from './ButtonDelete'
import EditarServicio from './EditarServicio';
const firestore = getFirestore(firebaseApp);

export default function ListarServicios({arrayServicios,correoUsuario, setArrayServicios}) {
 async function eliminarServicio(idServicioAEliminar){
        const nvoArrayServicios = arrayServicios.filter(
            (objetoServicio) =>objetoServicio.id !== idServicioAEliminar
        );
        await deleteDoc(doc(firestore, "servicios",idServicioAEliminar));
        setArrayServicios(nvoArrayServicios);
    }
  return (
    <>
    <ListGroup 
    style={{minWidth:'22rem'}} light
    >
    {arrayServicios.map((objetoServicio,index)=>{
        return(
            <ListGroupItem  key={index} 
            
            >


                <EditarServicio servicio={objetoServicio}/>
                
            </ListGroupItem>
        )
    })}
        
    </ListGroup>
    
    
    
    </>
  )
}

