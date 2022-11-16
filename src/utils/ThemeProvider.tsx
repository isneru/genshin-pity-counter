import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import { themeValues } from "./types"

type Children = {
  children: ReactNode
}

interface ThemeContextData {
  themes: string[]
  theme: themeValues
  setTheme: Dispatch<SetStateAction<themeValues>>
}

export const ThemeContext = createContext({} as ThemeContextData)

export const ThemeProvider = ({ children }: Children) => {
  const themes = ["pyro", "anemo", "hydro", "electro", "dendro", "cryo", "geo"]
  const [theme, setTheme] = useState<themeValues>("pyro")

  return <ThemeContext.Provider value={{ themes, theme, setTheme }}>{children}</ThemeContext.Provider>
}
