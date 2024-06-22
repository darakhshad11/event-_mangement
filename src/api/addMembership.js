import { setDoc, doc } from "firebase/firestore";
import { db } from "../FirebaseConfig";

const addMembership = async (userName, membershipDuration) => {
  try {
    // Update the user document with the new membership duration
    await setDoc(doc(db, "users", userName), { membership: membershipDuration }, { merge: true });
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default addMembership;
