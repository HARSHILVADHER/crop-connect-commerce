
import { useParams } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  
  const getCategoryTitle = (cat?: string) => {
    if (!cat) return "Products";
    
    switch (cat.toLowerCase()) {
      case "seeds":
        return "Seeds";
      case "fertilizers":
        return "Fertilizers";
      case "pesticides":
        return "Pesticides";
      case "insecticides":
        return "Insecticides";
      default:
        return "Products";
    }
  };
  
  const getCategoryDescription = (cat?: string) => {
    if (!cat) return "Browse all our products";
    
    switch (cat.toLowerCase()) {
      case "seeds":
        return "High-quality seeds for various crops to ensure a successful harvest.";
      case "fertilizers":
        return "Boost your crop yield with our range of organic and chemical fertilizers.";
      case "pesticides":
        return "Protect your crops from pests with our effective pesticide solutions.";
      case "insecticides":
        return "Control insect infestations with our range of safe and effective insecticides.";
      default:
        return "Browse all our products";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{getCategoryTitle(category)}</h1>
        <p className="text-gray-600">{getCategoryDescription(category)}</p>
      </div>
      
      <ProductGrid category={category} />
    </div>
  );
};

export default CategoryPage;
