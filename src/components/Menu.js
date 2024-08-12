import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavMenu = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#999999] p-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-1">
        <img
          src="./logo.png" 
          alt="WBCC Assistance"
          className="w-1/4"
        />
      </div>

      {/* Menu Items */}
      <div className="flex space-x-6 text-white">
        <a href="#" className="hover:text-[#E31B23] whitespace-nowrap">Accueil</a>
        <a href="#" className="hover:text-[#E31B23] whitespace-nowrap">Vous êtes ?</a>
        <a href="#" className="hover:text-[#E31B23] whitespace-nowrap">L'équipe</a>
        <a href="#" className="hover:text-[#E31B23] whitespace-nowrap">Déclarer un sinistre</a>
        <a href="#" className="hover:text-[#E31B23] whitespace-nowrap">Nous Contacter</a>
        <a href="#" className="hover:text-[#E31B23] whitespace-nowrap">Votre espace extranet</a>
        <Link 
          to="/" 
          className="text-[#E31B23] font-bold whitespace-nowrap"
          onClick={(e) => {
            e.preventDefault(); 
            navigate('/'); 
          }} 
        >
          Remise des clés
        </Link>
      </div>

      {/* Icon Section */}
      <div className="grid grid-cols-3 gap-1">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-white"></div>
        ))}
      </div>
    </nav>
  );
};

export default NavMenu;
