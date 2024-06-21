

const addUser = async (userName, role) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, role }),
      });
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export default addUser;
  