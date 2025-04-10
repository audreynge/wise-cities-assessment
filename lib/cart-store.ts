import type { CartItem } from "./types"

let cartItems: CartItem[] = []

export function getCartItems() {
  return cartItems
}

export function addCartItem(item: CartItem) {
  const existingItemIndex = cartItems.findIndex((i) => i.product.id === item.product.id)

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity += item.quantity
    return cartItems[existingItemIndex]
  } else {
    cartItems.push(item)
    return item
  }
}

export function updateCartItem(id: string, quantity: number) {
  const itemIndex = cartItems.findIndex((item) => item.id === id)

  if (itemIndex === -1) {
    return null
  }

  if (quantity <= 0) {
    cartItems = cartItems.filter((item) => item.id !== id)
    return { removed: true }
  }

  cartItems[itemIndex].quantity = quantity
  return cartItems[itemIndex]
}

export function removeCartItem(id: string) {
  const itemIndex = cartItems.findIndex((item) => item.id === id)

  if (itemIndex === -1) {
    return false
  }

  cartItems = cartItems.filter((item) => item.id !== id)
  return true
}

export function clearCart() {
  cartItems = []
  return true
}
