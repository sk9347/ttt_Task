import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import UserList from './UserList';


const Users = () => {
  const [userData, setUserData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const apiCall = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      setUserData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  const handleCreate = async (newUser) => {
    if (!newUser.userName || !newUser.email || !newUser.password) {
      alert('All fields are required');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/api/createUser', newUser, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setUserData([...userData, response.data]);
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  const handleUpdate = async (updatedUser) => {
    if (!updatedUser.userName && !updatedUser.email && !updatedUser.password) {
      alert('No fields to update');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3001/api/users/${editingUser._id}`, updatedUser);
      setUserData(userData.map(user => (user._id === editingUser._id ? response.data : user)));
      setEditingUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${userId}`);
      setUserData(userData.filter(user => user._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <UserForm
        user={editingUser}
        onSubmit={editingUser ? handleUpdate : handleCreate}
        onCancel={() => setEditingUser(null)}
      />
      <UserList
        users={userData}
        onEdit={(user) => setEditingUser(user)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Users;
