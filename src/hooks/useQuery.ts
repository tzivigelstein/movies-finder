import { ChangeEvent, useState } from "react";

export default function useQuery() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const queryValue = event.currentTarget.value;

    setQuery(queryValue);
  }

  return { query, queryError: error, handleQueryChange };
}
