import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import fetchUser from "../api/fetchUser";
import Navbar from "./Navbar"; 
import deleteUserByUsername from "../api/deleteUser";
import updateUserRoleByUsername from "../api/updateUserRole";

const UsersTable = ({ users, refresh }) => {
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
            <th style={{ marginLeft: "480px", fontWeight: "bold", fontSize: "20px", padding: "4px" }}>UserName</th>
            <th style={{ marginLeft: "140px", fontWeight: "bold", fontSize: "20px", padding: "4px" }}>Role</th>
            <th style={{ marginLeft: "280px", fontWeight: "bold", fontSize: "20px", padding: "4px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} style={{ display: "flex" }}>
              <td style={{ marginLeft: "486px", marginBottom: "4px" }}>{user.userName}</td>
              <td style={{ marginLeft: "210px", marginBottom: "4px" }}>{user.role}</td>
              <td>
                <button
                  style={{ backgroundColor: "red", padding: "4px", marginLeft: "310px", marginBottom: "4px" }}
                  onClick={() => deleteUser(user.userName)}
                >
                  Delete
                </button>
              </td>
              <td>
                {<label style={{ marginLeft: "50px", marginBottom: "4px" }}>Change role to</label> }
                { <select
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
                  <option value="admin">admin</option>
                </select> }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex" }}>
        <button
          style={{ backgroundColor: "gray", padding: "5px", marginLeft: "450px", marginTop: "150px" , borderRadius: "8px",}}
          onClick={() => navigate("/maintain-vendor")}
        >
          Maintain Vendor
        </button>
        <button
          style={{ backgroundColor: "gray", padding: "5px", marginLeft: "450px", marginTop: "150px", borderRadius: "8px", }}
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

  async function getUser() {
    const savedData = await fetchUser();
    setData(savedData);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Navbar name="ADMIN" />
      <UsersTable refresh={getUser} users={data} />
    </>
  );
}

export default AdminPage;
