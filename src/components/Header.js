import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Headphones, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Input } from './ui/input';

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount, toggleCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  return (
    <header className="bg-[#1a1a1a] text-white sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight">vooglam.</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products?category=eyeglasses" className="hover:text-gray-300 transition-colors">
              Eyeglasses
            </Link>
            <Link to="/products?category=sunglasses" className="hover:text-gray-300 transition-colors">
              Sunglasses
            </Link>
            <Link to="/products" className="hover:text-gray-300 transition-colors">
              Lenses
            </Link>
            <Link to="/products" className="hover:text-gray-300 transition-colors">
              Collections
            </Link>
            <Link to="/products" className="text-[#FF5722] hover:text-[#FF7043] transition-colors font-medium">
              Flash Sale
            </Link>
            <Link to="/products" className="hover:text-gray-300 transition-colors">
              Accessories
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden lg:flex items-center">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Retro"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-32 bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:w-48 transition-all"
                />
                <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>

            <button className="hover:text-gray-300 transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="hover:text-gray-300 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleCart}
              className="hover:text-gray-300 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF5722] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {getCartCount()}
                </span>
              )}
            </button>
            <button className="hover:text-gray-300 transition-colors">
              <Headphones className="w-5 h-5" />
            </button>
            <button className="hover:text-gray-300 transition-colors">
              <Globe className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
