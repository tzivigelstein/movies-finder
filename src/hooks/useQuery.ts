import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Type } from '../types/movie'
import getRotativeValue from '../utils'

export default function useQuery({
  initialQuery,
  initialType,
}: {
  initialQuery: string | null
  initialType: Type | null
}) {
  const rotationValue = useMemo(() => getRotativeValue(), [])

  const sanitizedInitialQuery =
    !initialQuery || initialQuery?.length === 0 ? rotationValue : initialQuery

  const sanitizedInitialType =
    !initialType || initialType?.length === 0 ? null : initialType

  const [query, setQuery] = useState(sanitizedInitialQuery)
  const [type, setType] = useState<Type | null>(sanitizedInitialType)
  const [error] = useState<string | null>(null)
  const [justRemovedQuery, setJustRemovedQuery] = useState(false)

  useEffect(() => {
    if (query.length > 0) {
      setJustRemovedQuery(false)
    } else {
      setJustRemovedQuery(true)
    }
  }, [query])

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const queryValue = event.currentTarget.value

    setQuery(queryValue)
  }

  function handleTypeChange(newType: Type | null) {
    setType(newType)
  }

  function clearQuery() {
    setQuery('')
  }

  function setNewQuery(newQuery: string) {
    setQuery(newQuery)
  }

  return {
    query,
    type,
    queryError: error,
    justRemovedQuery,
    handleQueryChange,
    handleTypeChange,
    clearQuery,
    setNewQuery,
  }
}
