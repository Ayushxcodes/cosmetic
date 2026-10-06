"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, CartItem } from "@/types/ecommerce";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  addMultipleToCart: (items: { product: Product; quantity: number; selectedSize?: string }[]) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  couponCode: string;
  appliedCoupon: string | null;
  couponDiscountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toastMessage: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [couponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Load saved state from localStorage after initial hydration mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedCart = localStorage.getItem("niimi_cart");
        if (savedCart) setItems(JSON.parse(savedCart));

        const savedWishlist = localStorage.getItem("niimi_wishlist");
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

        const savedCoupon = localStorage.getItem("niimi_coupon");
        if (savedCoupon) {
          const parsed = JSON.parse(savedCoupon);
          setAppliedCoupon(parsed.code);
          setCouponDiscountPercent(parsed.percent);
        }
      } catch (e) {
        console.error("Failed to load cart state from localStorage:", e);
      } finally {
        setIsMounted(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save cart to localStorage only after mounted
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("niimi_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items, isMounted]);

  // Save wishlist to localStorage only after mounted
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("niimi_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlist, isMounted]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product: Product, quantity = 1, selectedSize?: string) => {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.product.id === product.id);
      if (existing) {
        return prevItems.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prevItems, { product, quantity, selectedSize: selectedSize || product.size }];
    });
    showToast(`Added "${product.name}" to your ritual bag`);
    setIsCartOpen(true);
  };

  const addMultipleToCart = (newItems: { product: Product; quantity: number; selectedSize?: string }[]) => {
    if (newItems.length === 0) return;
    setItems((prevItems) => {
      const updated = [...prevItems];
      for (const item of newItems) {
        const existingIndex = updated.findIndex((i) => i.product.id === item.product.id);
        if (existingIndex > -1) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + item.quantity,
          };
        } else {
          updated.push({
            product: item.product,
            quantity: item.quantity,
            selectedSize: item.selectedSize || item.product.size,
          });
        }
      }
      return updated;
    });
    showToast(`Reordered ${newItems.length} formulations to your ritual bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponDiscountPercent(0);
    try {
      localStorage.removeItem("niimi_cart");
      localStorage.removeItem("niimi_coupon");
    } catch {}
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "NIIMI15") {
      setAppliedCoupon("NIIMI15");
      setCouponDiscountPercent(15);
      localStorage.setItem("niimi_coupon", JSON.stringify({ code: "NIIMI15", percent: 15 }));
      return { success: true, message: "15% Luxury Ritual discount applied!" };
    }
    if (clean === "WELCOME10") {
      setAppliedCoupon("WELCOME10");
      setCouponDiscountPercent(10);
      localStorage.setItem("niimi_coupon", JSON.stringify({ code: "WELCOME10", percent: 10 }));
      return { success: true, message: "10% Welcome gift discount applied!" };
    }
    return { success: false, message: "Invalid or expired promo code" };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscountPercent(0);
    try {
      localStorage.removeItem("niimi_coupon");
    } catch {}
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast("Removed from wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Saved to your wishlist");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount = (subtotal * couponDiscountPercent) / 100;
  // Free shipping above $50 or if cart is empty
  const shippingFee = subtotal === 0 || subtotal >= 50 ? 0 : 8;
  const total = Math.max(0, subtotal - discount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        addMultipleToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shippingFee,
        discount,
        total,
        couponCode,
        appliedCoupon,
        couponDiscountPercent,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        wishlist,
        toggleWishlist,
        isInWishlist,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
