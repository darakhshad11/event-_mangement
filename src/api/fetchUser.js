import { db } from "../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

async function fetchUser() {
  const querySnapshot = await getDocs(collection(db, "users"));
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

export default fetchUser;