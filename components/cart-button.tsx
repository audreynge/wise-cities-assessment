"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { addEventListener } from "@/lib/events"
import type { CartItem } from "@/lib/types"
import axios from "axios"

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchCartCount = async () => {
    try {
      setIsLoading(true)

      const response = await axios.get("/api/cart")
      const data = response.data

      console.log("Fetched Cart Data:", data)

      let cartItems = []
      if (Array.isArray(data)) {
        cartItems = data
      } else if (data && typeof data === "object") {
        cartItems = data.items || data.cartItems || []
      }

      const count = cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0)
      setItemCount(count)
    } catch (error) {
      console.error("Error fetching cart count:", error)
      setItemCount(0)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCartCount()

    const removeListener = addEventListener("cart-updated", fetchCartCount)
    const interval = setInterval(fetchCartCount, 30000) // every 30 seconds

    return () => {
      clearInterval(interval)
      removeListener()
    }
  }, [])

  return (
    <div className="relative">
      <Link href="/cart">
        <div className="w-6 h-6 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>

          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </div>
      </Link>
    </div>
  )
}
