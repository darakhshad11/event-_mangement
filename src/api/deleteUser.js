import { db } from "../FirebaseConfig";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

async function deleteUserByUsername(username) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('userName', '==', username));

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    await deleteDoc(doc(db, 'users', userDoc.id));
  } else {
    console.log('No user found with the given username.');
    throw new Error('No user found with the given username')
  }
}

export default deleteUserByUsername