import { Type } from "../types/movie";

export function buildUrlWithQuery(
  baseUrl: string,
  query: string,
  type: Type | null,
  page?: number,
) {
  const url = new URL(baseUrl);
  url.searchParams.set("s", query);

  if (type) {
    url.searchParams.set("type", type);
  }

  if (page) {
    url.searchParams.set("page", page.toString());
  }

  return url.toString();
}
