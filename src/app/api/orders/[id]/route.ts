import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getOrderById, updateOrderPaymentAndStatus } from "@/lib/products-store";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { OrderStatus, PaymentStatus, SettlementStatus } from "@/types/ecommerce";

async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return await verifyAdminToken(token);
}

/**
 * GET /api/orders/[id]
 * Retrieves single order details with ownership verification.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await getOrderById(id);

    if (!order) {
      return NextResponse.json({ error: "Order record not found" }, { status: 404 });
    }

    const session = await getAuthenticatedUser();

    // If an authenticated session exists and user is a customer, verify ownership
    if (session && session.role !== "admin" && session.role !== "superadmin") {
      const isOwner =
        order.customer.email.toLowerCase() === session.email.toLowerCase() ||
        order.customerId === session.id;

      if (!isOwner) {
        return NextResponse.json(
          { error: "Access denied. You do not have permission to view this order." },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("API GET /api/orders/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch order details" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/orders/[id]
 * Strictly restricted to administrators:
 * Updates orderStatus, paymentStatus (e.g. approve UPI UTR), settlementStatus, and notes.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAuthenticatedUser();
    if (!session || (session.role !== "admin" && session.role !== "superadmin")) {
      return NextResponse.json(
        { error: "Forbidden: Executive administrator credentials required to modify orders." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const orderStatus = (body.orderStatus ?? body.status) as OrderStatus | undefined;
    const paymentStatus = body.paymentStatus as PaymentStatus | undefined;
    const settlementStatus = body.settlementStatus as SettlementStatus | undefined;
    const notes = typeof body.notes === "string" ? body.notes : undefined;

    const updated = await updateOrderPaymentAndStatus(id, {
      orderStatus,
      paymentStatus,
      settlementStatus,
      notes,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Order record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("API PATCH /api/orders/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update order record" },
      { status: 500 }
    );
  }
}
