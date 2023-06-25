export type Dataset = {
  id: number
  created_at: string
  raw_tweet: string
  username: string
}

export type DatasetLabelled = {
  id: number
  created_at: string
  username: string
  raw_tweet: string
  label: string
}
