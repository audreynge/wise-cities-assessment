export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}
