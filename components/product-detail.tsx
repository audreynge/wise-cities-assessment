"use client"

import { Button } from "@heroui/button"
import type { Product } from "@/lib/types"
import { addToCart } from "@/lib/data"
import { useState } from "react"
import { triggerEvent } from "@/lib/events"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    try {
      setIsLoading(true)
      await addToCart(product.id, quantity)
      triggerEvent("cart-updated")
    } catch (error) {
      console.error("Failed to add to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-black rounded-lg flex items-center justify-center p-4">
        <img
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          className="max-h-[400px] w-auto object-contain"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>

        <div className="pt-4 space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>

            <div className="flex items-center">
              <Button
                className="w-8 h-8 flex items-center justify-center border rounded-l-md"
                onPress={decrementQuantity}
              >
                -
              </Button>
              <span className="w-8 h-8 flex items-center justify-center border-t border-b">{quantity}</span>
              <Button
                className="w-8 h-8 flex items-center justify-center border rounded-r-md"
                onPress={incrementQuantity}
              >
                +
              </Button>
            </div>
          </div>

          <Button
            className="bg-gray-200 hover:bg-gray-300 text-black rounded px-4 py-2"
            onPress={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? "Adding to Cart..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  )
}
