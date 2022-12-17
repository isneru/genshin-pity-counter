import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { SessionContext, ThemeContext } from "utils/providers"

export const Navbar = () => {
  const { session, setSession } = useContext(SessionContext)
  const { theme } = useContext(ThemeContext)

  function logOut() {
    setSession(undefined)
  }

  return (
    <header className="flex h-20 w-full items-center justify-between py-6 px-6">
      <div className="flex items-center">
        <Link href="/">
          <Image priority width={150} height={45} src="/logo.svg" alt="Logo" />
        </Link>
      </div>
      <div className="flex max-w-sm flex-1 gap-4">
        {session ? (
          <>
            <span className="text-center">Welcome back, {session.user.name}</span>
            <button
              className={clsx(
                "w-full rounded py-2 px-3 text-center text-sm font-semibold text-white transition-colors focus:ring-2",
                {
                  "bg-pyro/50 ring-pyro hover:bg-pyro": theme === "pyro",
                  "bg-anemo/50 ring-anemo hover:bg-anemo": theme === "anemo",
                  "bg-hydro/50 ring-hydro hover:bg-hydro": theme === "hydro",
                  "bg-electro/50 ring-electro hover:bg-electro": theme === "electro",
                  "bg-dendro/50 ring-dendro hover:bg-dendro": theme === "dendro",
                  "bg-cryo/50 ring-cryo hover:bg-cryo": theme === "cryo",
                  "bg-geo/50 ring-geo hover:bg-geo": theme === "geo"
                }
              )}
              onClick={() => logOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              className={clsx(
                "w-full rounded py-2 px-3 text-center text-sm font-semibold text-white transition-colors focus:ring-2",
                {
                  "bg-pyro/50 ring-pyro hover:bg-pyro": theme === "pyro",
                  "bg-anemo/50 ring-anemo hover:bg-anemo": theme === "anemo",
                  "bg-hydro/50 ring-hydro hover:bg-hydro": theme === "hydro",
                  "bg-electro/50 ring-electro hover:bg-electro": theme === "electro",
                  "bg-dendro/50 ring-dendro hover:bg-dendro": theme === "dendro",
                  "bg-cryo/50 ring-cryo hover:bg-cryo": theme === "cryo",
                  "bg-geo/50 ring-geo hover:bg-geo": theme === "geo"
                }
              )}
              href="/register">
              Create Account
            </Link>
            <Link
              className={clsx(
                "w-full rounded py-2 px-3 text-center text-sm font-semibold text-white transition-colors focus:ring-2",
                {
                  "bg-pyro/50 ring-pyro hover:bg-pyro": theme === "pyro",
                  "bg-anemo/50 ring-anemo hover:bg-anemo": theme === "anemo",
                  "bg-hydro/50 ring-hydro hover:bg-hydro": theme === "hydro",
                  "bg-electro/50 ring-electro hover:bg-electro": theme === "electro",
                  "bg-dendro/50 ring-dendro hover:bg-dendro": theme === "dendro",
                  "bg-cryo/50 ring-cryo hover:bg-cryo": theme === "cryo",
                  "bg-geo/50 ring-geo hover:bg-geo": theme === "geo"
                }
              )}
              href="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
