import type { Product } from "./types"
import { Pool } from "pg"
import dotenv from "dotenv"
dotenv.config()

const pool = new Pool({
  connectionString: process.env.DB_URL,
})

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
}

// gets all products
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await pool.query("SELECT * FROM product")
    return res.rows
  } catch (error) {
    console.error("Error fetching products:", error)
    return [] // fallback
  }
}

// get product by id
export async function getProduct(id: string): Promise<Product | undefined> {
  try {
    const res = await pool.query("SELECT * FROM product WHERE id = $1", [id])
    return res.rows[0]
  } catch (error) {
    console.error("Error fetching product:", error)
    return undefined
  }
}

export async function getRelatedProducts(id: string): Promise<Product[] | undefined> {
  try {
    const products = await getProducts()
    console.log("Fetched related products successfully")
    return products.filter((product) => product.id !== id).slice(0, 3)
  } catch (error) {
    console.error("Error fetching related products:", error)
  }
}

export async function addToCart(productId: string, quantity = 1) {
  try {
    const res = await pool.query(
      "INSERT INTO cart_item (product_id, quantity, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *",
      [productId, quantity],
    )
    return res.rows[0]
  } catch (error) {
    console.error("Error adding to cart:", error)
    throw error
  }
}

export async function updateCartItem(id: string, quantity: number) {
  try {
    const res = await pool.query("UPDATE cart_item SET quantity = $1 WHERE id = $2 RETURNING *", [quantity, id])
    return res.rows[0]
  } catch (error) {
    console.error("Error updating cart:", error)
    throw error
  }
}

export async function removeFromCart(id: string) {
  try {
    const res = await pool.query("DELETE FROM cart_item WHERE id = $1 RETURNING *", [id])
    return res.rows[0]
  } catch (error) {
    console.error("Error removing from cart:", error)
    throw error
  }
}

export async function getCart() {
  try {
    const res = await pool.query(`
      SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.description, p.price, p.image_url as "imageUrl"
      FROM cart_item ci
      JOIN product p ON ci.product_id = p.id
    `)

    // match CartItem structure
    const cartItems = res.rows.map((row) => ({
      id: row.id,
      quantity: row.quantity,
      product: {
        id: row.product_id,
        name: row.name,
        description: row.description,
        price: row.price,
        imageUrl: row.imageUrl,
      },
    }))

    console.log("Fetched cart items successfully:", cartItems)
    return cartItems
  } catch (error) {
    console.error("Error fetching cart:", error)
    return []
  }
}
