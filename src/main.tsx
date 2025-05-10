
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set up a mock user for testing the profile page
if (!localStorage.getItem("currentUser")) {
  const mockUser = {
    id: "user123",
    name: "John Farmer",
    email: "john@farmersupply.com",
    phone: "+91 9876543210",
    address: "123 Farm Lane, Rural District"
  };
  localStorage.setItem("currentUser", JSON.stringify(mockUser));
  
  // Add some sample crop listings for the user
  const mockListings = [
    {
      id: "crop1",
      name: "Organic Wheat",
      description: "Premium quality organic wheat harvested from sustainable farms",
      quantity: 500,
      price: 45.50,
      category: "Grains",
      harvestDate: new Date("2023-10-15"),
      quality: "Premium",
      photos: ["https://images.unsplash.com/photo-1574323347407-f5e1ed40c17c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"],
      sellerId: "user123",
      sellerName: "John Farmer",
      location: "Maharashtra",
      dateAdded: new Date("2023-09-20"),
      status: "active"
    },
    {
      id: "crop2",
      name: "Fresh Tomatoes",
      description: "Freshly harvested ripe tomatoes perfect for sauces and salads",
      quantity: 100,
      price: 25.00,
      category: "Vegetables",
      harvestDate: new Date("2023-11-01"),
      quality: "Standard",
      photos: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"],
      sellerId: "user123",
      sellerName: "John Farmer",
      location: "Karnataka",
      dateAdded: new Date("2023-10-05"),
      status: "sold",
      soldUnits: 75,
      revenue: 1875.00
    },
    {
      id: "crop3",
      name: "Basmati Rice",
      description: "Premium long-grain basmati rice with aromatic flavor",
      quantity: 300,
      price: 65.75,
      category: "Grains",
      harvestDate: new Date("2023-09-30"),
      quality: "Premium",
      photos: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"],
      sellerId: "user123",
      sellerName: "John Farmer",
      location: "Punjab",
      dateAdded: new Date("2023-10-10"),
      status: "active"
    }
  ];
  
  localStorage.setItem("cropListings", JSON.stringify(mockListings));
}

createRoot(document.getElementById("root")!).render(<App />);
