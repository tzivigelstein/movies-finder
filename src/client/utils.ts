import { Type } from "../types/movie";

export function buildUrlWithQuery(
  baseUrl: string,
  query: string,
  type: Type | null,
) {
  const url = new URL(baseUrl);
  url.searchParams.set("s", query);

  if (type) {
    url.searchParams.set("type", type);
  }

  return url.toString();
}
