
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
import { ShoppingBag, PackageCheck, UserRound, Trash2, PieChart, ArrowUpRight, Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user] = useLocalStorageState<User | null>("currentUser", null);
  const [listings, setListings] = useLocalStorageState<CropListing[]>("cropListings", []);
  const [userListings, setUserListings] = useState<CropListing[]>([]);
  const [selectedTab, setSelectedTab] = useState("overview");
  
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
  const activeListing = userListings.filter(listing => listing.status === 'active').length;
  const soldListing = userListings.filter(listing => listing.status === 'sold').length;
  const totalQuantity = userListings.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = userListings.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  const totalRevenue = userListings
    .filter(listing => listing.status === 'sold')
    .reduce((sum, item) => sum + (item.revenue || 0), 0).toFixed(2);
  const totalSoldUnits = userListings
    .filter(listing => listing.status === 'sold')
    .reduce((sum, item) => sum + (item.soldUnits || 0), 0);
  
  // Calculate performance metrics
  const conversionRate = totalListings > 0 ? ((soldListing / totalListings) * 100).toFixed(1) : "0";
  const averagePrice = totalListings > 0 
    ? (userListings.reduce((sum, item) => sum + item.price, 0) / totalListings).toFixed(2)
    : "0.00";

  // Get latest listings
  const recentListings = [...userListings]
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, 3);

  // Mock data for monthly revenue chart (in a real app, this would come from the backend)
  const monthlyRevenue = [
    { month: "Jan", amount: 1200 },
    { month: "Feb", amount: 1800 },
    { month: "Mar", amount: 1400 },
    { month: "Apr", amount: 2200 },
    { month: "May", amount: 1600 },
    { month: "Jun", amount: 2400 },
  ];
  
  const handleDeleteListing = (id: string) => {
    const updatedListings = listings.filter(listing => listing.id !== id);
    setListings(updatedListings);
    
    toast({
      title: "Listing deleted",
      description: "Your crop listing has been removed",
    });
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex gap-4 items-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <UserRound className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/settings")}>
              Edit Profile
            </Button>
            <Button onClick={() => navigate("/sell")} className="bg-primary hover:bg-primary/90">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Sell New Crop
            </Button>
          </div>
        </div>
        
        {/* Main dashboard */}
        <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full md:w-[600px] grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          {/* Overview tab content */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-muted-foreground">Total Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalListings}</div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Active: {activeListing}</Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Sold: {soldListing}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-muted-foreground">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹{totalRevenue}</div>
                  <div className="flex items-center mt-2 text-sm">
                    <div className="text-green-600 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>+12.5% from last month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-muted-foreground">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{conversionRate}%</div>
                  <Progress value={Number(conversionRate)} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">{soldListing} out of {totalListings} listings sold</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-muted-foreground">Units Sold</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalSoldUnits}</div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-muted-foreground">Average price: ₹{averagePrice}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent activity section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Listings</CardTitle>
                  <CardDescription>Your recently added crop listings</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentListings.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Crop Name</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentListings.map((listing) => (
                          <TableRow key={listing.id}>
                            <TableCell className="font-medium">{listing.name}</TableCell>
                            <TableCell>₹{listing.price.toFixed(2)}</TableCell>
                            <TableCell>{listing.quantity} units</TableCell>
                            <TableCell>
                              <Badge 
                                className={
                                  listing.status === 'active' ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                                  listing.status === 'sold' ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
                                  "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                }
                              >
                                {listing.status || "Active"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">You haven't listed any crops yet</p>
                      <Button 
                        variant="outline" 
                        onClick={() => navigate("/sell")} 
                        className="mt-2"
                      >
                        Create Your First Listing
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedTab("listings")} 
                    className="w-full"
                  >
                    View All Listings
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Summary</CardTitle>
                  <CardDescription>Your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-medium">May 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Value</span>
                    <span className="font-medium">₹{totalValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Quantity</span>
                    <span className="font-medium">{totalQuantity} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Price</span>
                    <span className="font-medium">₹{averagePrice}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Contact Information</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Email:</span>
                      <span className="text-sm">{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Phone:</span>
                        <span className="text-sm">{user.phone}</span>
                      </div>
                    )}
                    {user.address && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Address:</span>
                        <span className="text-sm">{user.address}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedTab("account")} 
                    className="w-full"
                  >
                    View Full Profile
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Listings tab content */}
          <TabsContent value="listings" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>All Listings</CardTitle>
                    <CardDescription>Manage your crop listings</CardDescription>
                  </div>
                  <Button onClick={() => navigate("/sell")}>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add New Listing
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
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
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">{listing.name}</CardTitle>
                              <CardDescription className="flex items-center gap-1 mt-1">
                                <Badge variant="outline">{listing.category}</Badge>
                                <Badge 
                                  className={
                                    listing.status === 'active' ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                                    listing.status === 'sold' ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
                                    "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                  }
                                >
                                  {listing.status || "Active"}
                                </Badge>
                              </CardDescription>
                            </div>
                            <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
                              {listing.quality}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-semibold text-lg">₹{listing.price} <span className="text-sm text-muted-foreground font-normal">per unit</span></div>
                            <div className="text-sm text-muted-foreground">{listing.quantity} units</div>
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-2">
                            {listing.description}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {new Date(listing.harvestDate).toLocaleDateString()}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Harvest Date</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {listing.location}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Location</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {new Date(listing.dateAdded).toLocaleDateString()}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Listed on</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-3">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteListing(listing.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
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
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Account tab content */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
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
              <CardFooter className="border-t flex justify-between">
                <Button variant="outline">Update Information</Button>
                <Button variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  Delete Account
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive email updates about your listings</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Payment Methods</h3>
                      <p className="text-sm text-muted-foreground">Manage your payment options</p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Privacy Settings</h3>
                      <p className="text-sm text-muted-foreground">Control your data and privacy options</p>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
