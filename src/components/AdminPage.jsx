import { useEffect, useState } from "react";
import fetchUser from "../api/fetchUser";
import Navbar from "./Navebar"
import { Button } from "bootstrap";
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
      {/* <h2>User Roles Table</h2> */}
      <table>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td >{user.userName}</td> {/* Assuming each user object has a 'name' property */}
              <td>{user.role}</td> {/* Assuming each user object has a 'role' property */}
              <td><button style={{backgroundColor:"red"}} onClick={()=>deleteUser(user.userName)}>Delete</button></td> {/* Assuming each user object has a 'role' property */}
            <label>change role to</label>
            <select  value={role} onChange={(e)=>{
              console.log(e.target.value)
              setSelectedRole(e.target.value);
              updateUserRoleByUsername(user.userName ,e.target.value);
              alert(`${user.userName} role updated successfully to ${e.target.value}`)
              refresh();
              }}>
              <option>user</option>
              <option>vendor</option>
              <option>admin</option>
              </select>
           
            </tr>
          ))}
        </tbody>
      </table>
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
     <Navbar name="ADMIN DASHBOARD" />
    {/* <h1>Admin page here</h1> */}
    <ul><UsersTable refresh={getUser} users={data}/></ul>
    </>
  }

  export default AdminPage