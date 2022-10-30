import Image from "next/image"
import Link from "next/link"

export const Navbar = () => {
  return (
    <header className="absolute top-0 px-6 h-20 w-full bg-slate-900 flex justify-center sm:justify-between items-center">
      <div className="flex items-center">
        <Link href="/">
          <Image priority width={150} height={45} src="/logo.svg" alt="Logo" />
        </Link>
      </div>
      <div className="hidden sm:flex">
        <Link
          className="py-2 px-3 bg-pink-300 rounded font-semibold text-black text-sm w-full transition-colors hover:bg-pink-200 focus:ring-2 ring-white"
          href="/register">
          Create Account
        </Link>
      </div>
    </header>
  )
}
