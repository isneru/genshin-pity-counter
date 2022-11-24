import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (): ButtonProps => {
  return <button>Button</button>
}
