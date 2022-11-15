import * as Dialog from "@radix-ui/react-dialog"
import * as RadioGroup from "@radix-ui/react-radio-group"
import clsx from "clsx"
import { Palette } from "phosphor-react"
import { useContext } from "react"
import { ThemeContext } from "utils/ThemeProvider"

export const ThemeSwitcher = () => {
  const { themes, theme, setTheme } = useContext(ThemeContext)

  return (
    <form className="absolute bottom-5 right-5">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            className={clsx("bg-white flex items-center justify-center rounded-full w-12 h-12", {
              "text-pyro": theme === "pyro",
              "text-anemo": theme === "anemo",
              "text-hydro": theme === "hydro",
              "text-electro": theme === "electro",
              "text-dendro": theme === "dendro",
              "text-cryo": theme === "cryo",
              "text-geo": theme === "geo"
            })}>
            <Palette weight="fill" size={36} className="drop-shadow-2xl" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content
            className={clsx(
              "fixed bg-black py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-[90vw] shadow-lg shadow-black/25 flex items-center justify-center border-2",
              {
                "border-pyro": theme === "pyro",
                "border-anemo": theme === "anemo",
                "border-hydro": theme === "hydro",
                "border-electro": theme === "electro",
                "border-dendro": theme === "dendro",
                "border-cryo": theme === "cryo",
                "border-geo": theme === "geo"
              }
            )}>
            <RadioGroup.Root
              defaultValue={theme}
              className="flex gap-4"
              onValueChange={(value: "pyro" | "anemo" | "hydro" | "electro" | "dendro" | "cryo" | "geo") =>
                setTheme(value)
              }>
              {themes.map(themeValue => {
                return (
                  <div className="flex gap-1 items-center">
                    <RadioGroup.Item
                      className="rounded-full w-5 h-5 bg-white hover:bg-zinc-300"
                      value={themeValue}
                      id={themeValue}>
                      <RadioGroup.Indicator
                        className={clsx(
                          "flex items-center justify-center w-full h-full relative after:block after:w-1/2 after:h-1/2 after:rounded-full",
                          {
                            "after:bg-pyro": themeValue === "pyro",
                            "after:bg-anemo": themeValue === "anemo",
                            "after:bg-hydro": themeValue === "hydro",
                            "after:bg-electro": themeValue === "electro",
                            "after:bg-dendro": themeValue === "dendro",
                            "after:bg-cryo": themeValue === "cryo",
                            "after:bg-geo": themeValue === "geo"
                          }
                        )}
                      />
                    </RadioGroup.Item>
                    <label htmlFor={themeValue}>{themeValue.charAt(0).toUpperCase() + themeValue.slice(1)}</label>
                  </div>
                )
              })}
            </RadioGroup.Root>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </form>
  )
}
