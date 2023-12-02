import { APIMoviesResponse, Type } from "../types/movie";
import { buildUrlWithQuery } from "./utils";

interface GetMovies {
  query: string;
  type: Type | null;
}

export default class MoviesClient {
  private baseUrl: string = import.meta.env.VITE_API_URL;
  private apiKey: string = import.meta.env.VITE_API_KEY;
  private url: string;

  constructor() {
    this.url = `${this.baseUrl}?apikey=${this.apiKey}`;
  }

  async getMovies({ query, type }: GetMovies): Promise<APIMoviesResponse> {
    const urlWithQuery = buildUrlWithQuery(this.url, query, type);

    return fetch(urlWithQuery).then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error("Error: Invalid response");
    });
  }
}
