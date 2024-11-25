import { useState } from "react";
import PermissionForm from "./PermissionForm";
import Modal from "./Modal";

const PermissionManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permissions, setPermissions] = useState([
    { id: 1, name: "View Users", description: "Allows viewing user details" }
  ]); // Initial permissions
  const [editingPermissionIndex, setEditingPermissionIndex] = useState(null); // State for editing

  const handleSave = (permission) => {
    if (editingPermissionIndex !== null) {
      // Update existing permission
      setPermissions((prevPermissions) =>
        prevPermissions.map((p, index) =>
          index === editingPermissionIndex ? { ...permission, id: p.id } : p
        )
      );
    } else {
      // Add new permission
      setPermissions((prevPermissions) => [
        ...prevPermissions,
        { ...permission, id: Date.now() }, // Add a unique ID for the new permission
      ]);
    }
    setEditingPermissionIndex(null);
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    setPermissions((prevPermissions) =>
      prevPermissions.filter((_, i) => i !== index)
    );
  };

  const handleEdit = (index) => {
    setEditingPermissionIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Permission Management</h2>
      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => {
          setEditingPermissionIndex(null);
          setIsModalOpen(true);
        }}
      >
        Add Permission
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-semibold mb-4">
          {editingPermissionIndex !== null ? "Edit Permission" : "Add Permission"}
        </h3>
        <PermissionForm
          onSave={handleSave}
          permission={
            editingPermissionIndex !== null
              ? permissions[editingPermissionIndex]
              : { name: "", description: "" }
          }
        />
      </Modal>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Permission</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission, index) => (
            <tr key={permission.id}>
              <td className="border border-gray-300 p-2">{permission.name}</td>
              <td className="border border-gray-300 p-2">
                {permission.description}
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

export default PermissionManagement;
