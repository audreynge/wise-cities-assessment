"use client"

import { useState } from "react"
import { Button } from "@heroui/button"
import { updateCartItem, removeFromCart } from "@/lib/data"
import { triggerEvent } from "@/lib/events"

interface CartItemActionsProps {
  itemId: string
  quantity: number
  onUpdate: () => void
}

export default function CartItemActions({ itemId, quantity, onUpdate }: CartItemActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleIncrement = async () => {
    try {
      setIsLoading(true)
      setError("")
      await updateCartItem(itemId, quantity + 1)
      triggerEvent("cart-updated")
      onUpdate()
    } catch (error) {
      console.error("Error updating cart:", error)
      setError("Failed to update quantity")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDecrement = async () => {
    if (quantity <= 1) {
      await handleRemove()
      return
    }

    try {
      setIsLoading(true)
      setError("")
      await updateCartItem(itemId, quantity - 1)
      triggerEvent("cart-updated")
      onUpdate()
    } catch (error) {
      console.error("Error updating cart:", error)
      setError("Failed to update quantity")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemove = async () => {
    try {
      setIsLoading(true)
      setError("")
      await removeFromCart(itemId)
      triggerEvent("cart-updated")
      onUpdate()
    } catch (error) {
      console.error("Error removing from cart:", error)
      setError("Failed to remove item")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <button
            className="w-8 h-8 flex items-center justify-center border rounded-l-md"
            onClick={handleDecrement}
            disabled={isLoading}
          >
            -
          </button>
          <span className="w-8 h-8 flex items-center justify-center border-t border-b">{quantity}</span>
          <button
            className="w-8 h-8 flex items-center justify-center border rounded-r-md"
            onClick={handleIncrement}
            disabled={isLoading}
          >
            +
          </button>
        </div>

        <Button variant="bordered" size="sm" onPress={handleRemove} disabled={isLoading}>
          Remove
        </Button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
