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
    <Dialog.Root
      onOpenChange={isOpen => {
        if (isOpen === false) handleAvatarChange(userData)
      }}>
      <Dialog.Trigger asChild>
        <button
          className={clsx("rounded-full ring-2", {
            "ring-pyro": theme === "pyro",
            "ring-anemo": theme === "anemo",
            "ring-hydro": theme === "hydro",
            "ring-electro": theme === "electro",
            "ring-dendro": theme === "dendro",
            "ring-cryo": theme === "cryo",
            "ring-geo": theme === "geo"
          })}>
          <Image
            src={`/genshin-characters/${user.avatar}.png`}
            width={100}
            height={100}
            alt="Genshin Character as profile picture"
          />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div
            className={clsx(
              "relative flex h-[90vh] max-w-[90vw] flex-col items-center justify-center rounded-lg border-2 bg-black py-10 px-12 shadow-lg shadow-black/25",
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
            <Dialog.Title className="mb-12 text-center text-2xl font-bold">Chose Theme</Dialog.Title>
            <div
              className={clsx("flex flex-wrap justify-center gap-5 overflow-y-auto p-2", {
                "scrollbar-thumb-pyro": theme === "pyro",
                "scrollbar-thumb-anemo": theme === "anemo",
                "scrollbar-thumb-hydro": theme === "hydro",
                "scrollbar-thumb-electro": theme === "electro",
                "scrollbar-thumb-dendro": theme === "dendro",
                "scrollbar-thumb-cryo": theme === "cryo",
                "scrollbar-thumb-geo": theme === "geo"
              })}>
              {genshinCharacters.map(character => {
                return (
                  <button
                    className={clsx("h-24 w-24 rounded-full ring-2 transition-shadow", {
                      "ring-white/10": character !== userData.avatar,
                      "ring-pyro": theme === "pyro",
                      "ring-anemo": theme === "anemo",
                      "ring-hydro": theme === "hydro",
                      "ring-electro": theme === "electro",
                      "ring-dendro": theme === "dendro",
                      "ring-cryo": theme === "cryo",
                      "ring-geo": theme === "geo"
                    })}
                    onClick={() => setUserData({ ...userData, avatar: character })}
                    key={character}>
                    <Image
                      src={`/genshin-characters/${character}.png`}
                      width={150}
                      height={150}
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
  )
}
