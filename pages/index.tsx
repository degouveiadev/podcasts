import React from 'react';
import { NextPage } from 'next';
import Error from './_error';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import { Channel } from '../interfaces/channel';
import { Config } from '../utils/config';

interface Props {
  channels?: Channel[];
  statusCode: number;
}

const Home: NextPage<Props> = ({ channels = [], statusCode }: Props) => {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <Layout title="Podcasts">
      <ChannelGrid channels={channels} />
    </Layout>
  );
};

Home.getInitialProps = async () => {
  try {
    const req = await fetch(`${Config.URL}channels/recommended`);
    const { body } = await req.json();

    return { channels: body, statusCode: 200 };
  } catch (e) {
    return { statusCode: e.status };
  }
};

export default Home;
