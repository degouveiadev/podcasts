import React from 'react';
import Routes from '../routes';
import { Clip } from '../interfaces/clip';
import slug from '../utils/slug';

type PodcastPlayerProps = {
  clip: Clip;
  onClosePodcast(event: React.MouseEvent<HTMLAnchorElement>): void;
};

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ clip, onClosePodcast }: PodcastPlayerProps) => {
  const { Link } = Routes;

  return (
    <div className="clip">
      <nav>
        {onClosePodcast ? (
          <a href="#!" onClick={onClosePodcast}>
            &lt; Volver
          </a>
        ) : (
          <Link
            route="profileChannel"
            params={{
              slug: slug(clip.channel.title),
              id: clip.id,
            }}
          >
            <a className="close">&lt; Volver</a>
          </Link>
        )}
      </nav>

      <picture>
        <div style={{ backgroundImage: `url(${clip.urls.image || clip.channel.urls.logo_image.original})` }}></div>
      </picture>

      <div className="player">
        <h3>{clip.title}</h3>
        <h4>{clip.channel.title}</h4>
        <audio controls autoPlay={true}>
          <source src={clip.urls.high_mp3} type="audio/mpeg" />
        </audio>
      </div>

      <style jsx>{`
        nav {
          background: none;
        }

        nav a {
          display: inline-block;
          padding: 15px;
          color: white;
          cursos: pointer;
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
          background: rgba(0, 0, 0, 0.3);
          text-align: center;
        }

        h3 {
          margin: 0;
        }

        h4 {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default PodcastPlayer;
