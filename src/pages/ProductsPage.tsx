
import ProductGrid from "@/components/ProductGrid";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearchQuery = searchParams.get("search") || "";
  
  const [searchQuery] = useState(initialSearchQuery);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {searchQuery ? `Search Results: "${searchQuery}"` : "All Products"}
        </h1>
        <p className="text-gray-600">
          {searchQuery 
            ? `Showing products matching your search for "${searchQuery}"`
            : "Browse our entire catalog of quality agricultural products"
          }
        </p>
      </div>
      
      <ProductGrid searchQuery={searchQuery} />
    </div>
  );
};

export default ProductsPage;
