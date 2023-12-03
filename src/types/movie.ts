export interface APIMoviesResponse {
  Search: APIMovie[]
  totalResults: string
  Response: string
}

export interface APIMovie {
  Title: string
  Year: string
  imdbID: string
  Type: Type
  Poster: string
}

export interface Movie {
  title: string
  year: number
  id: string
  type: Type
  poster: string
}

export type Type = '' | 'movie' | 'series' | 'episode'
