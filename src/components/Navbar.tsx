
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            FarmSupply
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <Link to="/" className="font-medium hover:text-primary">Home</Link>
            <Link to="/seeds" className="font-medium hover:text-primary">Seeds</Link>
            <Link to="/fertilizers" className="font-medium hover:text-primary">Fertilizers</Link>
            <Link to="/pesticides" className="font-medium hover:text-primary">Pesticides</Link>
            <Link to="/insecticides" className="font-medium hover:text-primary">Insecticides</Link>
            <Link to="/sell" className="font-medium hover:text-primary">Sell Now</Link>
          </div>

          {/* Cart and User buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-4 space-y-4">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="font-medium p-2 hover:bg-gray-100 rounded-md" onClick={() => setShowMobileMenu(false)}>Home</Link>
              <Link to="/seeds" className="font-medium p-2 hover:bg-gray-100 rounded-md" onClick={() => setShowMobileMenu(false)}>Seeds</Link>
              <Link to="/fertilizers" className="font-medium p-2 hover:bg-gray-100 rounded-md" onClick={() => setShowMobileMenu(false)}>Fertilizers</Link>
              <Link to="/pesticides" className="font-medium p-2 hover:bg-gray-100 rounded-md" onClick={() => setShowMobileMenu(false)}>Pesticides</Link>
              <Link to="/insecticides" className="font-medium p-2 hover:bg-gray-100 rounded-md" onClick={() => setShowMobileMenu(false)}>Insecticides</Link>
              <Link to="/sell" className="font-medium p-2 hover:bg-gray-100 rounded-md" onClick={() => setShowMobileMenu(false)}>Sell Now</Link>
              <Link to="/cart" className="font-medium p-2 hover:bg-gray-100 rounded-md" onClick={() => setShowMobileMenu(false)}>Cart</Link>
              <Link to="/profile" className="font-medium p-2 hover:bg-gray-100 rounded-md" onClick={() => setShowMobileMenu(false)}>Profile</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
