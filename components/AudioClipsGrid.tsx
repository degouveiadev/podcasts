import React from 'react'
import Routes from '../routes'
import { Clip } from '../interfaces/clip'
import slug from '../utils/slug'

type AudioClips = {
  audioClips: Clip[],
  handleClick(event: React.MouseEvent<HTMLAnchorElement>, Clip): void
}

const AudioClipsGrid = ({ audioClips, handleClick }: AudioClips) => {
  const { Link } = Routes

  return (
    <>
      <h2>Ultimos Podcasts</h2>
      { audioClips.map((clip) => (
        <Link route='podcast' params={{
          slugChannel: slug(clip.channel.title),
          idChannel: clip.channel.id,
          slug: slug(clip.title),
          id: clip.id
        }} key={clip.id}>
          <a className='podcast' onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, clip)}>
            <h3>{ clip.title }</h3>
            <div className='meta'>
              { Math.ceil(clip.duration / 60) } minutes
            </div>
          </a>
        </Link>
      ))}

      <style jsx>{`
        h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
        }

        .podcast {
          display: block;
          text-decoration: none;
          color: #333;
          padding: 15px;
          border-bottom: 1px solid rgba(0,0,0,0.2);
          cursor: pointer;
        }
        .podcast:hover {
          color: #000;
        }
        .podcast h3 {
          margin: 0;
        }
        .podcast .meta {
          color: #666;
          margin-top: 0.5em;
          font-size: 0.8em;
        }
      `}</style>
    </>
  )
}

export default AudioClipsGrid