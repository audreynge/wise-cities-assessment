"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import { Button } from "@heroui/button"
import type { CartItem } from "@/lib/types"

export default function CartPageClient() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState<boolean>(false)

  const fetchCart = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await axios.get("/api/cart")

      console.log("raw API response:", response.data)

      let processedItems: CartItem[] = []

      if (Array.isArray(response.data)) {
        processedItems = response.data
      } else if (response.data && typeof response.data === "object") {
        const items = response.data.items || response.data.cartItems || []
        if (Array.isArray(items)) {
          processedItems = items
        }
      }

      console.log("Processed cart items:", processedItems)

      setCartItems(processedItems)
    } catch (error) {
      console.error("Error fetching cart:", error)
      setError("Failed to load cart items")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsClient(true)
    fetchCart()
  }, [])

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      if (newQuantity <= 0) {
        await removeItem(itemId)
        return
      }

      await axios.patch(`/api/cart/${itemId}`, { quantity: newQuantity })
      fetchCart() // refresh
    } catch (error) {
      console.error("Error updating quantity:", error)
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      await axios.delete(`/api/cart/${itemId}`)
      fetchCart()
    } catch (error) {
      console.error("Error removing item:", error)
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId)) // fallback
    }
  }

  const subtotal = cartItems.reduce((total, item) => {
    if (item && item.product && typeof item.product.price === "number") {
      return total + item.product.price * item.quantity
    }
    return total
  }, 0)

  console.log("Current cart state:", {
    itemCount: cartItems.length,
    isEmpty: cartItems.length === 0,
    items: cartItems,
  })

  if (!isClient) {
    return null // prevents server-side rendering
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-red-500 mb-4">{error}</p>
        <Button onClick={fetchCart}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-black rounded">
                          <img
                            className="h-10 w-10 object-contain"
                            src={item.product?.imageUrl || "/placeholder.svg"}
                            alt={item.product?.name || "Product"}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.product?.name || "Unknown Product"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.product?.price?.toFixed(2) || "0.00"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button
                          className="w-8 h-8 flex items-center justify-center border rounded-l-md"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center border-t border-b">
                          {item.quantity}
                        </span>
                        <button
                          className="w-8 h-8 flex items-center justify-center border rounded-r-md"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="bordered" size="sm" onClick={() => removeItem(item.id)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center p-6 bg-gray-50 rounded-lg">
            <div>
              <p className="text-lg font-medium">Subtotal</p>
              <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout</p>
            </div>
            <div className="text-xl font-bold">${subtotal.toFixed(2)}</div>
          </div>

          <div className="flex justify-between">
            <Link href="/">
              <Button variant="bordered">Continue Shopping</Button>
            </Link>
            <Button>Checkout</Button>
          </div>
        </div>
      )}
    </div>
  )
}
