import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProducts, saveProduct } from "@/lib/products-store";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { Product } from "@/types/ecommerce";

async function isAuthorizedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const admin = await verifyAdminToken(token);
  return Boolean(admin);
}


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");

    let products = await getProducts();

    if (category && category !== "All") {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (featured === "true") {
      products = products.filter((p) => p.isFeatured);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("API GET /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const isAuth = await isAuthorizedAdmin();
    if (!isAuth) {
      return NextResponse.json(
        { error: "Unauthorized: Executive admin session required" },
        { status: 401 }
      );
    }

    const body = await request.json();


    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { error: "Name, price, and category are required" },
        { status: 400 }
      );
    }

    const slug = body.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newProduct: Product = {
      id: body.id || `${slug}-${Date.now().toString().slice(-4)}`,
      name: body.name,
      tagline: body.tagline || "Handcrafted pure luxury skincare formulation",
      category: body.category,
      price: Math.max(0, Number(body.price) || 0),
      originalPrice: body.originalPrice ? Math.max(0, Number(body.originalPrice) || 0) : undefined,
      image: body.image || "/cosmetic1.avif",
      gallery: body.gallery && body.gallery.length > 0 ? body.gallery : [body.image || "/cosmetic1.avif"],
      description: body.description || "A masterfully balanced botanical formulation crafted for radiant skin health.",
      benefits: Array.isArray(body.benefits)
        ? body.benefits
        : typeof body.benefits === "string"
        ? body.benefits.split("\n").filter(Boolean)
        : ["Restores skin moisture barrier", "Illuminates complexion", "Dermatologically tested"],
      ingredients: Array.isArray(body.ingredients)
        ? body.ingredients
        : typeof body.ingredients === "string"
        ? body.ingredients.split("\n").filter(Boolean)
        : ["Botanical Plant Extracts", "Squalane", "Hyaluronic Acid"],
      howToUse: body.howToUse || "Gently massage a few drops into clean skin morning and night.",
      size: body.size || "50ml / 1.7 fl oz",
      skinType: body.skinType || "All Skin Types",
      rating: body.rating ? Math.min(5, Math.max(1, Number(body.rating) || 5)) : 5.0,
      reviewCount: body.reviewCount ? Math.max(0, Math.floor(Number(body.reviewCount) || 1)) : 1,
      stock: body.stock !== undefined ? Math.max(0, Math.floor(Number(body.stock) || 0)) : 50,
      isFeatured: Boolean(body.isFeatured),
      isBestSeller: Boolean(body.isBestSeller),

      createdAt: new Date().toISOString(),
    };

    const saved = await saveProduct(newProduct);
    return NextResponse.json({ success: true, product: saved }, { status: 201 });
  } catch (error) {
    console.error("API POST /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const isAuth = await isAuthorizedAdmin();
    if (!isAuth) {
      return NextResponse.json(
        { error: "Unauthorized: Executive admin session required" },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "Product id is required" }, { status: 400 });
    }

    const saved = await saveProduct(body);
    return NextResponse.json({ success: true, product: saved });
  } catch (error) {
    console.error("API PUT /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
