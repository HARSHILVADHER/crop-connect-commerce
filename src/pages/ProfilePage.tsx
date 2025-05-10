
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { User, CropListing } from "@/types/types";
import { toast } from "@/components/ui/use-toast";
import { ShoppingBag, PackageCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user] = useLocalStorageState<User | null>("currentUser", null);
  const [listings, setListings] = useLocalStorageState<CropListing[]>("cropListings", []);
  const [userListings, setUserListings] = useState<CropListing[]>([]);
  
  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      toast({
        title: "Access denied",
        description: "Please log in to view your profile",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    // Filter listings belonging to current user
    if (listings.length > 0 && user) {
      const filteredListings = listings.filter((listing) => listing.sellerId === user.id);
      setUserListings(filteredListings);
    }
  }, [user, listings, navigate]);

  // Stats calculations
  const totalListings = userListings.length;
  const totalQuantity = userListings.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = userListings.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  const averagePrice = totalListings > 0 
    ? (userListings.reduce((sum, item) => sum + item.price, 0) / totalListings).toFixed(2)
    : "0.00";

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <UserRound className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button onClick={() => navigate("/sell")} className="bg-primary hover:bg-primary/90">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Sell New Crop
          </Button>
        </div>
        
        <Separator className="my-2" />
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-muted-foreground">Total Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalListings}</div>
              <p className="text-xs text-muted-foreground mt-1">Crops currently listed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-muted-foreground">Total Quantity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalQuantity}</div>
              <p className="text-xs text-muted-foreground mt-1">Units of crops</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-muted-foreground">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{totalValue}</div>
              <p className="text-xs text-muted-foreground mt-1">Value of all listings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-muted-foreground">Average Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{averagePrice}</div>
              <p className="text-xs text-muted-foreground mt-1">Per unit</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="account">Account Info</TabsTrigger>
          </TabsList>
          <TabsContent value="listings" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">My Listed Crops</h2>
            {userListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={listing.photos[0]} 
                        alt={listing.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{listing.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {listing.category} • {new Date(listing.harvestDate).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
                          {listing.quality}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="font-semibold text-lg">₹{listing.price} <span className="text-sm text-muted-foreground font-normal">per unit</span></div>
                        <div className="text-sm text-muted-foreground">{listing.quantity} units</div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {listing.description}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div className="text-sm text-muted-foreground">{listing.location}</div>
                      <div className="flex items-center text-sm">
                        <PackageCheck className="h-4 w-4 mr-1 text-primary" />
                        Listed on {new Date(listing.dateAdded).toLocaleDateString()}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <PackageCheck className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-xl font-medium">No crops listed yet</h3>
                <p className="text-muted-foreground mt-2">Start selling your crops today</p>
                <Button onClick={() => navigate("/sell")} className="mt-4">
                  List Your First Crop
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="account" className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Account Information</h2>
            <Card>
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
                <CardDescription>Your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                    <p className="text-lg">{user.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email Address</h3>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                    <p className="text-lg">{user.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                    <p className="text-lg">{user.address || "Not provided"}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button variant="outline" className="w-full mt-4">Edit Profile</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
