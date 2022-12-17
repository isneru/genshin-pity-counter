import clsx from "clsx"
import { HTMLAttributes, useContext } from "react"
import { ThemeContext } from "utils/providers"

interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {}

export const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <div className="pointer-events-none absolute inset-0 flex h-screen items-center justify-center bg-black/50">
      <div
        className={clsx("h-[100px] w-[100px] animate-spin-slow rounded-full border-[20px]", {
          "border-pyro/50 border-l-pyro": theme === "pyro",
          "border-anemo/50 border-l-anemo": theme === "anemo",
          "border-hydro/50 border-l-hydro": theme === "hydro",
          "border-electro/50 border-l-electro": theme === "electro",
          "border-dendro/50 border-l-dendro": theme === "dendro",
          "border-cryo/50 border-l-cryo": theme === "cryo",
          "border-geo/50 border-l-geo": theme === "geo"
        })}
        {...props}></div>
    </div>
  )
}
