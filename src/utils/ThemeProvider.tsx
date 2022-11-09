import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

type Children = {
  children: ReactNode
}

interface ThemeContextData {
  theme: "pyro" | "anemo" | "hydro" | "electro" | "dendro" | "cryo" | "geo"
  setTheme: Dispatch<SetStateAction<"pyro" | "anemo" | "hydro" | "electro" | "dendro" | "cryo" | "geo">>
}

export const ThemeContext = createContext({} as ThemeContextData)

export const ThemeProvider = ({ children }: Children) => {
  const [theme, setTheme] = useState<"pyro" | "anemo" | "hydro" | "electro" | "dendro" | "cryo" | "geo">("pyro")

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
