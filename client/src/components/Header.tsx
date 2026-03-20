import React from "react";
import { useNavigate } from "react-router-dom";
import { removeToken, removeUser } from "../utils/auth";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate("/signin");
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">🧠 Second Brain</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
