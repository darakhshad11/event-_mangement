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

{/* <div>
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "120px", padding: "2px", marginLeft: "450px" }}> User Mangement</div>
         
          <button
            style={{ marginBottom: "50px", padding: "5px", backgroundColor: "green", color: "white", borderRadius: "8px" ,marginLeft: "420px", marginTop:"100px" }}
            
          >
            Add
          </button>
        </div>
        <div style={{ marginTop: "5px", padding: "2px", marginLeft: "985px", backgroundColor: "gray", marginRight: "490px", borderRadius: "8px" }}>Update</div>
      </div> */}
