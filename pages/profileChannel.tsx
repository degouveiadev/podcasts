import { useState } from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import AudioClipsGrid from '../components/AudioClipsGrid'
import Error from './_error'
import PodcastPlayer from '../components/PodcastPlayer'
import { Channel } from '../interfaces/channel'
import { Clip } from '../interfaces/clip'

interface Props {
  channel?: Channel
  audioClips?: Clip[]
  series?: Channel[]
  statusCode?: number
}

const ProfileChannel: NextPage<Props> = ({channel, audioClips, series, statusCode}) => {
  const [openPodcast, setOpenPodcast] = useState(null)

  const handleOpenPodcast = (event: React.MouseEvent<HTMLAnchorElement>, podcast: Clip) => {
    event.preventDefault()
    setOpenPodcast(podcast)
  }

  const closePodcast = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setOpenPodcast(null)
  }

  if (statusCode !== 200) {
    return <Error statusCode={ statusCode } />
  }

  return (
    <Layout title={`Podcasts - ${channel.title}`}>
      {
        openPodcast && (
          <div className='modal'>
            <PodcastPlayer clip={openPodcast} onClose={closePodcast} />
          </div>
        )
      }
      <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

      { series.length > 0 && (
        <ChannelGrid channels={series} />
      )}

      <AudioClipsGrid audioClips={audioClips} handleClick={handleOpenPodcast} />

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

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
        }
      `}</style>
    </Layout>
  )
}

ProfileChannel.getInitialProps = async ({query}) => {

  try {
    const idChannel: string | string[] = query.id

    const [reqChannel, reqAudios, reqSeries] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
    ])

    if (reqChannel.status >= 400) {
      return { channel: {}, audioClips: [], series: [], statusCode: reqChannel.status }
    }

    if (reqAudios.status >= 400) {
      return { channel: {}, audioClips: [], series: [], statusCode: reqAudios.status }
    }

    if (reqSeries.status >= 400) {
      return { channel: {}, audioClips: [], series: [], statusCode: reqSeries.status }
    }

    const dataChanel = await reqChannel.json()
    const channel = dataChanel.body.channel

    const dataAudio = await reqAudios.json()
    const audioClips = dataAudio.body.audio_clips

    const dataSeries = await reqSeries.json()
    const series = dataSeries.body.channels

    return { channel, audioClips, series, statusCode: 200 }
  } catch(e) {
    return { channel: {}, audioClips: [], series: [], statusCode: 503 }
  }

}

export default ProfileChannel