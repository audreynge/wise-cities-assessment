import { getProduct, getRelatedProducts } from "@/lib/data"
import ProductDetail from "@/components/product-detail"
import SimilarProducts from "@/components/similar-products"
import { notFound } from "next/navigation"

export default async function ProductPage(context: { params : Promise<{ id: string }> }) {
  const { id }= await context.params;
  const product = await getProduct(id);

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(id);

  return (
    <div className="space-y-8">
      <ProductDetail product={product} />
      <hr className="my-8" />
      {relatedProducts.length > 0 ? (
        <SimilarProducts products={relatedProducts} />
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500">No related products found</p>
        </div>
      )}
    </div>
  )
}
