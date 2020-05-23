import Link from 'next/link'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import SeriesGrid from '../components/SeriesGrid'
import AudioClipsGrid from '../components/AudioClipsGrid'
import { Channel } from '../interfaces/channel'
import { Serie } from '../interfaces/serie'
import { Clip } from '../interfaces/clip'

interface Props {
  channel?: Channel,
  audioClips?: Clip[],
  series?: Serie[]
}

const ProfileChannel: NextPage<Props> = ({channel, audioClips, series}) => {

  return (
    <Layout title={`Podcasts - ${channel.title}`}>
      <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
      { series.length > 0 && (
        <SeriesGrid series={series} />
      )}
      <AudioClipsGrid audioClips={audioClips} />

      <style jsx>{`
        .banner {
          width: 100%;
          padding-bottom: 25%;
          background-position: 50% 50%;
          background-size: cover;
          background-color: #aaa;
        }

        h1 {
          font-weight: 600;
          padding: 15px;
        }
      `}</style>
    </Layout>
  )
}

ProfileChannel.getInitialProps = async ({query}) => {
  const idChannel: string | string[] = query.id

  const [reqChannel, reqAudios, reqSeries] = await Promise.all([
    fetch(`https://api.audioboom.com/channels/${idChannel}`),
    fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
    fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
  ])

  const dataChanel = await reqChannel.json()
  const channel = dataChanel.body.channel

  const dataAudio = await reqAudios.json()
  const audioClips = dataAudio.body.audio_clips

  const dataSeries = await reqSeries.json()
  const series = dataSeries.body.channels

  return { channel, audioClips, series }
}

export default ProfileChannel