import { NextPage } from "next"
import Link from 'next/link'

interface URLS_Channels {
  logo_image: string
  banner_image: string
}

interface Channel {
  description: string
  id: number
  title: string
  type: string
  urls: {
    web_url: string
    logo_image: {
      original: string
    }
    banner_image: {
      original: string
    }
  }
}

interface Props {
  channels?: Channel[]
}

const Home: NextPage<Props> = ({ channels }) => {
  return (
    <div>
      <header>Podcasts</header>

      <div className="channels">
        {channels.map((channel: Channel, index: number) => (
          <Link href={`/channel?id=${channel.id}`} key={index}>
            <a className="channel">
              <div className="channel">
                <img src={channel.urls.logo_image.original} />
                <h2>{channel.title}</h2>
              </div>
            </a>
          </Link>
        ))}
      </div>

      <style jsx>{`
        header {
          color: #fff;
          background: #8756ca;
          padding: 15px;
          text-align: center;
        }

        .channels {
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }

        .channel {
          display: block;
          background-size: cover;
          padding-bottom: 100%;
          border-radius: 3px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          margin-bottom: 0.5em;
        }

        .channel img {
          width: 100%;
        }

        h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
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

Home.getInitialProps = async (ctx) => {
  const res = await fetch("https://api.audioboom.com/channels/recommended")
  const json = await res.json()

  return { channels: json.body }
}

export default Home
