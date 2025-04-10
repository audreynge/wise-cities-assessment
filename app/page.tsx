import ProductGrid from "@/components/product-grid"
import { getProducts } from "@/lib/data"

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="space-y-8">
      <div className="w-full bg-black rounded-lg overflow-hidden">
        <img
          src="/images/airpods.png"
          alt="Featured Product"
          className="w-full h-[200px] md:h-[300px] object-contain"
        />
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p className="text-gray-500">We're having trouble loading products right now. Please try again later.</p>
        </div>
      )}
    </div>
  )
}
