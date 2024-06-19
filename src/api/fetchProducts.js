import { db } from "../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

async function fetchProduct() {
  const querySnapshot = await getDocs(collection(db, "productData"));
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

export default fetchProduct;
