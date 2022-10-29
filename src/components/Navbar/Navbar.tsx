import Image from "next/image"
import Link from "next/link"

export const Navbar = () => {
  return (
    <header className="absolute top-0 px-6 h-20 w-full bg-slate-900 flex justify-center sm:justify-between items-center">
      <div className="flex items-center">
        <Link href="/">
          <Image width={150} height={100} src="/logo.svg" alt="Logo" />
        </Link>
      </div>
      <div className="hidden sm:flex">
        <Link href="/register">Create Account</Link>
      </div>
    </header>
  )
}
