import { useState, useEffect } from 'react'
import { INITIAL_QUERIES } from '../utils'

const SECOND_IN_MILLIS = 1000

export default function useExampleMovie() {
  const [exampleMovie, setExampleMovie] = useState(INITIAL_QUERIES[0])
  const [exampleMovieIndex, setExampleMovieIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setExampleMovieIndex(prev => prev + 1)
    }, 5 * SECOND_IN_MILLIS)

    return () => {
      window.clearInterval(id)
    }
  }, [])

  useEffect(() => {
    setExampleMovie(INITIAL_QUERIES[exampleMovieIndex])
  }, [exampleMovieIndex])

  return { exampleMovie }
}
