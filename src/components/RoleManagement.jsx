import { useState } from "react";
import RoleForm from "./RoleForm";
import Modal from "./Modal";

const RoleManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Write", "Edit", "Delete"] },
  ]); // Initial roles
  const [editingRoleIndex, setEditingRoleIndex] = useState(null); // Tracks which role is being edited

  const handleSave = (role) => {
    if (editingRoleIndex !== null) {
      // Update an existing role
      setRoles((prevRoles) =>
        prevRoles.map((r, index) =>
          index === editingRoleIndex ? { ...role, id: r.id } : r
        )
      );
    } else {
      // Add a new role
      setRoles((prevRoles) => [
        ...prevRoles,
        { ...role, id: Date.now() }, // Generate a unique ID
      ]);
    }
    setEditingRoleIndex(null); // Reset editing state
    setIsModalOpen(false); // Close modal
  };

  const handleDelete = (index) => {
    setRoles((prevRoles) => prevRoles.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditingRoleIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Role Management</h2>
      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => {
          setEditingRoleIndex(null);
          setIsModalOpen(true);
        }}
      >
        Add Role
      </button>

      {/* Modal for Add/Edit Role */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-semibold mb-4">
          {editingRoleIndex !== null ? "Edit Role" : "Add Role"}
        </h3>
        <RoleForm
          onSave={handleSave}
          initialRole={
            editingRoleIndex !== null ? roles[editingRoleIndex] : null
          }
        />
      </Modal>

      {/* Roles Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Permissions</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={role.id}>
              <td className="border border-gray-300 p-2">{role.name}</td>
              <td className="border border-gray-300 p-2">
                {role.permissions.join(", ")}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(index)}
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

export default RoleManagement;
