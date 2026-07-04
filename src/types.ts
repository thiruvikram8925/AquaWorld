export interface Product {
  id: string;
  name: string;
  brand: string;
  shortDesc: string;
  fullDesc?: string;
  features: string[];
  technology: string;
  capacity: string;
  installationType: string;
  color: string;
  rating: number;
  price: number;
  originalPrice: number;
  warranty?: string;
  discountBadge: string;
  image: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  count: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  image: string;
  designation?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
