import type { Product } from "@/lib/types"
import ProductCard from "@/components/product-card"

interface SimilarProductsProps {
  products: Product[]
}

export default function SimilarProducts({ products }: SimilarProductsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Similar Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
