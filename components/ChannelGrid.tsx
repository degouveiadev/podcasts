import routes from '../routes'
import { Channel } from '../interfaces/channel'
import slug from '../utils/slug'

type ChannelGridProps = {
  channels: Channel[]
}

const ChannelGrid = ({channels}: ChannelGridProps) => {
  const { Link } = routes

  return (
    <div className="channels">
      {channels.map((channel: Channel, index: number) => (
        <Link route='profileChannel' params={{
          slug: slug(channel.title),
          id: channel.id
        }} key={index}>
          <a className="channel">
            <div className="channel">
              <img src={channel.urls.logo_image.original} />
              <h2>{channel.title}</h2>
            </div>
          </a>
        </Link>
      ))}

      <style jsx>{`
        .channels {
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }

        .channel {
          display: block;
          background-size: cover;
          border-radius: 3px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          text-decoration: none;
          height: 100%;
          color: black;
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
    </div>
  )
}

export default ChannelGrid