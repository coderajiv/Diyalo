import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; {currentYear} The Diyalo Traders. All Rights Reserved.</p>
        <p className="text-sm text-gray-400 mt-1">Bharatpur, Nepal</p>
      </div>
    </footer>
  );
}