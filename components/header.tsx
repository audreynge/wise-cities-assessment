import Link from "next/link"
import CartButton from "./cart-button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid grid-cols-3 gap-0.5">
            {[...Array(9)].map((_, i) => (
              <span key={i} className="w-1 h-1 bg-black rounded-full" />
            ))}
          </div>
          <span className="font-medium">Not Amazon</span>
        </Link>

        <CartButton />
      </div>
    </header>
  )
}
