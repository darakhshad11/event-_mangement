import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";



async function updateProducts(productData){
    const docRef = doc(db, "productData", productData.id);
    await updateDoc(docRef,productData);
}

export default updateProducts