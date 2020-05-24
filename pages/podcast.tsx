import { NextPage } from 'next'
import Routes from '../routes'
import Error from './_error'
import { Clip } from '../interfaces/clip'
import slug from '../utils/slug'

interface Props {
  clip: Clip,
  statusCode: number
}

const Podcast: NextPage<Props> = ({ clip, statusCode }) => {
  const { Link } = Routes

  if (statusCode !== 200) {
    return <Error statusCode={ statusCode } />
  }

  return <div>
    <header>Podcasts</header>

    <div className='modal'>
      <div className='clip'>
        <nav>
          <Link route='profileChannel' params={{
            slug: slug(clip.channel.title),
            id: clip.channel.id
          }}>
            <a className='close'>&lt; Volver</a>
          </Link>
        </nav>

        <picture>
          <div style={{ backgroundImage: `url(${clip.urls.image || clip.channel.urls.logo_image.original})` }} />
        </picture>

        <div className='player'>
          <h3>{ clip.title }</h3>
          <h6>{ clip.channel.title }</h6>
          <audio controls autoPlay={true}>
            <source src={clip.urls.high_mp3} type='audio/mpeg' />
          </audio>
        </div>
      </div>
    </div>

    <style jsx>{`
      nav {
        background: none;
      }
      nav a {
        display: inline-block;
        padding: 15px;
        color: white;
        cursor: pointer;
        text-decoration: none;
      }
      .clip {
        display: flex;
        height: 100%;
        flex-direction: column;
        background: #8756ca;
        color: white;
      }
      picture {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1 1;
        flex-direction: column;
        width: auto;
        padding: 10%;
      }
      picture div {
        width: 100%;
        height: 100%;
        background-position: 50% 50%;
        background-size: contain;
        background-repeat: no-repeat;
      }
      .player {
        padding: 30px;
        background: rgba(0,0,0,0.3);
        text-align: center;
      }
      h3 {
        margin: 0;
      }
      h6 {
        margin: 0;
        margin-top: 1em;
      }
      audio {
        margin-top: 2em;
        width: 100%;
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

    <style jsx global>{`
      body {
        margin: 0;
        font-family: system-ui;
        background: white;
      }
    `}</style>
  </div>
}


Podcast.getInitialProps = async ({ query }) => {
  try {
    let id = query.id
    let fetchClip = await fetch(`https://api.audioboom.com/audio_clips/${id}.mp3`)
    let clip = (await fetchClip.json()).body.audio_clip
    return { clip, statusCode: 200 }
  } catch(e) {
    return { clip: {}, statusCode: e.status }
  }
}

export default Podcast
