import React, { useEffect, useState } from "react";
import fetchUser from "../api/fetchUser";
import addMembership from "../api/addMembership";

const MaintainUser = () => {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ userName: '', role: '', membership: '' });

  useEffect(() => {
    fetchUser().then(usersData => {
      setUsers(usersData);
    }).catch(error => {
      console.error("Error fetching users:", error);
    });
  }, []);

  async function handleAddUser() {
    try {
      await addMembership(newUser.userName, newUser.membership); 
      alert('Membership added successfully');
      setIsAddModalOpen(false);
      setNewUser({ userName: '', role: '', membership: '' });
      fetchUser().then(usersData => {
        setUsers(usersData);
      }).catch(error => {
        console.error("Error fetching users:", error);
      });
    } catch (error) {
      alert('Error adding membership');
    }
  }

  return (
    <>
      <h1 style={{ textAlign: "center", fontSize: "30px", marginTop: "20px", padding: "2px" }}>Maintain User Page</h1>
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "80px", padding: "2px", marginLeft: "450px" }}>Membership</div>
         
          <button
            style={{ marginBottom: "50px", padding: "5px", backgroundColor: "green", color: "white", borderRadius: "8px" ,marginLeft: "450px", marginTop:"50px" }}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add
          </button>
        </div>
        <div style={{ marginTop: "5px", padding: "2px", marginLeft: "985px", backgroundColor: "gray", marginRight: "490px", borderRadius: "8px" }}>Update</div>
      </div>
      

      {isAddModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '300px' }}>
            <h2>Add Membership</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
              <div style={{ marginBottom: '10px' }}>
                <select
                  value={newUser.userName}
                  onChange={(e) => setNewUser(prevState => ({ ...prevState, userName: e.target.value }))}
                  style={{ width: '100%', padding: '4px', marginTop: '4px', border: '1px solid #ccc' }}
                >
                  <option value="">Select User</option>
                  {users.map((user, index) => (
                    <option key={index} value={user.userName}>{user.userName}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Membership:</label>
                <select
                  value={newUser.membership}
                  onChange={(e) => setNewUser(prevState => ({ ...prevState, membership: e.target.value }))}
                  style={{ width: '100%', padding: '4px', marginTop: '4px', border: '1px solid #ccc' }}
                >
                  <option value="">Select Membership</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit" style={{ padding: '4px 8px', backgroundColor: 'green', color: 'white', border: 'none' }}>Submit</button>
                <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: '4px 8px', backgroundColor: 'red', color: 'white', border: 'none' }}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MaintainUser;
