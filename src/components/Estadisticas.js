import React,{useState,useEffect} from 'react'
import firebaseApp from '../credenciales';
import {getFirestore,collection, onSnapshot, query, where,orderBy} from "firebase/firestore";
import {Container,Button} from "react-bootstrap";

import LinesChartAsistenciasGeneral from './Chart/LinesChartAsistenciasGeneral';
import LinesChartOfrendasGeneral from './Chart/LinesChartOfrendasGeneral';
import BarsChartAsistenciasCongregacion from './Chart/BarsChartAsistenciasCongregacion';
import BarsChartOfrendasCongregacion from './Chart/BarsChartOfrendasCongregacion';

import { Link } from 'react-router-dom';
import Navbar from '../Nav-bar/navbar';
import BarsChartAsistenciasCongregacionReunion from './Chart/BarsChartAsistenciasCongregacionReunion';





const firestore = getFirestore(firebaseApp);


export default function Estadisticas() {
  const[arrayFechas, setArrayFechas] =useState([]);
  const[arrayAsistencias, setArrayAsistencias] =useState([]);
  const[arrayOfrendas, setArrayOfrendas]=useState([]);

  const[arrayFechasreug, setArrayFechasreug] =useState([]);
  const[arrayAsistenciasreug, setArrayAsistenciasreug] =useState([]);

  //asistencias por congregacion
  const[arrayAsistenciasCtoGrande, setArrayAsistenciasCtoGrande] =useState([]);
  const[arrayAsistenciasHuanta, setArrayAsistenciasHuanta] =useState([]);

  const[arrayFechasreu, setArrayFechasreu] =useState([]);
  const[arrayAsistenciasCtoGrandereu, setArrayAsistenciasCtoGrandereu] =useState([]);
  const[arrayAsistenciasHuantareu, setArrayAsistenciasHuantareu] =useState([]);

  //ofrendas por congregacion
  const[arrayOfrendasCtoGrande, setArrayOfrendasCtoGrande] =useState([]);
  const[arrayOfrendasHuanta, setArrayOfrendasHuanta] =useState([]);
  
  async function buscarServicios(){
    const q =query(collection(firestore,"servicios"), where("fecha","!=",""),orderBy('fecha'));
 const unsubscribe = onSnapshot(q, (querySnapshot)=>{
      const datos=[];
      querySnapshot.forEach((doc)=>{
        datos.push(
          {
            id:doc.id, 
            fecha: doc.data().fecha,
            congregacion:doc.data().congregacion,
            asistencia: doc.data().asistencia,
            ofrenda: doc.data().ofrenda,
            observacion: doc.data().observacion,
            mes:doc.data().mes,
          })
      })
       datosEstadisticosGenerales(datos);
      datosAsistenciasxCongregacion(datos);
    })
  }
  function datosEstadisticosGenerales(dataArray){
    const aFechas=[];
    const aAsistencias=[];
    const aOfrendas=[];
    const DatosPorMes={};
    dataArray.forEach((fila)=>{
        const mes = fila.mes;
        if (!DatosPorMes[mes]) {
          DatosPorMes[mes] = {
            mes: mes,
            ofrenda: 0,
            asistencia:0,
            oficiantes:0,
          };
        }
        DatosPorMes[mes].ofrenda += parseFloat(fila.ofrenda);
        DatosPorMes[mes].asistencia += parseInt(fila.asistencia);
        
    })
    const datosFinales = Object.values(DatosPorMes);
    datosFinales.forEach((fila)=>{
      aFechas.push(fila.mes);
      aOfrendas.push(fila.ofrenda);
      aAsistencias.push(fila.asistencia);
      
    })
    setArrayFechas(aFechas);
    setArrayAsistencias(aAsistencias);
    setArrayOfrendas(aOfrendas);
    
  }
   function datosAsistenciasxCongregacion(dataArray){
    const aFechas=[];
    const aAsistenciasCantoGrande=[];
    const aAsistenciasHuanta=[];
    const aOfrendasCantoGrande=[];
    const aOfrendasHuanta=[];
    const DatosPorMes={};
    dataArray.forEach((fila)=>{
        const mes = fila.mes;
        if (!DatosPorMes[mes]) {
          DatosPorMes[mes] = {
            mes: mes,
            actogrande: 0,
            ahuanta:0,
            octogrande:0,
            ohuanta:0
          };
        }
        
        DatosPorMes[mes].actogrande +=  fila.congregacion ==="Canto Grande" ? parseInt(fila.asistencia) : 0;
        DatosPorMes[mes].ahuanta += fila.congregacion ==="Huanta" ? parseInt(fila.asistencia) : 0;
        DatosPorMes[mes].octogrande+= fila.congregacion ==="Canto Grande" ? parseFloat(fila.ofrenda):0;
        DatosPorMes[mes].ohuanta+= fila.congregacion ==="Huanta"? parseFloat(fila.ofrenda):0;
    })
    const datosFinales = Object.values(DatosPorMes);
    datosFinales.forEach((fila)=>{
      aFechas.push(fila.mes);
      aAsistenciasCantoGrande.push(fila.actogrande);
      aAsistenciasHuanta.push(fila.ahuanta);
      aOfrendasCantoGrande.push(fila.octogrande);
      aOfrendasHuanta.push(fila.ohuanta);
    })

    setArrayFechas(aFechas);
    setArrayAsistenciasCtoGrande(aAsistenciasCantoGrande);
    setArrayAsistenciasHuanta(aAsistenciasHuanta);
    setArrayOfrendasCtoGrande(aOfrendasCantoGrande);
    setArrayOfrendasHuanta(aOfrendasHuanta);
    
  }
// creando grafico de Reunion 
async function buscarReunion(){
    
    const reu =query(collection(firestore,"reunion"), where("fecha","!=",""),orderBy('fecha'));

    const Reuniones = onSnapshot(reu, (querySnapshot)=>{
      const datosreu=[];
      querySnapshot.forEach((doc)=>{
        datosreu.push(
          {
            id:doc.id, 
            fecha: doc.data().fecha,
            congregacion:doc.data().congregacion,
            asistencia: doc.data().asistencia,
            idtiporeunion: doc.data().idtiporeunion,
            observacion: doc.data().observacion,
            mes:doc.data().mes,
          })
          
      })
      
      datosEstadisticosGeneralesReu(datosreu);
      datosAsistenciasxCongregacionReu(datosreu);
      
      
    })
  }
  function datosEstadisticosGeneralesReu(dataArray){
    const aFechas=[];
    const aAsistencias=[];
    const DatosPorMes={};
    dataArray.forEach((fila)=>{
        const mes = fila.mes;
        if (!DatosPorMes[mes]) {
          DatosPorMes[mes] = {
            mes: mes,
            asistencia:0,
          };
        }
        DatosPorMes[mes].asistencia += parseInt(fila.asistencia);
        
        
    })
    const datosFinales = Object.values(DatosPorMes);
    datosFinales.forEach((fila)=>{
      aFechas.push(fila.mes);
      aAsistencias.push(fila.asistencia);
      
    })
    setArrayFechasreug(aFechas);
    setArrayAsistenciasreug(aAsistencias);
    
    
  }
  function datosAsistenciasxCongregacionReu(dataArray){
    const aFechas=[];
    const aAsistenciasCantoGrande=[];
    const aAsistenciasHuanta=[];
    const DatosPorMes={};
    dataArray.forEach((fila)=>{
        const mes = fila.mes;
        if (!DatosPorMes[mes]) {
          DatosPorMes[mes] = {
            mes: mes,
            actogrande: 0,
            ahuanta:0,
          };
        }
        
        DatosPorMes[mes].actogrande +=  fila.congregacion ==="Canto Grande" ? parseInt(fila.asistencia) : 0;
        DatosPorMes[mes].ahuanta += fila.congregacion ==="Huanta" ? parseInt(fila.asistencia) : 0;
        
    })
    const datosFinales = Object.values(DatosPorMes);
    datosFinales.forEach((fila)=>{
      aFechas.push(fila.mes);
      aAsistenciasCantoGrande.push(fila.actogrande);
      aAsistenciasHuanta.push(fila.ahuanta);
    })

    setArrayFechasreu(aFechas);
    setArrayAsistenciasCtoGrandereu(aAsistenciasCantoGrande);
    setArrayAsistenciasHuantareu(aAsistenciasHuanta);

    
  }

  // terminando grafico reunion 

  useEffect(()=>{
    async function fetchServicios(){
      const servicios = await buscarServicios();
      const reunii = await buscarReunion();
    };
    fetchServicios();
  },[])

  


  return (
    <>
    <Navbar/>
    <Container style={{padding:"15px"}}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      
        
        <Link to="/">
          <Button>Inicio</Button>
        </Link>
      </div>
      
      <hr/>
      
      <hr/>
      {/* Inicio */}
        <div>
          <h1 className='bg-info text-center font-monospace fw-bold lh-base'>Asistencias Reunion</h1>
          <div>
            <p className='m-2'>Asistencia General Reuniones</p>
            <div 
              className='bg-light mx-auto px-2 border border-2 border-primary' 
              style={{with:"auto",height:"350px"}}
            >
              
              <LinesChartAsistenciasGeneral
                arrayFechas={arrayFechasreug}
                arrayAsistencias={arrayAsistenciasreug}
              />
              
            </div>
          </div>
          <div>
          <p className='m-2'>Asistencia reunion por Congregacion</p>
          <div 
            className='bg-light mx-auto px-2 border border-2 border-primary' 
            style={{with:"100%",height:"350px"}}
          >
            <BarsChartAsistenciasCongregacionReunion
              arrayFechas={arrayFechasreu}
              arrayAsistenciasCtoGrande={arrayAsistenciasCtoGrandereu}
              arrayAsistenciasHuanta={arrayAsistenciasHuantareu}
            />
          </div>
        </div>
          </div>
      {/* fin */}
      <hr/>
      <hr/>
      <div>
        <h1 className='bg-info text-center font-monospace fw-bold lh-base'>Asistencias</h1>
        <div>
          <p className='m-2'>Asistencia General</p>
          <div 
            className='bg-light mx-auto px-2 border border-2 border-primary' 
            style={{with:"auto",height:"350px"}}
          >
            <LinesChartAsistenciasGeneral
              arrayFechas={arrayFechas}
              arrayAsistencias={arrayAsistencias}
            />
          </div>
        </div>
        <hr className='mt-3 mb-2'/>
        <div>
          <p className='m-2'>Asistencia por Congregacion</p>
          <div 
            className='bg-light mx-auto px-2 border border-2 border-primary' 
            style={{with:"100%",height:"350px"}}
          >
            <BarsChartAsistenciasCongregacion
              arrayFechas={arrayFechas}
              arrayAsistenciasCtoGrande={arrayAsistenciasCtoGrande}
              arrayAsistenciasHuanta={arrayAsistenciasHuanta}
            />
          </div>
        </div>
        <hr className='mt-3 mb-2'/>
      </div>
      <div>
        <h1 className='bg-info text-center font-monospace fw-bold lh-base'>Ofrendas</h1>
        <div>
        <p className='m-2'>Ofrenda General</p>
        <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{with:"auto",height:"350px"}}>
            <LinesChartOfrendasGeneral
              arrayFechas={arrayFechasreu}
              arrayOfrendas={arrayOfrendas}
            />
          </div>
        </div>
        <hr className='mt-3 mb-2'/>
        <div>
          <p className='m-2'>Ofrendas por Congregacion</p>
          <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{with:"100%",height:"350px"}}>
            <BarsChartOfrendasCongregacion
              arrayFechas={arrayFechas}
              arrayOfrendasCtoGrande={arrayOfrendasCtoGrande}
              arrayOfrendasHuanta={arrayOfrendasHuanta}
            />
          </div>
        </div>
      </div>
      
    </Container>
    </>
  )
}
