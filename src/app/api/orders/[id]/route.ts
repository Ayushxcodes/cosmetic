import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getOrderById, updateOrderStatus } from "@/lib/products-store";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { OrderStatus } from "@/types/ecommerce";

async function isAuthorizedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const admin = await verifyAdminToken(token);
  return Boolean(admin);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await getOrderById(id);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("API GET /api/orders/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAuthorizedAdmin();
    if (!isAuth) {
      return NextResponse.json(
        { error: "Unauthorized: Executive admin session required" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const body = await request.json();
    const status = body.status as OrderStatus;

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    const updated = await updateOrderStatus(id, status);

    if (!updated) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("API PATCH /api/orders/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
