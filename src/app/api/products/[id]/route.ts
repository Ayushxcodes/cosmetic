import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProductById, deleteProduct, saveProduct } from "@/lib/products-store";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

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
    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("API GET /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
    const success = await deleteProduct(id);

    if (!success) {
      return NextResponse.json(
        { error: "Product not found or could not be deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("API DELETE /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
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
    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const updates = await request.json();
    const updated = await saveProduct({ ...product, ...updates });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("API PATCH /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

