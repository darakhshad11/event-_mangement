import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig"; // Make sure this path is correct

const updateMembership = async (userName, membership) => {
  try {
    const userRef = doc(db, 'users', userName);
    await updateDoc(userRef, {
      membership: membership
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating membership:", error);
    return { success: false, error };
  }
};

export default updateMembership;
