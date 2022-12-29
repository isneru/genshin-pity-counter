import Head from "next/head"

interface NextHeadProps {
  title: string
  icon: "/acquainted.svg" | "/intertwined.svg"
}

export const NextHead = ({ title, icon }: NextHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href={icon} type="image/svg+xml" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="blog" />
      <meta property="og:image" content="/logo.svg" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  )
}
