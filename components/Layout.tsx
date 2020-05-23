import { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

interface Props {
  title?: string,
  children
}

const Layout: NextPage<Props> = ({title, children}) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </Head>

      <header>
        <Link href='/'>
          <a>
            Podcasts
          </a>
        </Link>
      </header>

      {children}

      <style jsx>{`
        header {
          color: #fff;
          background: #8756ca;
          padding: 15px;
          text-align: center;
        }
        header a {
          color: #fff;
          text-decoration: none;
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: system-ui;
          background: white;
        }
      `}</style>
    </div>
  )
}

export default Layout