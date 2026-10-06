import prisma from "@/lib/prisma";
import type { Order as DbOrder, OrderItem as DbOrderItem } from "@prisma/client";
import { Product, Order, OrderStatus, PaymentMethod, PaymentStatus, SettlementStatus } from "@/types/ecommerce";

type PrismaOrderWithItems = DbOrder & { items?: DbOrderItem[] };

// Helper to format Prisma Order model into Order interface
function mapPrismaOrder(o: PrismaOrderWithItems): Order {
  return {
    id: o.id,
    customerId: o.customerId || undefined,
    customer: {
      fullName: o.customerName,
      email: o.customerEmail,
      phone: o.customerPhone,
      address: o.shippingAddress,
      city: o.city,
      state: o.state,
      postalCode: o.postalCode,
      country: o.country,
    },
    items: o.items
      ? o.items.map((i: DbOrderItem) => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
          size: i.size || undefined,
        }))
      : [],
    subtotal: o.subtotal,
    shippingFee: o.shippingFee,
    discount: o.discount,
    total: o.total,
    couponCode: o.couponCode || undefined,
    paymentMethod: o.paymentMethod as PaymentMethod,
    paymentStatus: o.paymentStatus as PaymentStatus,
    paymentReference: o.paymentReference || undefined,
    settlementStatus: (o.settlementStatus as SettlementStatus) || "pending",
    payoutChannel: o.payoutChannel || undefined,
    orderStatus: o.orderStatus as OrderStatus,
    notes: o.notes || undefined,
    estimatedDelivery: o.estimatedDelivery || undefined,
    createdAt: o.createdAt instanceof Date ? o.createdAt.toISOString() : String(o.createdAt),
  };
}

// ---------------- PRODUCTS (PostgreSQL via Prisma) ----------------

export async function getProducts(): Promise<Product[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return dbProducts.map((p) => ({
      ...p,
      category: p.category as Product["category"],
      originalPrice: p.originalPrice || undefined,
      createdAt: p.createdAt.toISOString(),
    }));
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Prisma PostgreSQL error in getProducts():", msg);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const p = await prisma.product.findUnique({
      where: { id },
    });

    if (!p) return null;

    return {
      ...p,
      category: p.category as Product["category"],
      originalPrice: p.originalPrice || undefined,
      createdAt: p.createdAt.toISOString(),
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`Prisma PostgreSQL error in getProductById(${id}):`, msg);
    return null;
  }
}

export async function saveProduct(product: Product): Promise<Product> {
  await prisma.product.upsert({
    where: { id: product.id },
    update: {
      name: product.name,
      tagline: product.tagline,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      gallery: product.gallery,
      description: product.description,
      benefits: product.benefits,
      ingredients: product.ingredients,
      howToUse: product.howToUse,
      size: product.size,
      skinType: product.skinType,
      rating: product.rating,
      reviewCount: product.reviewCount,
      stock: product.stock,
      isFeatured: product.isFeatured,
      isBestSeller: product.isBestSeller,
    },
    create: {
      id: product.id,
      name: product.name,
      tagline: product.tagline,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      gallery: product.gallery,
      description: product.description,
      benefits: product.benefits,
      ingredients: product.ingredients,
      howToUse: product.howToUse,
      size: product.size,
      skinType: product.skinType,
      rating: product.rating,
      reviewCount: product.reviewCount,
      stock: product.stock,
      isFeatured: product.isFeatured,
      isBestSeller: product.isBestSeller,
    },
  });

  return product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await prisma.product.delete({
      where: { id },
    });
    return true;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`Prisma PostgreSQL error in deleteProduct(${id}):`, msg);
    return false;
  }
}

// ---------------- ORDERS (PostgreSQL via Prisma) ----------------

export async function getOrders(): Promise<Order[]> {
  try {
    const dbOrders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    return dbOrders.map(mapPrismaOrder);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Prisma PostgreSQL error in getOrders():", msg);
    return [];
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order) return null;
    return mapPrismaOrder(order);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`Prisma PostgreSQL error in getOrderById(${id}):`, msg);
    return null;
  }
}

export async function saveOrder(order: Order): Promise<Order> {
  const created = await prisma.order.create({
    data: {
      id: order.id,
      customerId: order.customerId,
      customerName: order.customer.fullName,
      customerEmail: order.customer.email,
      customerPhone: order.customer.phone,
      shippingAddress: order.customer.address,
      city: order.customer.city,
      state: order.customer.state,
      postalCode: order.customer.postalCode,
      country: order.customer.country,
      subtotal: order.subtotal,
      shippingFee: order.shippingFee,
      discount: order.discount,
      total: order.total,
      couponCode: order.couponCode,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      paymentReference: order.paymentReference,
      settlementStatus: order.settlementStatus || "pending",
      payoutChannel: order.payoutChannel,
      orderStatus: order.orderStatus,
      notes: order.notes,
      estimatedDelivery: order.estimatedDelivery,
      items: {
        create: order.items.map((i) => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
          size: i.size,
        })),
      },
    },
    include: { items: true },
  });

  return mapPrismaOrder(created);
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null> {
  try {
    const updated = await prisma.order.update({
      where: { id },
      data: {
        orderStatus: status,
        ...(status === "delivered" ? { paymentStatus: "paid", settlementStatus: "settled" } : {}),
      },
      include: { items: true },
    });

    return mapPrismaOrder(updated);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`Prisma PostgreSQL error in updateOrderStatus(${id}):`, msg);
    return null;
  }
}

export async function updateOrderPaymentAndStatus(
  id: string,
  data: {
    orderStatus?: OrderStatus;
    paymentStatus?: PaymentStatus;
    settlementStatus?: SettlementStatus;
    notes?: string;
  }
): Promise<Order | null> {
  try {
    const updated = await prisma.order.update({
      where: { id },
      data: {
        ...(data.orderStatus ? { orderStatus: data.orderStatus } : {}),
        ...(data.paymentStatus ? { paymentStatus: data.paymentStatus } : {}),
        ...(data.settlementStatus ? { settlementStatus: data.settlementStatus } : {}),
        ...(data.notes ? { notes: data.notes } : {}),
      },
      include: { items: true },
    });

    return mapPrismaOrder(updated);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`Prisma PostgreSQL error in updateOrderPaymentAndStatus(${id}):`, msg);
    return null;
  }
}
