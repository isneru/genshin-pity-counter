import * as Dialog from "@radix-ui/react-dialog"
import * as RadioGroup from "@radix-ui/react-radio-group"
import clsx from "clsx"
import { Palette, X } from "phosphor-react"
import { useContext } from "react"
import { themes } from "utils/data"
import { ThemeContext } from "utils/providers"
import { themeValues } from "utils/types"

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <form className="absolute bottom-5 right-5">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            className={clsx("flex h-12 w-12 items-center justify-center rounded-full bg-white transition-colors", {
              "text-pyro/90 hover:text-pyro": theme === "pyro",
              "text-anemo/90 hover:text-anemo": theme === "anemo",
              "text-hydro/90 hover:text-hydro": theme === "hydro",
              "text-electro/90 hover:text-electro": theme === "electro",
              "text-dendro/90 hover:text-dendro": theme === "dendro",
              "text-cryo/90 hover:text-cryo": theme === "cryo",
              "text-geo/90 hover:text-geo": theme === "geo"
            })}>
            <Palette weight="fill" size={36} className="drop-shadow-2xl" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <div
              className={clsx(
                "relative flex max-w-[90vw] flex-col items-center justify-center rounded-lg border-2 bg-black py-10 px-12 shadow-lg shadow-black/25",
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
              <Dialog.Close asChild>
                <button
                  aria-label="Close"
                  className={clsx(
                    "absolute top-1 right-1 flex h-10 w-10 items-center justify-center rounded bg-black transition-colors",
                    {
                      "hover:text-pyro": theme === "pyro",
                      "hover:text-anemo": theme === "anemo",
                      "hover:text-hydro": theme === "hydro",
                      "hover:text-electro": theme === "electro",
                      "hover:text-dendro": theme === "dendro",
                      "hover:text-cryo": theme === "cryo",
                      "hover:text-geo": theme === "geo"
                    }
                  )}>
                  <X weight="bold" size={20} />
                </button>
              </Dialog.Close>
              <Dialog.Title className="mb-5 text-center text-2xl font-bold">Chose Theme</Dialog.Title>
              <RadioGroup.Root
                defaultValue={theme}
                className="flex gap-5"
                onValueChange={(value: themeValues) => setTheme(value)}>
                {themes.map(themeValue => {
                  return (
                    <div key={themeValue} className="flex items-center gap-1">
                      <RadioGroup.Item
                        className="h-5 w-5 rounded-full bg-white hover:bg-zinc-300"
                        value={themeValue}
                        id={themeValue}>
                        <RadioGroup.Indicator
                          className={clsx(
                            "relative flex h-full w-full items-center justify-center after:block after:h-1/2 after:w-1/2 after:rounded-full",
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
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </form>
  )
}
