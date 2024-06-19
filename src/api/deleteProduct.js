import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../FirebaseConfig";



async function deleteProducts(productId){
    await deleteDoc(doc(db, "productData", productId));
}

export default deleteProducts