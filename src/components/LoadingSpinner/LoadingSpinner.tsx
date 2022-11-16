import clsx from "clsx"
import { HTMLAttributes, useContext } from "react"
import { ThemeContext } from "utils/ThemeProvider"

interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {}

export const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center h-screen pointer-events-none">
      <div
        className={clsx(
          "w-[200px] h-[200px] border-[20px] rounded-full animate-spin-slow",
          `border-${theme}/50 border-l-${theme}`
        )}
        {...props}></div>
    </div>
  )
}
