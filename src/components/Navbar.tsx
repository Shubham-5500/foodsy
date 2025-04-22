import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartCount, onCartClick }: NavbarProps) => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/80 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-all">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center group">
            <span className="text-foodsy-orange text-3xl font-extrabold tracking-wider transition-colors group-hover:text-foodsy-green">Foodsy</span>
            <span className="text-foodsy-green text-3xl font-bold">.</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex space-x-10 items-center text-base font-medium">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-foodsy-orange transition-colors px-2 py-1">Home</Link>
            <Link to="#menu" className="text-gray-700 dark:text-gray-300 hover:text-foodsy-orange transition-colors px-2 py-1">Menu</Link>
            <Link to="#offers" className="text-gray-700 dark:text-gray-300 hover:text-foodsy-orange transition-colors px-2 py-1">Offers</Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-foodsy-orange transition-colors px-2 py-1">About</Link>
          </nav>
        )}

        {/* Cart, Theme Toggle & Mobile Menu Button */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <Button 
                onClick={onCartClick} 
                variant="ghost" 
                className="relative p-2 bg-white dark:bg-gray-800 rounded-full hover:shadow transition"
              >
                <ShoppingCart className="h-6 w-6 text-foodsy-orange" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-foodsy-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Button>
              <div className="hidden md:flex items-center">
                <Button 
                  variant="ghost" 
                  className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-foodsy-orange"
                  asChild
                >
                  <Link to="/profile">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{user?.name}</span>
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 dark:text-gray-300 hover:text-foodsy-orange"
                  onClick={logout}
                >
                  Sign out
                </Button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Button 
                variant="ghost" 
                className="text-gray-700 dark:text-gray-300 hover:text-foodsy-orange"
                asChild
              >
                <Link to="/login">Sign in</Link>
              </Button>
              <Button 
                className="bg-foodsy-orange hover:bg-foodsy-orange/90 text-white"
                asChild
              >
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
          
          {!isMobile && <ThemeToggle />}
          
          {isMobile && (
            <Button 
              variant="ghost" 
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow hover:bg-foodsy-orange/10 transition md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 border-t animate-slide-in z-50 shadow-lg">
          <div className="container mx-auto px-4 py-5">
            <nav className="flex flex-col gap-5">
              <Link to="/" className="text-gray-800 dark:text-gray-200 font-semibold text-lg py-2 hover:text-foodsy-orange transition-colors">Home</Link>
              <Link to="#menu" className="text-gray-800 dark:text-gray-200 font-semibold text-lg py-2 hover:text-foodsy-orange transition-colors">Menu</Link>
              <Link to="#offers" className="text-gray-800 dark:text-gray-200 font-semibold text-lg py-2 hover:text-foodsy-orange transition-colors">Offers</Link>
              <Link to="/about" className="text-gray-800 dark:text-gray-200 font-semibold text-lg py-2 hover:text-foodsy-orange transition-colors">About</Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="text-gray-800 dark:text-gray-200 font-semibold text-lg py-2 hover:text-foodsy-orange transition-colors">Profile</Link>
                  <Button 
                    variant="ghost" 
                    onClick={logout} 
                    className="justify-start text-gray-800 dark:text-gray-200 font-semibold text-lg py-2 hover:text-foodsy-orange transition-colors px-0"
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-800 dark:text-gray-200 font-semibold text-lg py-2 hover:text-foodsy-orange transition-colors">Sign in</Link>
                  <Link to="/register" className="text-gray-800 dark:text-gray-200 font-semibold text-lg py-2 hover:text-foodsy-orange transition-colors">Register</Link>
                </>
              )}
              
              <div className="pt-2 flex justify-center">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
