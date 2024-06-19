import { db } from "../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

async function login(formdata) {
  const docRef = doc(db, "users", formdata.userName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data.password === formdata.password) {
      return data;
    } else {
      alert("Wrong Password");
    }
  } else {
    alert("Wrong Username");
  }
}

export default login;
