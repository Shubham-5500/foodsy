import { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartCount, onCartClick }: NavbarProps) => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-sm border-b border-gray-100 transition-all">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center group">
            <span className="text-foodsy-orange text-3xl font-extrabold tracking-wider transition-colors group-hover:text-foodsy-green">Foodsy</span>
            <span className="text-foodsy-green text-3xl font-bold">.</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex space-x-10 items-center text-base font-medium">
            <a href="/" className="text-gray-700 hover:text-foodsy-orange transition-colors px-2 py-1">Home</a>
            <a href="#menu" className="text-gray-700 hover:text-foodsy-orange transition-colors px-2 py-1">Menu</a>
            <a href="#offers" className="text-gray-700 hover:text-foodsy-orange transition-colors px-2 py-1">Offers</a>
            <a href="#about" className="text-gray-700 hover:text-foodsy-orange transition-colors px-2 py-1">About</a>
          </nav>
        )}

        {/* Cart & Mobile Menu Button */}
        <div className="flex items-center space-x-3">
          <Button 
            onClick={onCartClick} 
            variant="ghost" 
            className="relative p-2 bg-white rounded-full hover:shadow transition"
          >
            <ShoppingCart className="h-6 w-6 text-foodsy-orange" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-foodsy-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </Button>
          {isMobile && (
            <Button 
              variant="ghost" 
              className="p-2 rounded-full bg-white shadow hover:bg-foodsy-orange/10 transition md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-t animate-slide-in z-50 shadow-lg">
          <div className="container mx-auto px-4 py-5">
            <nav className="flex flex-col gap-5">
              <a href="/" className="text-gray-800 font-semibold text-lg py-2 hover:text-foodsy-orange transition-colors">Home</a>
              <a href="#menu" className="text-gray-800 font-semibold text-lg py-2 hover:text-foodsy-orange transition-colors">Menu</a>
              <a href="#offers" className="text-gray-800 font-semibold text-lg py-2 hover:text-foodsy-orange transition-colors">Offers</a>
              <a href="#about" className="text-gray-800 font-semibold text-lg py-2 hover:text-foodsy-orange transition-colors">About</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
