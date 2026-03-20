export interface VanVehicle {
  id: number;
  brand: string;
  model: string;
  category: string;
  cargoCapacity: number; // In liters
  seats: number;
  year?: number; // Optional property (indicated by ?)
  imageUrl?: string; // Useful for later when we add photos
}
