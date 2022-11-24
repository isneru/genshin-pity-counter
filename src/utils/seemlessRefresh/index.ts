import { useRouter } from "next/router"

export const useSeemlessRefresh = () => {
  const router = useRouter()
  router.replace(router.asPath)
}
