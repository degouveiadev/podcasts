import { NextPage } from "next"
import Error from 'next/error'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import { Channel } from '../interfaces/channel'

interface Props {
  channels?: Channel[]
  statusCode?: number
}

const Home: NextPage<Props> = ({ channels, statusCode }) => {
  if (statusCode !== 200) {
    return <Error statusCode={ statusCode } />
  }

  return (
    <Layout title="Podcasts">
      <ChannelGrid channels={channels} />
    </Layout>
  )
}

Home.getInitialProps = async ({res}) => {

  try {
    const req = await fetch("https://api.audioboom.com/channels/recommended")
    const { body } = await req.json()

    return { channels: body, statusCode: 200 }
  } catch (e) {
    return { channels: [], statusCode: e.status }
  }
}

export default Home
