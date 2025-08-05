import { useState } from 'react';
import { Pencil, Trash2, } from 'lucide-react';
import axios from 'axios';
import { useEffect } from 'react';

const API = process.env.REACT_APP_API_URL || "http://localhost:3003";

export default function ManageUsers() {

  const [users, setUsers] = useState([{
    user_id:'',
    name:'',
    email:'',
    role:'',
    mobile_number:'',
    gender:''
  }]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`${API}/api/admin/get-users`);
        // console.log(response);
        
        setUsers(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.user_id === editingUser.user_id ? editingUser : u))
    );
    setShowModal(false);
  };

  const getRoleColor = (role) => {
    return {
      Admin: 'bg-purple-100 text-purple-600',
      Staff: 'bg-blue-100 text-blue-600',
      User: 'bg-green-100 text-green-600',
    }[role] || 'bg-gray-100 text-gray-600';
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Users</h2>
        {/* <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          <Plus className="w-4 h-4" /> Add New User
        </button> */}
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-left table-auto">
          <thead className="bg-gray-50 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3">User ID</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Email Address</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Mobile Number</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user) => (
              <tr key={user.user_id} className="border-t">
                <td className="px-4 py-3 font-medium">US-{user.user_id}</td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1`}>
                    {user.mobile_number}
                  </span>
                </td>
                <td>
                  <span className={`px-2 py-1`}>
                    {user.gender}
                  </span>
                </td>
                <td className="px-4 py-3 flex items-center justify-center gap-3 text-gray-600">
                  <Pencil className="w-4 h-4 cursor-pointer hover:text-indigo-600" onClick={() => handleEdit(user)} />
                  <Trash2 className="w-4 h-4 cursor-pointer text-red-500 hover:text-red-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Edit User</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Role</label>
                <select
                  name="role"
                  value={editingUser.role}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                >
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile_number"
                  value={editingUser.mobile_number}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Gender</label>
                <select
                  type='text'
                  name="gender"
                  value={editingUser.gender}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
