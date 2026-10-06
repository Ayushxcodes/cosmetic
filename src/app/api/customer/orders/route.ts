import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifyAdminToken(token);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Find orders belonging to customer by customerId or email
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          { customerId: session.id },
          { customerEmail: session.email.toLowerCase() },
        ],
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      customer: {
        id: session.id,
        email: session.email,
        name: session.name,
        role: session.role,
      },
      orders: orders.map((o) => ({
        id: o.id,
        createdAt: o.createdAt.toISOString(),
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
        items: o.items.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          size: item.size || undefined,
        })),
        subtotal: o.subtotal,
        shippingFee: o.shippingFee,
        discount: o.discount,
        total: o.total,
        couponCode: o.couponCode || undefined,
        paymentMethod: o.paymentMethod,
        paymentStatus: o.paymentStatus,
        orderStatus: o.orderStatus,
        notes: o.notes || undefined,
        estimatedDelivery: o.estimatedDelivery || undefined,
      })),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to load orders";
    console.error("Customer orders API error:", msg);
    return NextResponse.json(
      { success: false, error: "Internal server error fetching orders." },
      { status: 500 }
    );
  }
}
