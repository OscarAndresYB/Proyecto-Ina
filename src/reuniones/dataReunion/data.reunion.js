import firebaseApp from "../../credenciales";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore"
import { datosTipoReunion } from "../../tipoReunion/dataTipoR/data.tipoReunion";



const baseDEDatos = getFirestore(firebaseApp)
const coleccion = 'reunion'


// export const datosReunion = async()=>{
//     try {
//         const datosE = await getDocs(collection(baseDEDatos, coleccion));
//         const datosP = [];
//         datosE.forEach(element => {
            
//             datosP.push({
//                 id: element.id,
//                 idtiporeunion: element.data().idtiporeunion,
//                 fecha: element.data().fecha,
//                 congregacion: element.data().congregacion,
//                 asistencia: element.data().asistencia,
//                 oficiante: element.data().oficiante,
//                 observacion: element.data().observacion
//             })
//         })
//         return datosP;
//     } catch (error) {
//         console.log(error);
//         return null;
//     }

// }

export const agregarReunion = async(idtiporeunion, fecha, congregacion, asistencia, oficiante, observacion,mes
    )=>{
    try {
        await addDoc(collection(baseDEDatos, coleccion),{
            idtiporeunion: idtiporeunion,
            fecha: fecha,
            mes:mes,
            congregacion: congregacion,
            asistencia: asistencia,
            oficiante: oficiante,
            observacion: observacion
        });
        console.log('agregar reunion correcto');
        return 'ok';
            
    } catch (error) {
        console.log('agregar reunion error');
        console.log(error); 
        return 'error';
    }
}

export const editarReunion = async(id, idtiporeunion, fecha, congregacion, asistencia, oficiante, observacion, mes)=>{
    try {
        const docRef = doc(baseDEDatos, coleccion, id)
        await setDoc(docRef, {
            idtiporeunion: idtiporeunion,
            fecha: fecha,
            mes:mes,
            congregacion: congregacion,
            asistencia: asistencia,
            oficiante: oficiante,
            observacion: observacion
        })
    } catch (error) {
        console.log(error);
    }
}

export const EliminarReunion = async(id)=>{
    try {
        await deleteDoc(doc(baseDEDatos, coleccion, id))
    } catch (error) {
        console.log(error);
    }
}

export const datosReunion = async () => {
    try {
      const querySnapshot = await getDocs(collection(baseDEDatos, "reunion"));
      const datosE = await datosTipoReunion();
      const datosP = [];
  
      querySnapshot.forEach((element) => {
        let Treuniones = '';
        datosE.forEach((emp) => {
            // console.log(emp.id, emp.nombre);
          if (emp.id == element.data().idtiporeunion) {
            Treuniones = emp.nombre;
            // console.log(Treuniones);
          }
          
        });
        
        datosP.push({
          id: element.id,
          idtiporeunion: element.data().idtiporeunion,
          fecha: element.data().fecha,
          congregacion: element.data().congregacion,
          asistencia: element.data().asistencia,
          oficiante: element.data().oficiante,
          observacion: element.data().observacion,
          nombrereunion: Treuniones == '' ? 'sin asignar' : Treuniones
          
        });
        
        
      });
      
      
  
      return datosP;
      
    } catch (error) {
      console.log(error);
      return null;
    }
  };

