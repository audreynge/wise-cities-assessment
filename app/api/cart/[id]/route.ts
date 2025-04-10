import { NextResponse } from "next/server"
import { removeFromCart, updateCartItem } from "@/lib/data"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await removeFromCart(params.id)

    if (!result) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing from cart:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { quantity } = await request.json()

    if (quantity === undefined) {
      return NextResponse.json({ error: "Quantity is required" }, { status: 400 })
    }

    const result = await updateCartItem(params.id, quantity)

    if (!result) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating cart:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
