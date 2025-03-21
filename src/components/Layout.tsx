
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setIsPageTransitioning(true);
      setTimeout(() => {
        setDisplayLocation(location);
        setIsPageTransitioning(false);
      }, 300);
    }
  }, [location, displayLocation]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ${
        isPageTransitioning 
          ? 'opacity-0 translate-y-4 transition-all duration-300' 
          : 'opacity-100 translate-y-0 transition-all duration-300'
      }`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
