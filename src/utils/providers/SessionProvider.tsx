import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

type Children = {
  children: ReactNode
}

interface SessionProps {
  user: {
    id: string
    name: string
    gameUid: number
    avatar: string
  }
}

interface SessionContextData {
  session: SessionProps | undefined
  setSession: Dispatch<SetStateAction<SessionProps | undefined>>
}

export const SessionContext = createContext({} as SessionContextData)

export const SessionProvider = ({ children }: Children) => {
  const [session, setSession] = useState<SessionProps | undefined>()

  return <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>
}
