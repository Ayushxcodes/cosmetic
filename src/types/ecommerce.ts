export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: "Serums" | "Creams & Balms" | "Cleansers" | "Masks" | "Eye Care" | "Ritual Sets" | "Sunscreen & UV" | "Mists & Essences" | string;
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

export type PaymentMethod = "cod" | "upi" | "razorpay_demo" | "razorpay" | "card";
export type PaymentStatus = "pending" | "paid" | "failed" | "pending_verification";
export type SettlementStatus = "settled" | "pending" | "remitted";
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
  customerId?: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  settlementStatus?: SettlementStatus;
  payoutChannel?: string;
  orderStatus: OrderStatus;
  notes?: string;
  createdAt: string;
  estimatedDelivery?: string;
}
