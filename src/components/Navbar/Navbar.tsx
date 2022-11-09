import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { ThemeContext } from "utils/ThemeProvider"

export const Navbar = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <header className="py-6 px-6 h-20 w-full sm:py-6 sm:px-0 sm:h-full sm:w-[200px] flex justify-between items-center sm:flex-col">
      <div className="flex items-center">
        <Link href="/">
          <Image priority width={150} height={45} src="/logo.svg" alt="Logo" />
        </Link>
      </div>
      <div className="flex">
        <Link
          className={clsx("py-2 px-3 rounded font-semibold text-white text-sm w-full transition-colors focus:ring-2", {
            "bg-pyro/50 hover:bg-pyro ring-pyro": theme === "pyro",
            "bg-anemo/50 hover:bg-anemo ring-anemo": theme === "anemo",
            "bg-hydro/50 hover:bg-hydro ring-hydro": theme === "hydro",
            "bg-electro/50 hover:bg-electro ring-electro": theme === "electro",
            "bg-dendro/50 hover:bg-dendro ring-dendro": theme === "dendro",
            "bg-cryo/50 hover:bg-cryo ring-cryo": theme === "cryo",
            "bg-geo/50 hover:bg-geo ring-geo": theme === "geo"
          })}
          href="/register">
          Create Account
        </Link>
      </div>
    </header>
  )
}
