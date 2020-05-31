export interface Clip {
  id: number;
  title: string;
  description: string;
  duration: number;
  channel: {
    title: string;
    id: number;
    urls: {
      logo_image: {
        original: string;
      };
    };
  };
  urls: {
    high_mp3: string;
    image: string;
  };
}
