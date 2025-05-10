
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

// Mock data
import { mockProducts } from "@/data/mockProducts";

interface ProductGridProps {
  category?: string;
  searchQuery?: string;
}

const ProductGrid = ({ category, searchQuery }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");
  const [filters, setFilters] = useState({
    maxPrice: 1000,
    minPrice: 0,
    inStock: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // In a real app, fetch products from an API
    let productsToUse = mockProducts;
    
    if (category) {
      productsToUse = mockProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    setProducts(productsToUse);
  }, [category]);

  useEffect(() => {
    if (searchQuery) {
      setLocalSearchQuery(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    let filtered = products;
    
    // Apply search query filter
    if (localSearchQuery) {
      filtered = filtered.filter(
        (product) => 
          product.name.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(localSearchQuery.toLowerCase())
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(
      (product) => 
        product.price >= filters.minPrice && 
        product.price <= filters.maxPrice
    );
    
    // Apply stock filter
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.stock > 0);
    }
    
    setFilteredProducts(filtered);
  }, [products, localSearchQuery, filters]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already handled by the useEffect above
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : Number(value),
    }));
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Input
            type="text"
            placeholder="Search products..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="absolute right-0 top-0"
            variant="ghost"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
        
        {/* Filter Toggle Button */}
        <Button 
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="md:w-auto"
        >
          <Filter className="h-4 w-4 mr-2" /> Filters
        </Button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mb-6 p-4 border rounded-md bg-gray-50">
          <h3 className="font-medium mb-3">Filter Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Min Price ($)
              </label>
              <Input
                id="minPrice"
                type="number"
                name="minPrice"
                min="0"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
            </div>
            
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Max Price ($)
              </label>
              <Input
                id="maxPrice"
                type="number"
                name="maxPrice"
                min="0"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="flex items-end">
              <div className="flex items-center">
                <input
                  id="inStock"
                  type="checkbox"
                  name="inStock"
                  checked={filters.inStock}
                  onChange={handleFilterChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="inStock" className="ml-2 block text-sm font-medium text-gray-700">
                  In Stock Only
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
      </div>
      
      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No products found</p>
          <p className="mt-2 text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
