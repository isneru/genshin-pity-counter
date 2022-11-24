import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import { themeValues } from "utils/types"

type Children = {
  children: ReactNode
}

interface ThemeContextData {
  theme: themeValues
  setTheme: Dispatch<SetStateAction<themeValues>>
}

export const ThemeContext = createContext({} as ThemeContextData)

export const ThemeProvider = ({ children }: Children) => {
  const [theme, setTheme] = useState<themeValues>("pyro")

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
