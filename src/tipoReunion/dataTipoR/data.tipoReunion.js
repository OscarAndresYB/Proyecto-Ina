
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore"
import firebaseApp from "../../credenciales";

const baseDEDatos = getFirestore(firebaseApp)
const coleccion = 'tiporeunion'


export const datosTipoReunion = async()=>{
    try {
        const datosE = await getDocs(collection(baseDEDatos, coleccion));
        const datosP = [];
        datosE.forEach(element => {
            
            datosP.push({
                id: element.id,
                nombre: element.data().nombre,
                estado: element.data().estado 
            })
        })
        
        return datosP;
        // return datosE;
    } catch (error) {
        console.log(error);
        return null;
    }

}

export const agregarTipoReunion = async(nombre)=>{
    try {
        await addDoc(collection(baseDEDatos, coleccion),{
            nombre: nombre,
            estado: true});

            return 'ok';
    } catch (error) {
        console.log(error); 
        return 'error';
    }
}

export const editarTipoReunion = async(id, nombre, estado)=>{
    try {
        const docRef = doc(baseDEDatos, coleccion, id)
        await setDoc(docRef, {
            nombre: nombre,
            estado: estado
        })
    } catch (error) {
        console.log(error);
    }
}

export const EliminarTipoReunion = async(id)=>{
    try {
        await deleteDoc(doc(baseDEDatos, coleccion, id))
    } catch (error) {
        console.log(error);
    }
}

