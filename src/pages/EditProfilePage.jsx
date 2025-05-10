
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRound } from "lucide-react";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorageState("currentUser", null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      toast({
        title: "Access denied",
        description: "Please log in to edit your profile",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Pre-fill form with current user data
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update user data
    const updatedUser = {
      ...user,
      ...formData,
    };
    
    setUser(updatedUser);
    
    // Update any listings with the new name
    const listings = JSON.parse(localStorage.getItem("cropListings") || "[]");
    const updatedListings = listings.map(listing => {
      if (listing.sellerId === user.id) {
        return {
          ...listing,
          sellerName: formData.name,
        };
      }
      return listing;
    });
    
    localStorage.setItem("cropListings", JSON.stringify(updatedListings));
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully",
    });
    
    navigate("/profile");
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <UserRound className="h-12 w-12 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Edit Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your address"
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-6">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditProfilePage;
