import { RiAdminFill } from "react-icons/ri";

const Header = ({ onLogout }) => {
  // Function to confirm logout
  const confirmLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      onLogout();
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <RiAdminFill size={45}/>
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <button
        onClick={confirmLogout} 
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
