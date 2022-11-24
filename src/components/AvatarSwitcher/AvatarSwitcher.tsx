import * as Dialog from "@radix-ui/react-dialog"
import clsx from "clsx"
import Image from "next/image"
import { useRouter } from "next/router"
import { X } from "phosphor-react"
import { useContext, useState } from "react"
import { api } from "service"
import { genshinCharacters } from "utils/data"
import { ThemeContext } from "utils/providers"

interface UserData {
  avatar: string
  id: string
  name: string
  gameUid: number
  wishes: {
    weapon: number
    event: number
    standard: number
  }
}

interface UserDataProps {
  user: UserData
}

export const AvatarSwitcher = ({ user }: UserDataProps) => {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)
  const [userData, setUserData] = useState<UserData>(user)

  function handleAvatarChange(data: UserData) {
    try {
      api.post("/editUserAvatar", data).then(() => router.replace(router.asPath))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form>
      <Dialog.Root
        onOpenChange={isOpen => {
          if (isOpen === false) handleAvatarChange(userData)
        }}>
        <Dialog.Trigger asChild>
          <button
            className={clsx("flex items-center justify-center rounded-full w-[100px] h-[100px] transition-colors", {
              "text-pyro/90 hover:text-pyro": theme === "pyro",
              "text-anemo/90 hover:text-anemo": theme === "anemo",
              "text-hydro/90 hover:text-hydro": theme === "hydro",
              "text-electro/90 hover:text-electro": theme === "electro",
              "text-dendro/90 hover:text-dendro": theme === "dendro",
              "text-cryo/90 hover:text-cryo": theme === "cryo",
              "text-geo/90 hover:text-geo": theme === "geo"
            })}>
            <Image
              className={clsx("rounded-full ring-2", {
                "ring-pyro": theme === "pyro",
                "ring-anemo": theme === "anemo",
                "ring-hydro": theme === "hydro",
                "ring-electro": theme === "electro",
                "ring-dendro": theme === "dendro",
                "ring-cryo": theme === "cryo",
                "ring-geo": theme === "geo"
              })}
              src={`/genshin-characters/${user.avatar}.png`}
              width={100}
              height={100}
              alt="Genshin Character as profile picture"
            />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <div
              className={clsx(
                "relative bg-black py-10 px-12 rounded-lg max-w-[90vw] h-[90vh] shadow-lg shadow-black/25 flex flex-col items-center justify-center border-2",
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
                    "bg-black rounded w-10 h-10 flex items-center justify-center transition-colors absolute top-1 right-1",
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
              <Dialog.Title className="font-bold text-2xl mb-5 text-center">Chose Theme</Dialog.Title>
              <div className="flex flex-wrap gap-5">
                {genshinCharacters.map(character => {
                  return (
                    <button
                      className="w-12"
                      onClick={() => setUserData({ ...userData, avatar: character })}
                      key={character}>
                      <Image
                        className={clsx("rounded-full", {
                          "ring-2": character === userData.avatar,
                          "ring-pyro": theme === "pyro",
                          "ring-anemo": theme === "anemo",
                          "ring-hydro": theme === "hydro",
                          "ring-electro": theme === "electro",
                          "ring-dendro": theme === "dendro",
                          "ring-cryo": theme === "cryo",
                          "ring-geo": theme === "geo"
                        })}
                        src={`/genshin-characters/${character}.png`}
                        width={100}
                        height={100}
                        alt={`${character} icon`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </form>
  )
}
