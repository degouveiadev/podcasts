export interface Channel {
  description: string
  id: number
  title: string
  type: string
  urls: {
    web_url: string
    logo_image: {
      original: string
    }
    banner_image: {
      original: string
    }
  }
}