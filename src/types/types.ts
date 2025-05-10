
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "seeds" | "fertilizers" | "pesticides" | "insecticides" | "other";
  imageUrl: string;
  stock: number;
  seller?: string;
  rating?: number;
  reviews?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  listedProducts?: Product[];
}

export interface CropListing {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  harvestDate: Date;
  quality: string;
  photos: string[];
  sellerId: string;
  sellerName: string;
  location: string;
  dateAdded: Date;
  soldUnits?: number;
  revenue?: number;
  status?: 'active' | 'sold' | 'expired';
}
