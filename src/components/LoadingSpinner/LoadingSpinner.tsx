import { HTMLAttributes } from "react"

interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {}

export const LoadingSpinner = (props: LoadingSpinnerProps) => {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center h-screen pointer-events-none">
      <div
        className={`w-[200px] h-[200px] border-[20px] rounded-full animate-spin-slow border-l-slate-800 border-t-slate-900 border-r-slate-900 border-b-slate-900`}
        {...props}></div>
    </div>
  )
}
