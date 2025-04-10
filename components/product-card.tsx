"use client"

import Link from "next/link"
import { Button } from "@heroui/button"
import type { Product } from "@/lib/types"
import { useState } from "react"
import { triggerEvent } from "@/lib/events"
import axios from "axios"

interface ProductCardProps {
  product: Product
  showQuantitySelector?: boolean
}

export default function ProductCard({ product, showQuantitySelector = false }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    try {
      setIsLoading(true)
      await axios.post("/api/cart", { productId: product.id, quantity })
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
    <div className="border rounded-lg overflow-hidden bg-white">
      <Link href={`/products/${product.id}`} className="block">
        <div className="bg-black h-64 flex items-center justify-center">
          <img src={product.imageUrl || "/placeholder.svg"} alt={product.name} className="h-48 w-auto object-contain" />
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-3 h-12">{product.description}</p>
        </Link>

        <div className="flex items-center justify-between pt-2">
          <span className="font-bold">${product.price.toFixed(2)}</span>

          {showQuantitySelector ? (
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
          ) : (
            <Button
              size="sm"
              className="bg-gray-200 hover:bg-gray-300 text-black text-xs px-3 py-1 h-8 rounded"
              onPress={handleAddToCart}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add to Cart"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
