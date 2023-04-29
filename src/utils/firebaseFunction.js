import { firestore } from "../firebase.config"
import{doc,setDoc} from "firebase/firestore"

//Saving New Items
export const saveItems = async(data) =>{
    await setDoc(doc(firestore,'foodItems',`${Date.now}`),data,{merge:true,}) 


}