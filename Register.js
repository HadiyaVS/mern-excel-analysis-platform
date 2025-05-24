import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '', role: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/auth/register', form);
    window.location.href = '/';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="p-6 bg-white rounded shadow" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-xl font-bold">Register</h2>
        <input type="email" placeholder="Email" className="w-full mb-2 p-2 border" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="w-full mb-2 p-2 border" onChange={e => setForm({ ...form, password: e.target.value })} />
        <select className="w-full mb-2 p-2 border" onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
