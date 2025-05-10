
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { X, Plus } from "lucide-react";

const SellPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
    harvestDate: "",
    quality: "Standard",
    location: "",
  });

  const [photos, setPhotos] = useState<string[]>([]);
  const [photoURLs, setPhotoURLs] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && photos.length + files.length <= 5) {
      // Convert FileList to array and create URLs
      const newPhotos = Array.from(files);
      const newURLs = newPhotos.map(file => URL.createObjectURL(file));
      
      // Update state
      setPhotos([...photos, ...newPhotos.map(p => p.name)]);
      setPhotoURLs([...photoURLs, ...newURLs]);
    } else {
      toast({
        title: "Too many photos",
        description: "You can upload a maximum of 5 photos.",
        variant: "destructive",
      });
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = [...photos];
    const updatedPhotoURLs = [...photoURLs];
    
    // Revoke the URL to avoid memory leaks
    URL.revokeObjectURL(updatedPhotoURLs[index]);
    
    // Remove the photo from arrays
    updatedPhotos.splice(index, 1);
    updatedPhotoURLs.splice(index, 1);
    
    setPhotos(updatedPhotos);
    setPhotoURLs(updatedPhotoURLs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (photos.length === 0) {
      toast({
        title: "Photos required",
        description: "Please upload at least one photo of your crop.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically send this data to your backend
    // For now, we'll just show a success message
    console.log("Form submitted:", { ...formData, photos });
    
    toast({
      title: "Listing created successfully!",
      description: "Your crop has been listed for sale.",
    });
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      category: "",
      quantity: "",
      price: "",
      harvestDate: "",
      quality: "Standard",
      location: "",
    });
    
    // Clean up photo URLs and reset photos
    photoURLs.forEach(url => URL.revokeObjectURL(url));
    setPhotos([]);
    setPhotoURLs([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-6 bg-primary/10 border-b">
            <h1 className="text-3xl font-bold">Sell Your Crops</h1>
            <p className="text-gray-600 mt-2">
              List your agricultural products for sale on our marketplace.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Basic Information</h2>
              
              <div>
                <Label htmlFor="name">Crop Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Organic Red Wheat"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="grains">Grains</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="herbs">Herbs</option>
                  <option value="dairy">Dairy</option>
                  <option value="meat">Meat</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your crop, including variety, growing methods, etc."
                  rows={4}
                  required
                />
              </div>
            </div>
            
            {/* Quantity & Price */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Quantity & Price</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity Available</Label>
                  <div className="flex">
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="e.g., 100"
                      required
                    />
                    <select
                      className="ml-2 w-24 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="kg">kg</option>
                      <option value="tons">tons</option>
                      <option value="pieces">pieces</option>
                      <option value="bags">bags</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="price">Price per Unit ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g., 2.50"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Quality & Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Quality & Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="harvestDate">Harvest Date</Label>
                  <Input
                    id="harvestDate"
                    name="harvestDate"
                    type="date"
                    value={formData.harvestDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="quality">Quality</Label>
                  <select
                    id="quality"
                    name="quality"
                    value={formData.quality}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="Premium">Premium</option>
                    <option value="Standard">Standard</option>
                    <option value="Economy">Economy</option>
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Fresno, CA"
                  required
                />
              </div>
            </div>
            
            {/* Photos */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Photos</h2>
                <p className="text-sm text-gray-500">
                  {photos.length}/5 photos uploaded
                </p>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {photoURLs.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {photoURLs.map((url, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={url} 
                          alt={`Crop photo ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-1 right-1 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4 text-gray-700" />
                        </button>
                      </div>
                    ))}
                    
                    {photos.length < 5 && (
                      <label className="border-2 border-dashed border-gray-300 rounded-md h-24 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                          multiple
                        />
                        <Plus className="h-8 w-8 text-gray-400" />
                      </label>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="flex flex-col items-center justify-center cursor-pointer">
                      <Plus className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-gray-600 font-medium">Add Photos</span>
                      <p className="text-gray-500 text-sm mt-1">Upload 1-5 photos of your crop</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        multiple
                      />
                    </label>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-500">
                Upload at least one photo of your crop. Maximum 5 photos allowed.
              </p>
            </div>
            
            <div className="pt-4 border-t">
              <Button type="submit" className="w-full md:w-auto">
                Create Listing
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
