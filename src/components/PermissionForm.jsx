import { useState, useEffect } from "react";

const PermissionForm = ({ onSave, permission = {} }) => {
  const [permissionName, setPermissionName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setPermissionName(permission.name || "");
    setDescription(permission.description || "");
  }, [permission]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name: permissionName, description });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Permission Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={permissionName}
          onChange={(e) => setPermissionName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
};

export default PermissionForm;
