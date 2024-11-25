import { useState, useEffect } from "react";

const RoleForm = ({ onSave, initialRole }) => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (initialRole) {
      setName(initialRole.name);
      setPermissions(initialRole.permissions);
    } else {
      setName("");
      setPermissions([]);
    }
  }, [initialRole]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, permissions });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Role Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Permissions</label>
        <input
          type="text"
          value={permissions.join(", ")}
          onChange={(e) => setPermissions(e.target.value.split(",").map((p) => p.trim()))}
          className="border rounded p-2 w-full"
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
};

export default RoleForm;
