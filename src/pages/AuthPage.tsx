
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";

type AuthMode = "login" | "signup";

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically connect to your authentication service
    // For now, we'll just simulate a successful authentication
    console.log("Auth form submitted:", { mode, ...formData });
    
    toast({
      title: mode === "login" ? "Logged in successfully!" : "Account created successfully!",
      description: mode === "login" 
        ? "Welcome back to FarmSupply." 
        : "Your account has been created. Welcome to FarmSupply!",
    });
    
    // Redirect to home page after successful authentication
    navigate("/");
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    // Reset form when toggling between login and signup
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-6 bg-primary/10 border-b text-center">
            <h1 className="text-2xl font-bold">
              {mode === "login" ? "Login to Your Account" : "Create an Account"}
            </h1>
          </div>
          
          <div className="p-6">
            {/* Mode Toggle */}
            <div className="flex border rounded-lg overflow-hidden mb-6">
              <button
                type="button"
                className={`flex-1 py-2 text-center font-medium ${
                  mode === "login" 
                    ? "bg-primary text-white" 
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                type="button"
                className={`flex-1 py-2 text-center font-medium ${
                  mode === "signup" 
                    ? "bg-primary text-white" 
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field (signup only) */}
              {mode === "signup" && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}
              
              {/* Email field */}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              {/* Password field */}
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={mode === "login" ? "Enter your password" : "Create a password"}
                  required
                />
              </div>
              
              {/* Confirm Password field (signup only) */}
              {mode === "signup" && (
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}
              
              {/* Login/Signup button */}
              <Button type="submit" className="w-full">
                {mode === "login" ? "Login" : "Create Account"}
              </Button>
            </form>
            
            {mode === "login" && (
              <div className="mt-4 text-center">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot your password?
                </Link>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {mode === "login" 
                  ? "Don't have an account?" 
                  : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="ml-1 text-primary hover:underline"
                >
                  {mode === "login" ? "Sign up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
