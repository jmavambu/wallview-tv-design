
import React from 'react';
import { Tv, Phone, Mail } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Tv className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">MountPro</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="h-4 w-4" />
              <span>info@mountpro.com</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
