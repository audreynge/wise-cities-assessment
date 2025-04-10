import Link from "next/link"
import { Button } from "@heroui/button"

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
      <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
      <Link href="/">
        <Button>Browse Products</Button>
      </Link>
    </div>
  )
}
