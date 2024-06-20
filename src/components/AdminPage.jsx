import { useEffect, useState } from "react";
import fetchUser from "../api/fetchUser";
import Navbar from "./Navebar"

import deleteUserByUsername from "../api/deleteUser";
import updateUserRoleByUsername from "../api/updateUserRole";

const UsersTable =  ({ users ,refresh }) => {
  const [role ,setSelectedRole] = useState('user')


  async function deleteUser (username){
    console.log('deleting username',username);
    deleteUserByUsername(username).then(()=>{
      alert(`${username} deleted successfully`)
      refresh();
    })
  async function updateUserRole (username ,newRole){
    console.log({username,newRole});
    updateUserRoleByUsername(username).then(()=>{
      alert(`${username} role updated successfully to ${newRole}`)
      refresh();
    }).catch((err)=>alert(err))
  }
    
    

  }
  return (
    <div>
      <div style={{ textAlign: "center", padding: "10px", fontSize: "24px", fontWeight: "bold" }}>
  <span style={{ backgroundColor: "#f0f0f0" , padding:"10px"}}>
    Welcome Admin
  </span>
</div>

      
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "40px" }}>
        <thead>
          <div style={{ display:"flex" }}>
            <div style={{marginLeft: "80px", fontWeight: "bold" , fontSize:"20px" , padding: "4px" }}>UserName</div>
            <div style={{marginLeft: "140px" ,fontWeight: "bold",fontSize:"20px" ,padding: "4px" }}>Role</div>
            <div style={{  marginLeft: "280px" , fontWeight: "bold" ,fontSize:"20px" ,padding: "4px"}}>Actions</div>
          </div>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}  style={{ display:"flex" }}>
              <div style={{marginLeft: "85px" , marginBottom :" 4px"}}> {user.userName}</div> 
              <div style={{marginLeft: "210px" ,marginBottom :" 4px" }}>{user.role}</div> 
              <div ><button style={{backgroundColor:"red" , padding :"4px", marginLeft: "250px", marginBottom :" 4px"}} onClick={()=>deleteUser(user.userName)}>Delete</button></div>
            <label style={{marginLeft: "50px" ,marginBottom :" 4px" }}>change role to</label>
            <select  value={role} onChange={(e)=>{
              console.log(e.target.value)
              setSelectedRole(e.target.value);
              updateUserRoleByUsername(user.userName ,e.target.value);
              alert(`${user.userName} role updated successfully to ${e.target.value}`)
              refresh();
              }} style={{marginBottom: "10px" , backgroundColor:"gray" , color: "white" , marginLeft:"2px"}}>
              <option>user</option>
              <option>vendor</option>
              <option>admin</option>
              </select>
           
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display:" flex"}}>
      <button style={{ backgroundColor:"gray", padding:" 4px", marginLeft :" 450px" , marginTop: " 50px"}}> Maintain Vendor</button>
      <button style={{ backgroundColor:"gray", padding:" 4px", marginLeft :" 350px" ,marginTop: " 50px"}}>Maintain user</button>
      </div>
    </div>
  );
};
function AdminPage (){
    const [data, setData] = useState([]);

async function getUser (){ 
    const savedData = await fetchUser();
    setData(savedData);
  };
  useEffect(()=>{
    getUser()
  },[])



    return <>
     <Navbar name="ADMIN " />
    {/* <h1>Admin page here</h1> */}
    <ul><UsersTable refresh={getUser} users={data}/></ul>
    </>
  }

  export default AdminPage