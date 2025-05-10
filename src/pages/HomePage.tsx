
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-primary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Quality Farm Supplies for Your Agricultural Needs
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Find the best seeds, fertilizers, and crop protection products to maximize your yield and improve crop health.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/seeds">
                  <Button size="lg">Shop Seeds</Button>
                </Link>
                <Link to="/fertilizers">
                  <Button size="lg" variant="outline">Shop Fertilizers</Button>
                </Link>
                <Link to="/pesticides">
                  <Button size="lg" variant="outline">Shop Pesticides</Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Farming" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Link to="/seeds" className="group">
              <div className="border rounded-lg overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1527540306867-8d64b9264566?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Seeds" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">Seeds</h3>
                  <p className="text-gray-600 mt-2">High-quality seeds for various crops</p>
                </div>
              </div>
            </Link>
            <Link to="/fertilizers" className="group">
              <div className="border rounded-lg overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1615921511258-0aa98c84d400?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Fertilizers" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">Fertilizers</h3>
                  <p className="text-gray-600 mt-2">Boost your crop yield with our fertilizers</p>
                </div>
              </div>
            </Link>
            <Link to="/pesticides" className="group">
              <div className="border rounded-lg overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1586093127013-5af2578a2179?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Pesticides" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">Pesticides & Insecticides</h3>
                  <p className="text-gray-600 mt-2">Protect your crops from pests and diseases</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <ProductGrid />
          <div className="text-center mt-8">
            <Link to="/products">
              <Button variant="outline" size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sell Your Products CTA */}
      <section className="py-12 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Are You a Farmer?</h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              List your crops on our marketplace and connect directly with buyers. 
              Get the best price for your produce and expand your market reach.
            </p>
            <Link to="/sell">
              <Button size="lg">Sell Your Products</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
