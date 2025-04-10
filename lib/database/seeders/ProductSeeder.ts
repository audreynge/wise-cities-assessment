import type { EntityManager } from "@mikro-orm/core"
import { Seeder } from "@mikro-orm/seeder"
import { Product } from "../entities/Product"

export class ProductSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const products = [
      {
        name: "Wireless Earbuds",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum, felis ut tempor tempus, tellus eros scelerisque est, quis feugiat arcu libero vitae augue.",
        price: 189.99,
        imageUrl: "/images/airpods.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Premium Headphones",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum, felis ut tempor tempus, tellus eros scelerisque est.",
        price: 249.99,
        imageUrl: "/images/airpods.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Noise Cancelling Earbuds",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum, felis ut tempor tempus, tellus eros scelerisque est.",
        price: 199.99,
        imageUrl: "/images/airpods.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sport Earbuds",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum, felis ut tempor tempus, tellus eros scelerisque est.",
        price: 159.99,
        imageUrl: "/images/airpods.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wireless Charging Case",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum, felis ut tempor tempus, tellus eros scelerisque est.",
        price: 79.99,
        imageUrl: "/images/airpods.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Limited Edition Earbuds",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum, felis ut tempor tempus, tellus eros scelerisque est.",
        price: 229.99,
        imageUrl: "/images/airpods.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    products.forEach((productData) => {
      em.create(Product, productData)
    })
  }
}
