import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

async function createUser(formData) {
  const data =await createUserWithEmailAndPassword(
    auth,
    formData.email,
    formData.password
  )
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;

      const data = {
        userName: formData.userName,
        email: user.email,
        password: formData.password,
        role: formData.role,
      };
      return data;
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  await setDoc(doc(db, "users", formData.userName), data);
  return true
}


export default createUser;