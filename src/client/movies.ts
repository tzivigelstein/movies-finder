import { APIMoviesResponse } from "../types/movie";

export default class MoviesClient {
  private baseUrl: string = import.meta.env.VITE_API_URL;
  private apiKey: string = import.meta.env.VITE_API_KEY;
  private url?: string;

  constructor() {
    this.url = `${this.baseUrl}?apikey=${this.apiKey}`;
  }

  async getMovies({ query }: { query: string }): Promise<APIMoviesResponse> {
    const urlWithQuery = `${this.url}&s=${query}`;

    return fetch(urlWithQuery).then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error("Error: Invalid response");
    });
  }
}
