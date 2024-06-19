import { db } from "../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

async function addProduct(productData) {
  await setDoc(doc(db, "productData", productData.id),productData);
  return true
}


export default addProduct;