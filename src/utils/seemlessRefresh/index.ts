import { useRouter } from "next/router"

export const refreshData = () => {
  const router = useRouter()
  router.replace(router.asPath)
}
