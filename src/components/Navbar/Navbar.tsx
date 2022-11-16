import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { ThemeContext } from "utils/ThemeProvider"

export const Navbar = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <header className="py-6 px-6 h-20 w-full flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/">
          <Image priority width={150} height={45} src="/logo.svg" alt="Logo" />
        </Link>
      </div>
      <div className="flex">
        <Link
          className={clsx(
            "py-2 px-3 rounded font-semibold text-white text-sm w-full transition-colors focus:ring-2",
            `bg-${theme}/50 hover:bg-${theme} ring-${theme}`
          )}
          href="/register">
          Create Account
        </Link>
      </div>
    </header>
  )
}
