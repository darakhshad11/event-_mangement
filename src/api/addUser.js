import { setDoc, doc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

const addUser = async (userName, role) => {
  try {
    const data = { userName, role };
    await setDoc(doc(db, "users", userName), data);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default addUser;


