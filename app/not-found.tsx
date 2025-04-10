import Link from "next/link"
import { Button } from "@heroui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h2 className="text-2xl font-bold mb-2">Not Found</h2>
      <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  )
}
