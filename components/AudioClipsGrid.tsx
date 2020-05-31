import React, { Fragment } from 'react';
// import Routes from '../routes';
import { Clip } from '../interfaces/clip';
import slug from '../utils/slug';

interface AudioClipsGridProps {
  audioClips: Clip[];
  handleClick(event: React.MouseEvent<HTMLAnchorElement>, clip: Clip): void;
}

const AudioClipsGrid: React.FC<AudioClipsGridProps> = ({
  audioClips,
  handleClick,
}: AudioClipsGridProps): React.ReactElement => {
  // const { Link } = Routes;

  return (
    <Fragment>
      <h2>Ultimos Podcasts</h2>
      {audioClips.map((clip) => (
        // <Link
        //   route="podcast"
        //   params={{
        //     slugChannel: slug(clip.channel.title),
        //     idChannel: clip.channel.id,
        //     slug: slug(clip.title),
        //     id: clip.id,
        //   }}
        // >
        <a
          href={`${slug(clip.channel.title)}.${clip.channel.id}/${slug(clip.title)}.${clip.id}`}
          className="podcast"
          onClick={(e) => handleClick(e, clip)}
          key={clip.id}
        >
          <h3>{clip.title}</h3>
          <div className="meta">{Math.ceil(clip.duration / 60)} minutes</div>
        </a>
        // </Link>
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
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
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
    </Fragment>
  );
};

export default AudioClipsGrid;
