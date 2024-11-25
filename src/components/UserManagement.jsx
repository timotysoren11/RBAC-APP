import { useState } from "react";
import UserForm from "./UserForm";

const UserManagement = () => {
  // State to store the list of users
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  ]);

  // State to control form visibility and edit mode
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Function to handle adding or updating a user
  const handleSave = (user) => {
    if (editingUser) {
      // Update existing user
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === editingUser.id ? { ...u, ...user } : u))
      );
    } else {
      // Add a new user
      setUsers((prevUsers) => [
        ...prevUsers,
        { id: prevUsers.length + 1, ...user },
      ]);
    }

    // Reset form state
    setShowForm(false);
    setEditingUser(null);
  };

  // Function to handle editing a user
  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  // Function to handle deleting a user
  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Add User Button */}
      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => {
          setEditingUser(null);
          setShowForm(true);
        }}
      >
        Add User
      </button>

      {/* User Form */}
      {showForm && (
        <UserForm
          onSave={handleSave}
          user={editingUser || { name: "", email: "", role: "" }}
        />
      )}

      {/* User Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
