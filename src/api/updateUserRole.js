import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

async function updateUserRoleByUsername(username, newRole) {
  const userRef = doc(db, 'users', username);

  await updateDoc(userRef, { role: newRole })
    .then(() => {
      console.log("User role updated successfully");
    })
    .catch((error) => {
      console.error("Error updating user role: ", error);
      throw new Error("Error updating user role")
    });
}

export default updateUserRoleByUsername