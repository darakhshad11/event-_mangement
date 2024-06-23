import React, { useEffect, useState } from "react";
import fetchUser from "../api/fetchUser";
import addMembership from "../api/addMembership";
import updateMembership from "../api/updateMembership"; 
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth"; // Add Firebase auth imports

const MaintainUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // New state to track add/update action
  const [newUser, setNewUser] = useState({ userName: '', role: '', membership: '' });

  useEffect(() => {
    fetchUser().then(usersData => {
      setUsers(usersData);
    }).catch(error => {
      console.error("Error fetching users:", error);
    });
  }, []);

  async function handleAddOrUpdateUser() {
    try {
      if (isUpdating) {
        await updateMembership(newUser.userName, newUser.membership); // Use the updateMembership function
        alert('Membership updated successfully');
      } else {
        await addMembership(newUser.userName, newUser.membership); 
        alert('Membership added successfully');
      }
      
      setIsModalOpen(false);
      setNewUser({ userName: '', role: '', membership: '' });
      fetchUser().then(usersData => {
        setUsers(usersData);
      }).catch(error => {
        console.error("Error fetching users:", error);
      });
    } catch (error) {
      alert(`Error ${isUpdating ? 'updating' : 'adding'} membership`);
    }
  }

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/'); // Redirect to the login page
    }).catch((error) => {
      console.error("Error logging out:", error);
    });
  };

  return (
    <>
      <button
        style={{ backgroundColor: "#7fffd4", borderRadius: "8px", marginLeft: "1300px", padding: "4px", marginTop: "20px" }}
        onClick={() => navigate('/admin-page')}
      >
        Home
      </button>
      <button
        style={{ backgroundColor: "red", borderRadius: "8px", marginLeft: "90px", padding: "4px", marginTop: "20px" }}
        onClick={handleLogout}
      >
        LogOut
      </button>
      <h1 style={{ textAlign: "center", fontSize: "30px", marginTop: "20px", padding: "2px" }}>Maintain User Page</h1>
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "80px", padding: "2px", marginLeft: "450px" ,backgroundColor: "grey", border:" 2px solid black" , marginBottom:"40px",color:"white"  , fontSize:"20px"}}>Membership</div>
          <button
            style={{ marginBottom: "55px", padding: "5px", backgroundColor: "#30d5c8", color: "white", borderRadius: "8px", marginLeft: "425px", marginTop: "55px" , border:" 2px solid black" }}
            onClick={() => { setIsModalOpen(true); setIsUpdating(false); }}
          >
            Add
          </button>
        </div>
        <button 
          style={{ marginTop: "5px", padding: "4px", marginLeft: "985px", backgroundColor: "#30d5c8", marginRight: "570px", borderRadius: "8px", color: "white" , border:" 2px solid black"}}
          onClick={() => { setIsModalOpen(true); setIsUpdating(true); }}
        >
          Update
        </button>
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ marginTop: "80px", padding: "2px", marginLeft: "450px",backgroundColor: "grey", border:" 2px solid black",marginBottom:"40px",color:"white" ,fontSize:"20px"}}>User Mangement</div>
          <button
            style={{ marginBottom: "55px", padding: "5px", backgroundColor: "#30d5c8", color: "white", borderRadius: "8px", marginLeft: "390px", marginTop: "55px", border:" 2px solid black" }}
            
          >
            Add
          </button>
        </div>
        <button 
          style={{ marginTop: "5px", padding: "4px", marginLeft: "985px", backgroundColor: "#30d5c8", marginRight: "540px", borderRadius: "8px", color: "white" , border:" 2px solid black" }}
         
        >
          Update
        </button>
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '300px' }}>
            <h2>{isUpdating ? 'Update Membership' : 'Add Membership'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddOrUpdateUser(); }}>
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
              <div style={{ marginBottom: '10px', marginTop: '10px' }}>
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
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '4px 8px', backgroundColor: 'red', color: 'white', border: 'none' }}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MaintainUser;
