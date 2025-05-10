
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">FarmSupply</h3>
            <p className="text-gray-600 mb-4">
              Your trusted source for quality agricultural supplies at competitive prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary">Home</Link></li>
              <li><Link to="/seeds" className="text-gray-600 hover:text-primary">Seeds</Link></li>
              <li><Link to="/fertilizers" className="text-gray-600 hover:text-primary">Fertilizers</Link></li>
              <li><Link to="/pesticides" className="text-gray-600 hover:text-primary">Pesticides</Link></li>
              <li><Link to="/sell" className="text-gray-600 hover:text-primary">Sell Your Products</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-bold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-600 hover:text-primary">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-primary">Shipping</Link></li>
              <li><Link to="/returns" className="text-gray-600 hover:text-primary">Returns</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to receive updates on new products and special promotions.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button 
                type="submit" 
                className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} FarmSupply. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
