import { NextPage } from "next"
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'

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
    <Layout title="Podcasts">
      <ChannelGrid channels={channels} />
    </Layout>
  )
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch("https://api.audioboom.com/channels/recommended")
  const json = await res.json()

  return { channels: json.body }
}

export default Home
