import { NextResponse } from "next/server"
import { mockProducts } from "@/lib/mock-data"

export async function GET(request: Request, context: { params : Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const product = mockProducts.find((p) => p.id === id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error in product detail API route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
