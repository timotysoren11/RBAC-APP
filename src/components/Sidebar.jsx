
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-200 h-screen p-4">
      <nav className="space-y-6 mt-48">
        <Link to="/users" className="block p-2 bg-blue-500 text-white rounded">
          Manage Users
        </Link>
        <Link to="/roles" className="block p-2 bg-blue-500 text-white rounded">
          Manage Roles
        </Link>
        <Link to="/permissions" className="block p-2 bg-blue-500 text-white rounded">
          Manage Permissions
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
