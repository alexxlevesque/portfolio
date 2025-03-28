import React from 'react';

interface TechStackBadgeProps {
  name: string;
  icon: string;
  color: string;
}

const TechStackBadge: React.FC<TechStackBadgeProps> = ({ name, icon, color }) => {
  return (
    <div className="group relative">
      <div 
        className={`w-12 h-12 rounded-lg flex items-center justify-center ${color} transition-transform duration-200 hover:scale-110`}
        title={name}
      >
        <img 
          src={icon} 
          alt={name}
          className="w-6 h-6"
        />
      </div>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {name}
      </div>
    </div>
  );
};

export default TechStackBadge; 