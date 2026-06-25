export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  region: "Western India" | "Northern India" | "Southern India" | "Eastern India" | "Central India";
  acres: number;
  pricePerAcres: number;
  category: "Residential" | "Commercial" | "Agricultural" | "Legacy Estate" | "Viticulture";
  description: string;
  image: string;
  verified: boolean;
  amenities: string[];
  zoning: string;
  coords: { x: number; y: number }; // Percentage coords on our interactive vector map
  waterRights: boolean;
  roadAccess: boolean;
  electricity: boolean;
  slope: "Flat" | "Gentle" | "Sloped" | "Terraced";
}

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyName: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  message: string;
  timestamp: string;
}

export interface SearchCriteria {
  searchQuery: string;
  location: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minAcres: number;
  maxAcres: number;
  onlyVerified: boolean;
}
