import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchUser from '../api/fetchUser';
import updateUserRoleByUsername from '../api/updateUserRole';
import addUser from '../api/addUser';

const MaintainUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ role: '', userName: '' });

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUser();
      const filteredUsers = fetchedUsers.filter(user => user.role === 'user');
      setUsers(filteredUsers);
    };
    getUsers();
  }, []);

  const updateRoleToVendor = async (username) => {
    try {
      await updateUserRoleByUsername(username, 'vendor');
      alert(`User ${username} role updated to vendor`);
      const fetchedUsers = await fetchUser();
      const filteredUsers = fetchedUsers.filter(user => user.role === 'user');
      setUsers(filteredUsers);
    } catch (error) {
      alert(`Failed to update role: ${error.message}`);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      console.log('New user data:', newUser);
      await addUser(newUser.userName, newUser.role);
      alert(`User ${newUser.userName} added successfully`);
      setIsModalOpen(false);
      setNewUser({ role: '', userName: '' });
      const fetchedUsers = await fetchUser();
      const filteredUsers = fetchedUsers.filter(user => user.role === 'user');
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error adding user:', error);
      alert(`Failed to add user: ${error.message}`);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={{backgroundColor: "grey" ,minHeight: '100vh'}}>
      <div style={{ display: "flex"  }}>
        <div style={{ marginLeft: "600px", fontSize:"30px" ,marginTop:"20px"  }}>
          <p >Maintain User Page</p>
          </div> </div>
          <button
            style={{ backgroundColor: "#29adff",  borderRadius: "8px", marginLeft :"1300px" , padding:"4px" }}
            onClick={() => navigate('/admin-page')}>Home
</button>
          <button
            style={{ backgroundColor: "red",  borderRadius: "8px",  marginLeft :"90px",padding:"4px" }}
            onClick={() => navigate('/')}
          >
            LogOut
          </button>
       
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", padding: "0 280px", marginTop: "160px" }}>
          <button style={{ backgroundColor: "white", padding: "4px", color: "black" , borderRadius: "8px", }}>Membership</button>
          <button style={{ backgroundColor: "blue", padding: "4px"  , borderRadius: "8px",}} onClick={openModal}>Add</button>
        </div>
        {users.map((user, index) => (
          <div key={index} style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 280px", width: "100%" }}>
            <span>{user.userName}</span>
            <button
              style={{ backgroundColor: "white", padding: "4px", marginLeft: "25px",  borderRadius: '8px' }}
              onClick={() => updateRoleToVendor(user.userName)}
            >
              Update 
            </button>
          </div>
        ))}
     

      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '300px' }}>
            <h2>Add New User</h2>
            <form onSubmit={handleAddUser}>
              <div style={{ marginBottom: '10px' }}>
                <label>Role:</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  style={{ width: '100%', padding: '4px', marginTop: '4px' , border: '1px solid #ccc', }}
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
                  style={{ width: '100%', padding: '4px', marginTop: '4px' , border: '1px solid #ccc', }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit" style={{ padding: '4px 8px', backgroundColor: 'green', color: 'white', border: 'none' }}>Submit</button>
                <button type="button" onClick={closeModal} style={{ padding: '4px 8px', backgroundColor: 'red', color: 'white', border: 'none' }}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div style={{ display: "flex", width: "100%", justifyContent: "space-between", padding: "0 280px", marginTop: "50px" }}>
          <button style={{ backgroundColor: "white", padding: "4px", color: "black", borderRadius: '8px' }}>User Management</button>
          <button style={{ backgroundColor: "blue", padding: "4px" , borderRadius: '8px' }}>Add</button>
        </div>
        <button style={{ backgroundColor: "white", padding: "4px", marginLeft: "1205px", marginTop: "20px", borderRadius: '8px' }}>Update</button>
        
    </div>
   
  );
};

export default MaintainUser;
