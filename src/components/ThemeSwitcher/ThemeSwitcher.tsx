import * as Dialog from "@radix-ui/react-dialog"
import * as RadioGroup from "@radix-ui/react-radio-group"
import clsx from "clsx"
import { Palette, X } from "phosphor-react"
import { useContext } from "react"
import { ThemeContext } from "utils/ThemeProvider"
import { themeValues } from "utils/types"

export const ThemeSwitcher = () => {
  const { themes, theme, setTheme } = useContext(ThemeContext)

  return (
    <form className="absolute bottom-5 right-5">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            className={clsx(
              "bg-white flex items-center justify-center rounded-full w-12 h-12 transition-colors",
              `text-${theme}/90 hover:text-${theme}`
            )}>
            <Palette weight="fill" size={36} className="drop-shadow-2xl" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <div
              className={clsx(
                "relative bg-black py-10 px-12 rounded-lg max-w-[90vw] shadow-lg shadow-black/25 flex flex-col items-center justify-center border-2",
                `border-${theme}`
              )}>
              <Dialog.Close asChild>
                <button
                  aria-label="Close"
                  className={clsx(
                    "bg-black rounded w-10 h-10 flex items-center justify-center transition-colors absolute top-1 right-1",
                    `hover:text-${theme}`
                  )}>
                  <X weight="bold" size={20} />
                </button>
              </Dialog.Close>
              <Dialog.Title className="font-bold text-2xl mb-5 text-center">Chose Theme</Dialog.Title>
              <RadioGroup.Root
                defaultValue={theme}
                className="flex gap-5"
                onValueChange={(value: themeValues) => setTheme(value)}>
                {themes.map(themeValue => {
                  return (
                    <div key={themeValue} className="flex gap-1 items-center">
                      <RadioGroup.Item
                        className="rounded-full w-5 h-5 bg-white hover:bg-zinc-300"
                        value={themeValue}
                        id={themeValue}>
                        <RadioGroup.Indicator
                          className={clsx(
                            "flex items-center justify-center w-full h-full relative after:block after:w-1/2 after:h-1/2 after:rounded-full",
                            `after:bg-${theme}`
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
