
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchUser from "../api/fetchUser";
import Navbar from "./Navbar";
import deleteUserByUsername from "../api/deleteUser";
import updateUserRoleByUsername from "../api/updateUserRole";
import addUser from "../api/addUser";
const UsersTable = ({ users, refresh, setIsModalOpen }) => {
  const [role, setSelectedRole] = useState('user');
  const navigate = useNavigate(); 
  
  async function deleteUser(username) {
    console.log('deleting username', username);
    deleteUserByUsername(username).then(() => {
      alert(`${username} deleted successfully`);
      refresh();
    });
  }

  async function updateUserRole(username, newRole) {
    console.log({ username, newRole });
    updateUserRoleByUsername(username, newRole).then(() => {
      alert(`${username} role updated successfully to ${newRole}`);
      refresh();
    }).catch((err) => alert(err));
  }

  return (
    <div>
      <div style={{ textAlign: "center", padding: "10px", fontSize: "24px", fontWeight: "bold" }}>
        <span style={{ backgroundColor: "#f0f0f0", padding: "10px" }}>
          Welcome Admin
        </span>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "40px" }}>
        <thead>
          <tr style={{ display: "flex" }}>
            <th style={{ marginLeft: "370px", fontWeight: "bold", fontSize: "20px", padding: "4px" }}>UserName</th>
            <th style={{ marginLeft: "140px", fontWeight: "bold", fontSize: "20px", padding: "4px" }}>Role</th>
            <th style={{ marginLeft: "140px", fontWeight: "bold", fontSize: "20px", padding: "4px" }}>Membership</th>
            <th style={{ marginLeft: "200px", fontWeight: "bold", fontSize: "20px", padding: "4px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} style={{ display: "flex" }}>
              <td style={{ marginLeft: "375px", marginBottom: "4px" }}>{user.userName}</td>
              <td style={{ marginLeft: "210px", marginBottom: "4px" }}>{user.role}</td>
              <td style={{ marginLeft: "210px", marginBottom: "4px" }}>{user.membership}</td>
              <td>
                <button
                  style={{ backgroundColor: "red", padding: "4px", marginLeft: "220px", marginBottom: "4px" , borderRadius:"8px"}}
                  onClick={() => deleteUser(user.userName)}
                >
                  Delete
                </button>
              </td>
              <td>
                <label style={{ marginLeft: "50px", marginBottom: "4px" }}>Change role to</label>
                <select
                  value={role}
                  onChange={(e) => {
                    const newRole = e.target.value;
                    console.log(newRole);
                    setSelectedRole(newRole);
                    updateUserRole(user.userName, newRole);
                  }}
                  style={{ marginBottom: "10px", backgroundColor: "gray", color: "white", marginLeft: "2px" }}
                >
                  <option value="user">user</option>
                  <option value="vendor">vendor</option>
                </select> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        style={{ backgroundColor: "green", padding: "5px", marginLeft: "650px", marginTop: "50px", borderRadius: "8px", color:"white" }} 
        onClick={() => setIsModalOpen(true)} 
      >
        Add new User
      </button>
      <div style={{ display: "flex" }}>
        <button
          style={{ backgroundColor: "gray", padding: "5px", marginLeft: "450px", marginTop: "100px" , borderRadius: "8px", color:"white"}}
          onClick={() => navigate("/maintain-vendor")}
        >
          Maintain Vendor
        </button>
        <button
          style={{ backgroundColor: "gray", padding: "5px", marginLeft: "450px", marginTop: "100px", borderRadius: "8px", color:"white" }}
          onClick={() => navigate("/maintain-user")}
        >
          Maintain User
        </button>
      </div>
    </div>
  );
};

function AdminPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ userName: '', role: '', membership: '' });

  async function getUser() {
    const savedData = await fetchUser();
    setData(savedData);
  }

  useEffect(() => {
    getUser();
  }, []);

  async function handleAddUser() {
    try {
      await addUser(newUser.userName, newUser.role, newUser.membership); 
      alert('User added successfully');
      setIsModalOpen(false);
      setNewUser({ userName: '', role: '', membership: '' });
      getUser(); 
    } catch (error) {
      alert('Error adding user');
    }
  }

  return (
    <>
      <Navbar name="ADMIN" />
      <UsersTable refresh={getUser} users={data} setIsModalOpen={setIsModalOpen} />
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '300px' }}>
            <h2>Add New User</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
              <div style={{ marginBottom: '10px' }}>
                <label>Role:</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  style={{ width: '100%', padding: '4px', marginTop: '4px', border: '1px solid #ccc' }}
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Name:</label>
                <input
                  type="text"
                  value={newUser.userName}
                  onChange={(e) => setNewUser(prevState => ({ ...prevState, userName: e.target.value }))}
                  style={{ width: '100%', padding: '4px', marginTop: '4px', border: '1px solid #ccc' }}
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit" style={{ padding: '4px 8px', backgroundColor: 'green', color: 'white', border: 'none' }}>Submit</button>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '4px 8px', backgroundColor: 'red', color: 'white', border: 'none' }}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminPage;
