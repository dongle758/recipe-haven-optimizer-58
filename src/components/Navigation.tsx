
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Book, Calendar, ShoppingCart, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled 
          ? "backdrop-blur-lg bg-background/80 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <Link 
            to="/" 
            className="text-xl font-serif tracking-tight hover:opacity-80 transition-opacity"
          >
            Recipe Haven
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" isActive={isActive('/')}>
              <Book className="w-5 h-5 mr-1" />
              <span>Recipes</span>
            </NavLink>
            <NavLink to="/meal-planner" isActive={isActive('/meal-planner')}>
              <Calendar className="w-5 h-5 mr-1" />
              <span>Meal Planner</span>
            </NavLink>
            <NavLink to="/shopping-list" isActive={isActive('/shopping-list')}>
              <ShoppingCart className="w-5 h-5 mr-1" />
              <span>Shopping List</span>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-64 opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-4 bg-card shadow-md">
          <MobileNavLink to="/" isActive={isActive('/')}>
            <Book className="w-5 h-5 mr-2" />
            <span>Recipes</span>
          </MobileNavLink>
          <MobileNavLink to="/meal-planner" isActive={isActive('/meal-planner')}>
            <Calendar className="w-5 h-5 mr-2" />
            <span>Meal Planner</span>
          </MobileNavLink>
          <MobileNavLink to="/shopping-list" isActive={isActive('/shopping-list')}>
            <ShoppingCart className="w-5 h-5 mr-2" />
            <span>Shopping List</span>
          </MobileNavLink>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, isActive, children }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all",
      isActive
        ? "bg-secondary text-primary"
        : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
    )}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, isActive, children }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center p-3 rounded-md font-medium transition-all",
      isActive
        ? "bg-secondary text-primary"
        : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
    )}
  >
    {children}
  </Link>
);

export default Navigation;
