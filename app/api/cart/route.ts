import { NextResponse } from "next/server"
import { getCart, addToCart } from "@/lib/data"

export async function GET() {
  try {
    const cartItems = await getCart()
    return NextResponse.json(cartItems)
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { productId, quantity = 1 } = await request.json()

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const result = await addToCart(productId, quantity)

    return NextResponse.json({ success: true, item: result })
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
