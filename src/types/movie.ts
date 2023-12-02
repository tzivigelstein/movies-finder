export interface APIMoviesResponse {
  Search: APIMovie[]
  totalResults: string
  Response: string
}

export interface APIMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface Movie {
  title: string
  year: number
  id: string
  type: string
  poster: string
}
