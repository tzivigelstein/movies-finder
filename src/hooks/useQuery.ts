import { ChangeEvent, useState } from "react";
import { Type } from "../types/movie";

export default function useQuery({
  initialQuery,
  initialType,
}: {
  initialQuery: string | null;
  initialType: Type | null;
}) {
  const [query, setQuery] = useState(initialQuery ?? "");
  const [type, setType] = useState<Type | null>(initialType ?? null);
  const [error, setError] = useState<string | null>(null);

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const queryValue = event.currentTarget.value;

    setQuery(queryValue);
  }

  function handleTypeChange(newType: Type | null) {
    setType(newType);
  }

  return {
    query,
    type,
    queryError: error,
    handleQueryChange,
    handleTypeChange,
  };
}
