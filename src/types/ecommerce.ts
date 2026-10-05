export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: "Serums" | "Creams & Balms" | "Cleansers" | "Masks" | "Eye Care" | "Ritual Sets";
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  description: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  size: string;
  skinType: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export type PaymentMethod = "cod" | "upi" | "razorpay_demo";
export type PaymentStatus = "pending" | "paid" | "failed";
export type OrderStatus = "placed" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  notes?: string;
  createdAt: string;
  estimatedDelivery?: string;
}
