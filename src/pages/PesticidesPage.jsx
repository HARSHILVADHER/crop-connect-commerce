
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { mockProducts } from "@/data/mockProducts";

const PesticidesPage = () => {
  const [pesticides, setPesticides] = useState([]);
  const { addToCart } = useCart();
  
  useEffect(() => {
    // Filter out only pesticide products from mock data
    const pesticideProducts = mockProducts.filter(
      product => product.category.toLowerCase() === 'pesticides'
    );
    setPesticides(pesticideProducts);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pesticides</h1>
        <p className="text-gray-600">Protect your crops from pests with our effective pesticide solutions.</p>
      </div>
      
      {/* Product Grid */}
      {pesticides.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pesticides.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <Link to={`/product/${product.id}`}>
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  <Button size="sm" onClick={() => handleAddToCart(product)}>
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No pesticide products available</p>
        </div>
      )}
    </div>
  );
};

export default PesticidesPage;
